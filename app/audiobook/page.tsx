"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageLoader from "@/components/common/PageLoader";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AudioPlayer, type AudioPlayerState } from "@/lib/audio-player";
import { ElevenLabsService } from "@/lib/elevenlabs-service";
import { formatDuration } from "@/lib/posts-data";
import { QueueManager } from "@/lib/queue-manager";
import type { PlayerState, Post } from "@/lib/types";
import type { KonthoKoshFeedPost } from "@/types/post";
import { useKonthoKoshApi } from "@/utils/konthokosh-api";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  List,
  Loader2,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AudiobookPlayer() {
  const { getFeedPosts } = useKonthoKoshApi();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [playerState, setPlayerState] = useState<PlayerState>({
    currentPostId: null,
    currentLineIndex: 0,
    isPlaying: false,
    volume: 75,
    currentTime: 0,
    queue: [],
    history: [],
    repeatMode: "off",
    shuffleMode: false,
    autoPlay: true,
  });

  const [showQueue, setShowQueue] = useState(false);
  const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.75,
    isLoading: false,
    error: null,
  });

  const [lineProgress, setLineProgress] = useState<number>(0);

  const [queueManager] = useState(() => new QueueManager(playerState));

  // Update queue manager state when player state changes
  useEffect(() => {
    queueManager.updateState(playerState);
  }, [playerState, queueManager]);
  const [elevenLabsService] = useState(() => new ElevenLabsService());
  const audioPlayerRef = useRef<AudioPlayer | null>(null);
  const [audioCache, setAudioCache] = useState<{ [postId: string]: string }>(
    {}
  );

  // Helpers for sessionStorage caching similar to TextToSpeech.tsx
  const getCacheKey = (postId: string, text: string) =>
    `tts:${postId}:${btoa(unescape(encodeURIComponent(text)))}`;

  const getCachedAudio = (postId: string, text: string) => {
    try {
      const key = getCacheKey(postId, text);
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };

  const setCachedAudio = (postId: string, text: string, dataUrl: string) => {
    try {
      const key = getCacheKey(postId, text);
      sessionStorage.setItem(key, dataUrl);
    } catch (e) {
      // ignore storage errors
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setShowQueue(true);
      } else {
        setShowQueue(false);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { posts: fetchedPosts } = await getFeedPosts({
          page: 1,
          size: 20,
        });
        const transformedPosts: Post[] = fetchedPosts.map(
          (post: KonthoKoshFeedPost) => ({
            id: post.id.toString(),
            title: post.title,
            author:
              post.user.firstName && post.user.lastName
                ? `${post.user.firstName} ${post.user.lastName}`
                : post.user.username || "Unknown Author",
            content: post.post
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line) => line.trim()) || [post.post],
            duration: Math.floor(post.post.length / 10), // rough estimate
            category: "General",
            tags: post.tags || [],
            createdAt: new Date(post.createdAt),
            isLiked: false,
            playCount: 0,
            imageUrl:
              post.imagesId && post.imagesId.length > 0
                ? post.imagesId[0].publicUrl
                : undefined,
          })
        );
        console.log("Transformed posts:", transformedPosts);
        setPosts(transformedPosts);
        // Preload any cached audio URLs from sessionStorage for the fetched posts
        try {
          const initialCache: { [postId: string]: string } = {};
          transformedPosts.forEach((p) => {
            const fullText = p.content.join(". ");
            const cached = getCachedAudio(p.id, fullText);
            if (cached) initialCache[p.id] = cached;
          });
          if (Object.keys(initialCache).length > 0) {
            setAudioCache((prev) => ({ ...prev, ...initialCache }));
          }
        } catch (e) {
          // ignore
        }
        if (transformedPosts.length > 0) {
          setPlayerState((prev) => ({
            ...prev,
            currentPostId: transformedPosts[0].id,
            queue: transformedPosts.map((post) => ({
              post,
              addedAt: new Date(),
            })),
          }));
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts");
        // No fallback to demo posts - let the component handle empty state
        setPosts([]);
        setPlayerState((prev) => ({
          ...prev,
          queue: [],
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (e.shiftKey) {
            handlePrevious();
          } else {
            handleSeek(Math.max(0, audioPlayerState.currentTime - 10));
          }
          break;
        case "ArrowRight":
          e.preventDefault();
          if (e.shiftKey) {
            handleNext();
          } else {
            handleSeek(
              Math.min(
                audioPlayerState.duration,
                audioPlayerState.currentTime + 10
              )
            );
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          handleVolumeChange(Math.min(100, playerState.volume + 5));
          break;
        case "ArrowDown":
          e.preventDefault();
          handleVolumeChange(Math.max(0, playerState.volume - 5));
          break;
        case "KeyR":
          e.preventDefault();
          handleRepeatToggle();
          break;
        case "KeyS":
          e.preventDefault();
          handleShuffleToggle();
          break;
        case "KeyQ":
          e.preventDefault();
          setShowQueue(!showQueue);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [audioPlayerState, playerState, showQueue]);

  useEffect(() => {
    const handleStateChange = (state: AudioPlayerState) => {
      setAudioPlayerState(state);
      setPlayerState((prev) => ({
        ...prev,
        isPlaying: state.isPlaying,
        currentTime: state.currentTime,
        volume: Math.round(state.volume * 100),
      }));
    };

    const handleLineChange = (lineIndex: number, progress: number) => {
      setPlayerState((prev) => ({ ...prev, currentLineIndex: lineIndex }));
      setLineProgress(progress);
    };

    const handleAudioEnd = () => {
      if (playerState.repeatMode === "one") {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.seekTo(0);
          audioPlayerRef.current.play();
        }
      } else if (playerState.autoPlay) {
        const nextPost = queueManager.getNextPost();
        if (nextPost) {
          // Stop current audio before switching
          if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
          }

          // Switch to next post
          setPlayerState((prev) => ({
            ...prev,
            currentPostId: nextPost.id,
            currentLineIndex: 0,
            currentTime: 0,
            isPlaying: false, // Don't auto-play until we check cache
          }));

          // Only auto-play if audio is already cached
          if (audioCache[nextPost.id]) {
            setTimeout(() => {
              if (audioPlayerRef.current) {
                audioPlayerRef.current
                  .loadAudio(audioCache[nextPost.id])
                  .then(() => {
                    const actualDuration =
                      audioPlayerRef.current?.getState().duration;
                    if (actualDuration && actualDuration > 0) {
                      audioPlayerRef.current?.setLineTimestamps(
                        nextPost.content,
                        actualDuration
                      );
                      audioPlayerRef.current?.play();
                    }
                  });
              }
            }, 100);
          }
        } else if (
          playerState.repeatMode === "all" &&
          playerState.queue.length > 0
        ) {
          const firstPost = playerState.queue[0].post;
          // Stop current audio before switching
          if (audioPlayerRef.current) {
            audioPlayerRef.current.pause();
          }
          handleSelectPost(firstPost);

          // Only auto-play if cached
          if (audioCache[firstPost.id]) {
            setTimeout(() => {
              if (audioPlayerRef.current && !audioPlayerState.isLoading) {
                audioPlayerRef.current.play();
              }
            }, 500);
          }
        }
      }
    };

    audioPlayerRef.current = new AudioPlayer(
      handleStateChange,
      handleLineChange,
      handleAudioEnd
    );

    return () => {
      audioPlayerRef.current?.destroy();
    };
  }, [playerState.repeatMode, playerState.autoPlay, playerState.queue]);

  const currentPost =
    posts.find((p) => p.id === playerState.currentPostId) || posts[0];

  if (!currentPost && !loading) {
    return (
      <ProtectedRoute>
              <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 text-foreground flex flex-col relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>

          <div className="relative z-10 text-center max-w-md mx-auto p-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <List className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
              No posts available
            </h1>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Please try refreshing the page or check back later for new content.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Refresh Page
            </Button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }
  const currentQueueIndex = playerState.queue.findIndex(
    (item) => item.post.id === playerState.currentPostId
  );

  const handlePlayPause = async () => {
    if (!audioPlayerRef.current) return;

    if (audioPlayerState.isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      const fullText = currentPost.content.join(". ");

      // Check sessionStorage cache first
      const cached = getCachedAudio(currentPost.id, fullText);
      if (cached) {
        // Use cached data URL
        setAudioCache((prev) => ({ ...prev, [currentPost.id]: cached }));
        await audioPlayerRef.current.loadAudio(cached);
        const actualDuration = audioPlayerRef.current.getState().duration;
        if (actualDuration > 0) {
          audioPlayerRef.current.setLineTimestamps(
            currentPost.content,
            actualDuration
          );
        }
        audioPlayerRef.current.play();
        if (playerState.currentPostId) queueManager.addToHistory(playerState.currentPostId);
        return;
      }

      // Not cached: generate via service and then cache in sessionStorage
      try {
        setAudioPlayerState((prev) => ({ ...prev, isLoading: true }));
        const audioData = await elevenLabsService.generateAudio(
          fullText,
          currentPost.id
        );

        // store in both in-memory state and sessionStorage
        setAudioCache((prev) => ({
          ...prev,
          [currentPost.id]: audioData.audioUrl,
        }));
        setCachedAudio(currentPost.id, fullText, audioData.audioUrl);

        await audioPlayerRef.current.loadAudio(audioData.audioUrl);

        setTimeout(() => {
          const actualDuration =
            audioPlayerRef.current?.getState().duration || audioData.duration;
          console.log(
            "[v0] Setting line timestamps - Post:",
            currentPost.title
          );
          console.log("[v0] Lines count:", currentPost.content.length);
          console.log("[v0] Audio duration:", actualDuration);
          audioPlayerRef.current?.setLineTimestamps(
            currentPost.content,
            actualDuration
          );
        }, 100);

        audioPlayerRef.current.play();

        if (playerState.currentPostId) {
          queueManager.addToHistory(playerState.currentPostId);
        }
      } catch (error) {
        console.error("Error generating audio:", error);
        return;
      } finally {
        setAudioPlayerState((prev) => ({ ...prev, isLoading: false }));
      }
    }
  };

  const handlePrevious = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    const previousPost = queueManager.getPreviousPost();
    if (previousPost) {
      setPlayerState((prev) => ({
        ...prev,
        currentPostId: previousPost.id,
        currentLineIndex: 0,
        currentTime: 0,
        isPlaying: false,
      }));

      // Load cached audio if available
      const fullText = previousPost.content.join(". ");
      const cached = getCachedAudio(previousPost.id, fullText) || audioCache[previousPost.id];
      if (cached && audioPlayerRef.current) {
        // update in-memory cache mapping if needed
        setAudioCache((prev) => ({ ...prev, [previousPost.id]: cached }));
        audioPlayerRef.current.loadAudio(cached).then(() => {
          const actualDuration = audioPlayerRef.current?.getState().duration;
          if (actualDuration && actualDuration > 0) {
            audioPlayerRef.current?.setLineTimestamps(
              previousPost.content,
              actualDuration
            );
          }
        });
      }
    }
  };

  const handleNext = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    const nextPost = queueManager.getNextPost();
    if (nextPost) {
      setPlayerState((prev) => ({
        ...prev,
        currentPostId: nextPost.id,
        currentLineIndex: 0,
        currentTime: 0,
        isPlaying: false,
      }));

      // Load cached audio if available
      const fullText = nextPost.content.join(". ");
      const cached = getCachedAudio(nextPost.id, fullText) || audioCache[nextPost.id];
      if (cached && audioPlayerRef.current) {
        setAudioCache((prev) => ({ ...prev, [nextPost.id]: cached }));
        audioPlayerRef.current.loadAudio(cached).then(() => {
          const actualDuration = audioPlayerRef.current?.getState().duration;
          if (actualDuration && actualDuration > 0) {
            audioPlayerRef.current?.setLineTimestamps(
              nextPost.content,
              actualDuration
            );
          }
        });
      }
    }
  };

  const handleSelectPost = (post: Post) => {
    console.log("[v0] Switching to post:", post.title);

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    setPlayerState((prev) => ({
      ...prev,
      currentPostId: post.id,
      currentLineIndex: 0,
      currentTime: 0,
      isPlaying: false,
    }));

    // Try sessionStorage first, then fall back to in-memory audioCache
    const fullText = post.content.join(". ");
    const cached = getCachedAudio(post.id, fullText) || audioCache[post.id];
    if (audioPlayerRef.current && cached) {
      setAudioCache((prev) => ({ ...prev, [post.id]: cached }));
      audioPlayerRef.current.loadAudio(cached).then(() => {
        setTimeout(() => {
          const actualDuration = audioPlayerRef.current?.getState().duration;
          if (actualDuration && actualDuration > 0) {
            console.log(
              "[v0] Setting timestamps for switched post - Duration:",
              actualDuration
            );
            audioPlayerRef.current?.setLineTimestamps(
              post.content,
              actualDuration
            );
          }
        }, 100);
      });
    }
  };

  const handleRemoveFromQueue = (postId: string) => {
    const newQueue = queueManager.removeFromQueue(postId);
    setPlayerState((prev) => ({ ...prev, queue: newQueue }));
  };

  const handleVolumeChange = (volume: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.setVolume(volume / 100);
    }
  };

  const handleSeek = (time: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seekTo(time);
    }
  };

  const handleLineClick = (lineIndex: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seekToLine(lineIndex);
    }
  };

  const handleRepeatToggle = () => {
    setPlayerState((prev) => ({
      ...prev,
      repeatMode:
        prev.repeatMode === "off"
          ? "all"
          : prev.repeatMode === "all"
          ? "one"
          : "off",
    }));
  };

  const handleShuffleToggle = () => {
    setPlayerState((prev) => ({ ...prev, shuffleMode: !prev.shuffleMode }));
    if (!playerState.shuffleMode) {
      const newQueue = queueManager.shuffleQueue();
      setPlayerState((prev) => ({ ...prev, queue: newQueue }));
    }
  };

  const handleAutoPlayToggle = () => {
    setPlayerState((prev) => ({ ...prev, autoPlay: !prev.autoPlay }));
  };

  const handleMoveQueueItem = (fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;
    const newQueue = queueManager.moveInQueue(fromIndex, toIndex);
    setPlayerState((prev) => ({ ...prev, queue: newQueue }));
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 text-foreground flex flex-col relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        {loading ? (
          <PageLoader />
        ) : (
          <>
            <Navbar />
            <div className="flex-1 flex relative mt-16 mb-8 z-10">
              <div className={`flex-1 flex flex-col transition-all duration-300 relative ${showQueue ? 'lg:pr-80' : ''}`}>
                {/* Subtle content background */}
                <div className="absolute inset-0 bg-gradient-to-br from-card/30 via-transparent to-card/20 pointer-events-none"></div>
                <div className="h-auto lg:h-20 bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-xl border-b border-border/50 flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 lg:px-8 space-y-4 lg:space-y-0 shadow-xl relative z-20">
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-6 w-full lg:w-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-2 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center shadow-lg">
                          <Play className="h-6 w-6 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-xl lg:text-2xl font-bold text-foreground font-kalpurush bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text leading-tight mb-2">
                            {currentPost.title}
                          </h2>
                          <div className="flex flex-wrap items-center gap-4 text-sm lg:text-base text-muted-foreground">
                            <span className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                              <span className="font-medium">by {currentPost.author}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                              <span className="font-medium">{currentPost.category}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              <span className="font-medium">{formatDuration(currentPost.duration)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {audioPlayerState.isLoading && (
                      <div className="flex items-center space-x-3 text-primary animate-pulse bg-primary/5 px-4 py-2 rounded-full border border-primary/20">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-sm font-semibold">
                          Generating audio...
                        </span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end w-full lg:w-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowQueue(!showQueue)}
                      className="text-muted-foreground hover:text-foreground hover:bg-accent/20 rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {showQueue ? (
                        <ChevronRight className="h-5 w-5" />
                      ) : (
                        <ChevronLeft className="h-5 w-5" />
                      )}
                      <List className="h-5 w-5 ml-2" />
                      <span className="ml-2 text-sm font-medium">
                        {showQueue ? 'Hide' : 'Queue'}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="p-6 lg:p-10 pb-40 lg:pb-44 overflow-y-auto bg-gradient-to-br from-background via-background to-background/95 relative min-h-0">
                  <div className="max-w-5xl mx-auto relative">
                    {/* Subtle content container enhancement */}
                    <div className="absolute inset-0 bg-gradient-to-br from-card/20 via-transparent to-card/10 rounded-3xl -m-6 opacity-50"></div>
                    {audioPlayerState.error && (
                      <div className="mb-10 p-8 bg-gradient-to-r from-destructive/10 to-destructive/5 border border-destructive/20 rounded-2xl shadow-lg backdrop-blur-sm">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse"></div>
                          <p className="text-destructive font-semibold text-lg">Playback Error</p>
                        </div>
                        <p className="text-destructive/80 text-base mb-6 leading-relaxed">{audioPlayerState.error}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-transparent border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 rounded-full transition-all duration-300 px-6 py-3"
                          onClick={() => {
                            setAudioCache((prev) => {
                              const newCache = { ...prev };
                              delete newCache[currentPost.id];
                              return newCache;
                            });
                            setAudioPlayerState((prev) => ({
                              ...prev,
                              error: null,
                            }));
                          }}
                        >
                          <Sparkles className="h-5 w-5 mr-3" />
                          Retry Generation
                        </Button>
                      </div>
                    )}

                    <div className="space-y-8 lg:space-y-12 relative z-10">
                      {currentPost.content.map((line, index) => {
                        const isCurrentLine =
                          index === playerState.currentLineIndex &&
                          playerState.isPlaying;
                        const isActiveLine =
                          index === playerState.currentLineIndex;

                        return (
                          <div
                            key={index}
                            className={`group relative transition-all duration-700 cursor-pointer transform hover:scale-[1.02] ${
                              isCurrentLine
                                ? "text-primary scale-105 drop-shadow-2xl"
                                : isActiveLine
                                ? "text-primary/90 scale-103"
                                : "text-foreground/85 hover:text-foreground"
                            }`}
                            onClick={() => handleLineClick(index)}
                          >
                            {/* Background glow effect */}
                            <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                              isCurrentLine
                                ? "bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 shadow-2xl shadow-primary/20"
                                : isActiveLine
                                ? "bg-gradient-to-r from-primary/10 to-transparent shadow-lg shadow-primary/10"
                                : "group-hover:bg-gradient-to-r group-hover:from-accent/20 group-hover:to-transparent group-hover:shadow-md"
                            }`} />

                            {/* Animated border */}
                            <div className={`absolute inset-0 rounded-2xl transition-all duration-700 ${
                              isCurrentLine
                                ? "ring-2 ring-primary/50 ring-offset-2 ring-offset-background"
                                : "group-hover:ring-1 group-hover:ring-primary/30 group-hover:ring-offset-1 group-hover:ring-offset-background"
                            }`} />

                            {/* Progress bar for current line */}
                            {isCurrentLine && (
                              <div
                                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-full transition-all duration-300 shadow-sm"
                                style={{ width: `${lineProgress * 100}%` }}
                              />
                            )}

                            {/* Content */}
                            <div className="relative z-10 p-8 lg:p-10">
                              <p className={`text-xl sm:text-2xl lg:text-4xl leading-relaxed font-medium transition-all duration-500 font-tiro-bangla ${
                                isCurrentLine
                                  ? "font-semibold tracking-wide"
                                  : isActiveLine
                                  ? "font-medium"
                                  : "group-hover:font-medium"
                              }`}>
                                {line}
                              </p>

                              {/* Subtle line number indicator */}
                              <div className={`absolute top-6 right-6 text-xs font-mono transition-all duration-300 ${
                                isCurrentLine || isActiveLine
                                  ? "text-primary/60 opacity-100"
                                  : "text-muted-foreground/40 opacity-0 group-hover:opacity-100"
                              }`}>
                                {index + 1}
                              </div>
                            </div>

                            {/* Floating particles effect for current line */}
                            {isCurrentLine && (
                              <>
                                <div className="absolute top-6 left-6 w-2 h-2 bg-primary/60 rounded-full animate-ping" />
                                <div className="absolute bottom-6 right-6 w-1 h-1 bg-primary/40 rounded-full animate-pulse" />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-16 lg:mt-20 pt-8 lg:pt-10 border-t border-border/50">
                      <div className="bg-gradient-to-r from-card/60 via-card/40 to-card/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/30">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Play className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1">প্লে কাউন্ট</p>
                              <p className="text-xl font-semibold text-foreground">{currentPost.playCount} বার</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                              <div className="w-3 h-3 bg-secondary rounded-full"></div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1">তৈরি হয়েছে</p>
                              <p className="text-base font-medium text-foreground">
                                {currentPost.createdAt.toLocaleDateString("bn-BD")}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                              <List className="h-6 w-6 text-accent-foreground" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium mb-2">ট্যাগ</p>
                              <div className="flex flex-wrap gap-3">
                                {currentPost.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-gradient-to-r from-secondary/20 to-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {showQueue && (
                <div className="w-full lg:w-80 bg-gradient-to-b from-card/95 via-card to-card/90 backdrop-blur-xl border-l border-border/50 p-6 fixed top-16 right-0 h-[calc(100vh-4rem)] z-30 overflow-y-auto shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text font-kalpurush">
                        Queue
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{playerState.queue.length} items</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShuffleToggle}
                        className={`rounded-full transition-all duration-300 hover:scale-110 ${
                          playerState.shuffleMode
                            ? "text-primary bg-primary/20 shadow-lg shadow-primary/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                        }`}
                      >
                        <Shuffle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowQueue(false)}
                        className="text-muted-foreground hover:text-foreground hover:bg-accent/20 rounded-full transition-all duration-300"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4 pb-6">
                    {playerState.queue.map((queueItem, index) => (
                      <Card
                        key={queueItem.post.id}
                        className={`group p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] rounded-xl border-0 ${
                          queueItem.post.id === playerState.currentPostId
                            ? "bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border border-primary/30 shadow-lg shadow-primary/10"
                            : "bg-gradient-to-r from-card to-card/80 hover:from-accent/10 hover:to-accent/5 border border-border/30"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="flex-1 min-w-0"
                            onClick={() => handleSelectPost(queueItem.post)}
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                queueItem.post.id === playerState.currentPostId
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-muted-foreground"
                              }`}>
                                {index + 1}
                              </div>
                              {audioCache[queueItem.post.id] && (
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                              )}
                            </div>
                            <div className="text-sm font-semibold text-foreground truncate mb-2">
                              {queueItem.post.title}
                            </div>
                            <div className="text-xs text-muted-foreground truncate mb-2">
                              {queueItem.post.author}
                            </div>
                            <div className="text-xs text-muted-foreground/70">
                              {formatDuration(queueItem.post.duration)}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveQueueItem(index, "up");
                              }}
                              disabled={index === 0}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent/20 rounded-full transition-all duration-200"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveQueueItem(index, "down");
                              }}
                              disabled={index === playerState.queue.length - 1}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground hover:bg-accent/20 rounded-full transition-all duration-200"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromQueue(queueItem.post.id);
                              }}
                              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all duration-200"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={`h-auto lg:h-28 bg-gradient-to-r from-card/98 via-card/95 to-card/98 backdrop-blur-xl border-t border-border/50 flex flex-col lg:flex-row items-center p-6 lg:px-8 fixed bottom-0 left-0 right-0 z-40 space-y-4 lg:space-y-0 shadow-2xl ${showQueue ? 'lg:right-80' : ''}`}>
              <div className="flex items-center space-x-4 w-full lg:w-auto">
                <div className="relative group">
                  <img
                    src={currentPost.imageUrl || "/bengali-book-cover.png"}
                    alt="Post cover"
                    className="w-14 h-14 lg:w-18 lg:h-18 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 ring-2 ring-border/50 group-hover:ring-primary/30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-1 lg:flex-none min-w-0">
                  <div className="font-semibold text-base lg:text-lg text-foreground truncate mb-1">
                    {currentPost.title}
                  </div>
                  <div className="text-sm lg:text-base text-muted-foreground truncate">
                    {currentPost.author}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center space-y-3 w-full lg:w-auto">
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRepeatToggle}
                    className={`rounded-full transition-all duration-300 hover:scale-110 ${
                      playerState.repeatMode !== "off"
                        ? "text-primary bg-primary/20 shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                    } hidden sm:flex`}
                  >
                    {playerState.repeatMode === "one" ? (
                      <Repeat1 className="h-5 w-5" />
                    ) : (
                      <Repeat className="h-5 w-5" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={!queueManager.getPreviousPost()}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-50 rounded-full hover:scale-110 transition-all duration-200 disabled:hover:scale-100"
                  >
                    <SkipBack className="h-5 w-5 lg:h-6 lg:w-6" />
                  </Button>

                  <div className="relative group">
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={handlePlayPause}
                      disabled={audioPlayerState.isLoading}
                      className="bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-full w-14 h-14 lg:w-16 lg:h-16 disabled:opacity-50 shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-110 disabled:hover:scale-100 ring-2 ring-primary/20 hover:ring-primary/40"
                    >
                      {audioPlayerState.isLoading ? (
                        <Loader2 className="h-6 w-6 lg:h-7 lg:w-7 animate-spin" />
                      ) : audioPlayerState.isPlaying ? (
                        <Pause className="h-6 w-6 lg:h-7 lg:w-7" />
                      ) : audioCache[currentPost.id] ? (
                        <Play className="h-6 w-6 lg:h-7 lg:w-7 ml-1" />
                      ) : (
                        <Sparkles className="h-6 w-6 lg:h-7 lg:w-7" />
                      )}
                    </Button>
                    {/* Pulse effect when playing */}
                    {audioPlayerState.isPlaying && (
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={!queueManager.getNextPost()}
                    className="text-muted-foreground hover:text-foreground disabled:opacity-50 rounded-full hover:scale-110 transition-all duration-200 disabled:hover:scale-100"
                  >
                    <SkipForward className="h-5 w-5 lg:h-6 lg:w-6" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShuffleToggle}
                    className={`rounded-full transition-all duration-300 hover:scale-110 ${
                      playerState.shuffleMode
                        ? "text-primary bg-primary/20 shadow-lg shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                    } hidden sm:flex`}
                  >
                    <Shuffle className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center space-x-4 w-full max-w-xs lg:max-w-md">
                  <span className="text-sm text-muted-foreground font-mono hidden sm:inline">
                    {Math.floor(audioPlayerState.currentTime / 60)}:
                    {Math.floor(audioPlayerState.currentTime % 60)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  <div
                    className="flex-1 bg-muted/50 rounded-full h-3 cursor-pointer hover:bg-muted/70 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percentage = clickX / rect.width;
                      const newTime = percentage * audioPlayerState.duration;
                      handleSeek(newTime);
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted/50 rounded-full" />
                    <div
                      className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-300 shadow-sm relative"
                      style={{
                        width: `${
                          audioPlayerState.duration > 0
                            ? (audioPlayerState.currentTime /
                                audioPlayerState.duration) *
                              100
                            : 0
                        }%`,
                      }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-foreground rounded-full shadow-md" />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono hidden sm:inline">
                    {Math.floor(audioPlayerState.duration / 60)}:
                    {Math.floor(audioPlayerState.duration % 60)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAutoPlayToggle}
                  className={`text-sm rounded-full transition-all duration-300 hover:scale-105 px-4 py-2 ${
                    playerState.autoPlay
                      ? "text-primary bg-primary/20 shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/20"
                  }`}
                >
                  Auto Play
                </Button>

                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-muted-foreground" />
                  <div
                    className="w-28 bg-muted/50 rounded-full h-3 cursor-pointer hover:bg-muted/70 transition-all duration-300 hover:scale-105 relative overflow-hidden"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percentage = clickX / rect.width;
                      const newVolume = Math.round(percentage * 100);
                      handleVolumeChange(newVolume);
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted/50 rounded-full" />
                    <div
                      className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full transition-all duration-300 shadow-sm relative"
                      style={{ width: `${audioPlayerState.volume * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-foreground rounded-full shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
