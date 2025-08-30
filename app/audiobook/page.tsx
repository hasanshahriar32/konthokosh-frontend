"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  List,
  X,
  Loader2,
  Repeat,
  Repeat1,
  Shuffle,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { formatDuration } from "@/lib/posts-data"
import Navbar from "@/components/Navbar";
import { QueueManager } from "@/lib/queue-manager"
import { ElevenLabsService } from "@/lib/elevenlabs-service"
import { AudioPlayer, type AudioPlayerState } from "@/lib/audio-player"
import type { Post, PlayerState } from "@/lib/types"
import { useKonthoKoshApi } from "@/utils/konthokosh-api"
import type { KonthoKoshFeedPost } from "@/types/post"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export default function AudiobookPlayer() {
  const { getFeedPosts } = useKonthoKoshApi()

  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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
  })

  const [showQueue, setShowQueue] = useState(false)
  const [audioPlayerState, setAudioPlayerState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.75,
    isLoading: false,
    error: null,
  })

  const [lineProgress, setLineProgress] = useState<number>(0)

  const [queueManager] = useState(() => new QueueManager(playerState))

  // Update queue manager state when player state changes
  useEffect(() => {
    queueManager.updateState(playerState)
  }, [playerState, queueManager])
  const [elevenLabsService] = useState(() => new ElevenLabsService())
  const audioPlayerRef = useRef<AudioPlayer | null>(null)
  const [audioCache, setAudioCache] = useState<{ [postId: string]: string }>({})

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setShowQueue(true)
      } else {
        setShowQueue(false)
      }
    }

    handleResize() // Set initial state
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const { posts: fetchedPosts } = await getFeedPosts({ page: 1, size: 20 })
        const transformedPosts: Post[] = fetchedPosts.map((post: KonthoKoshFeedPost) => ({
          id: post.id.toString(),
          title: post.title,
          author: post.user.firstName && post.user.lastName ? `${post.user.firstName} ${post.user.lastName}` : post.user.username || "Unknown Author",
          content: post.post.split('\n').filter(line => line.trim() !== '').map(line => line.trim()) || [post.post],
          duration: Math.floor(post.post.length / 10), // rough estimate
          category: "General",
          tags: post.tags || [],
          createdAt: new Date(post.createdAt),
          isLiked: false,
          playCount: 0,
          imageUrl: post.imagesId && post.imagesId.length > 0 ? post.imagesId[0].publicUrl : undefined,
        }))
        console.log("Transformed posts:", transformedPosts)
        setPosts(transformedPosts)
        if (transformedPosts.length > 0) {
          setPlayerState(prev => ({
            ...prev,
            currentPostId: transformedPosts[0].id,
            queue: transformedPosts.map(post => ({ post, addedAt: new Date() })),
          }))
        }
      } catch (err) {
        console.error("Error fetching posts:", err)
        setError("Failed to load posts")
        // No fallback to demo posts - let the component handle empty state
        setPosts([])
        setPlayerState(prev => ({
          ...prev,
          queue: [],
        }))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      switch (e.code) {
        case "Space":
          e.preventDefault()
          handlePlayPause()
          break
        case "ArrowLeft":
          e.preventDefault()
          if (e.shiftKey) {
            handlePrevious()
          } else {
            handleSeek(Math.max(0, audioPlayerState.currentTime - 10))
          }
          break
        case "ArrowRight":
          e.preventDefault()
          if (e.shiftKey) {
            handleNext()
          } else {
            handleSeek(Math.min(audioPlayerState.duration, audioPlayerState.currentTime + 10))
          }
          break
        case "ArrowUp":
          e.preventDefault()
          handleVolumeChange(Math.min(100, playerState.volume + 5))
          break
        case "ArrowDown":
          e.preventDefault()
          handleVolumeChange(Math.max(0, playerState.volume - 5))
          break
        case "KeyR":
          e.preventDefault()
          handleRepeatToggle()
          break
        case "KeyS":
          e.preventDefault()
          handleShuffleToggle()
          break
        case "KeyQ":
          e.preventDefault()
          setShowQueue(!showQueue)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [audioPlayerState, playerState, showQueue])

  useEffect(() => {
    const handleStateChange = (state: AudioPlayerState) => {
      setAudioPlayerState(state)
      setPlayerState((prev) => ({
        ...prev,
        isPlaying: state.isPlaying,
        currentTime: state.currentTime,
        volume: Math.round(state.volume * 100),
      }))
    }

    const handleLineChange = (lineIndex: number, progress: number) => {
      setPlayerState((prev) => ({ ...prev, currentLineIndex: lineIndex }))
      setLineProgress(progress)
    }

    const handleAudioEnd = () => {
      if (playerState.repeatMode === "one") {
        if (audioPlayerRef.current) {
          audioPlayerRef.current.seekTo(0)
          audioPlayerRef.current.play()
        }
      } else if (playerState.autoPlay) {
        const nextPost = queueManager.getNextPost()
        if (nextPost) {
          // Stop current audio before switching
          if (audioPlayerRef.current) {
            audioPlayerRef.current.pause()
          }

          // Switch to next post
          setPlayerState((prev) => ({
            ...prev,
            currentPostId: nextPost.id,
            currentLineIndex: 0,
            currentTime: 0,
            isPlaying: false, // Don't auto-play until we check cache
          }))

          // Only auto-play if audio is already cached
          if (audioCache[nextPost.id]) {
            setTimeout(() => {
              if (audioPlayerRef.current) {
                audioPlayerRef.current.loadAudio(audioCache[nextPost.id]).then(() => {
                  const actualDuration = audioPlayerRef.current?.getState().duration
                  if (actualDuration && actualDuration > 0) {
                    audioPlayerRef.current?.setLineTimestamps(nextPost.content, actualDuration)
                    audioPlayerRef.current?.play()
                  }
                })
              }
            }, 100)
          }
        } else if (playerState.repeatMode === "all" && playerState.queue.length > 0) {
          const firstPost = playerState.queue[0].post
          // Stop current audio before switching
          if (audioPlayerRef.current) {
            audioPlayerRef.current.pause()
          }
          handleSelectPost(firstPost)

          // Only auto-play if cached
          if (audioCache[firstPost.id]) {
            setTimeout(() => {
              if (audioPlayerRef.current && !audioPlayerState.isLoading) {
                audioPlayerRef.current.play()
              }
            }, 500)
          }
        }
      }
    }

    audioPlayerRef.current = new AudioPlayer(handleStateChange, handleLineChange, handleAudioEnd)

    return () => {
      audioPlayerRef.current?.destroy()
    }
  }, [playerState.repeatMode, playerState.autoPlay, playerState.queue])

  const currentPost = posts.find(p => p.id === playerState.currentPostId) || posts[0]

  if (!currentPost) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-400 mb-4">No posts available</h1>
            <p className="text-gray-400">Please try refreshing the page.</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }
  const currentQueueIndex = playerState.queue.findIndex((item) => item.post.id === playerState.currentPostId)

  const handlePlayPause = async () => {
    if (!audioPlayerRef.current) return

    if (audioPlayerState.isPlaying) {
      audioPlayerRef.current.pause()
    } else {
      if (!audioCache[currentPost.id]) {
        try {
          setAudioPlayerState((prev) => ({ ...prev, isLoading: true }))
          const fullText = currentPost.content.join(". ")
          const audioData = await elevenLabsService.generateAudio(fullText, currentPost.id)
          setAudioCache((prev) => ({ ...prev, [currentPost.id]: audioData.audioUrl }))
          await audioPlayerRef.current.loadAudio(audioData.audioUrl)

          setTimeout(() => {
            const actualDuration = audioPlayerRef.current?.getState().duration || audioData.duration
            console.log("[v0] Setting line timestamps - Post:", currentPost.title)
            console.log("[v0] Lines count:", currentPost.content.length)
            console.log("[v0] Audio duration:", actualDuration)
            audioPlayerRef.current?.setLineTimestamps(currentPost.content, actualDuration)
          }, 100)
        } catch (error) {
          console.error("Error generating audio:", error)
          return
        }
      } else {
        const actualDuration = audioPlayerRef.current.getState().duration
        if (actualDuration > 0) {
          console.log("[v0] Updating line timestamps for cached audio - Duration:", actualDuration)
          audioPlayerRef.current.setLineTimestamps(currentPost.content, actualDuration)
        }
      }

      audioPlayerRef.current.play()

      if (playerState.currentPostId) {
        queueManager.addToHistory(playerState.currentPostId)
      }
    }
  }

  const handlePrevious = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
    }

    const previousPost = queueManager.getPreviousPost()
    if (previousPost) {
      setPlayerState((prev) => ({
        ...prev,
        currentPostId: previousPost.id,
        currentLineIndex: 0,
        currentTime: 0,
        isPlaying: false,
      }))

      // Load cached audio if available
      if (audioCache[previousPost.id] && audioPlayerRef.current) {
        audioPlayerRef.current.loadAudio(audioCache[previousPost.id]).then(() => {
          const actualDuration = audioPlayerRef.current?.getState().duration
          if (actualDuration && actualDuration > 0) {
            audioPlayerRef.current?.setLineTimestamps(previousPost.content, actualDuration)
          }
        })
      }
    }
  }

  const handleNext = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
    }

    const nextPost = queueManager.getNextPost()
    if (nextPost) {
      setPlayerState((prev) => ({
        ...prev,
        currentPostId: nextPost.id,
        currentLineIndex: 0,
        currentTime: 0,
        isPlaying: false,
      }))

      // Load cached audio if available
      if (audioCache[nextPost.id] && audioPlayerRef.current) {
        audioPlayerRef.current.loadAudio(audioCache[nextPost.id]).then(() => {
          const actualDuration = audioPlayerRef.current?.getState().duration
          if (actualDuration && actualDuration > 0) {
            audioPlayerRef.current?.setLineTimestamps(nextPost.content, actualDuration)
          }
        })
      }
    }
  }

  const handleSelectPost = (post: Post) => {
    console.log("[v0] Switching to post:", post.title)

    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause()
    }

    setPlayerState((prev) => ({
      ...prev,
      currentPostId: post.id,
      currentLineIndex: 0,
      currentTime: 0,
      isPlaying: false,
    }))

    if (audioPlayerRef.current && audioCache[post.id]) {
      audioPlayerRef.current.loadAudio(audioCache[post.id]).then(() => {
        setTimeout(() => {
          const actualDuration = audioPlayerRef.current?.getState().duration
          if (actualDuration && actualDuration > 0) {
            console.log("[v0] Setting timestamps for switched post - Duration:", actualDuration)
            audioPlayerRef.current?.setLineTimestamps(post.content, actualDuration)
          }
        }, 100)
      })
    }
  }

  const handleRemoveFromQueue = (postId: string) => {
    const newQueue = queueManager.removeFromQueue(postId)
    setPlayerState((prev) => ({ ...prev, queue: newQueue }))
  }

  const handleVolumeChange = (volume: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.setVolume(volume / 100)
    }
  }

  const handleSeek = (time: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seekTo(time)
    }
  }

  const handleLineClick = (lineIndex: number) => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seekToLine(lineIndex)
    }
  }

  const handleRepeatToggle = () => {
    setPlayerState((prev) => ({
      ...prev,
      repeatMode: prev.repeatMode === "off" ? "all" : prev.repeatMode === "all" ? "one" : "off",
    }))
  }

  const handleShuffleToggle = () => {
    setPlayerState((prev) => ({ ...prev, shuffleMode: !prev.shuffleMode }))
    if (!playerState.shuffleMode) {
      const newQueue = queueManager.shuffleQueue()
      setPlayerState((prev) => ({ ...prev, queue: newQueue }))
    }
  }

  const handleAutoPlayToggle = () => {
    setPlayerState((prev) => ({ ...prev, autoPlay: !prev.autoPlay }))
  }

  const handleMoveQueueItem = (fromIndex: number, direction: "up" | "down") => {
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1
    const newQueue = queueManager.moveInQueue(fromIndex, toIndex)
    setPlayerState((prev) => ({ ...prev, queue: newQueue }))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-green-400">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading posts...</span>
            </div>
          </div>
        ) : (
          <>
            <Navbar />
            <div className="flex-1 flex relative mt-28 mb-8 ">
              <div className=" flex-1 flex flex-col transition-all duration-300 ">
                <div className="h-auto lg:h-16 bg-gradient-to-b flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 lg:px-8 space-y-2 lg:space-y-0">
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-1 lg:space-y-0">
                      <h2 className="text-lg lg:text-xl font-semibold">
                        {currentPost.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 text-sm lg:text-base">
                        <span className="text-gray-400">
                          by {currentPost.author}
                        </span>
                        <span className="text-gray-500">
                          • {currentPost.category}
                        </span>
                        <span className="text-gray-500">
                          • {formatDuration(currentPost.duration)}
                        </span>
                      </div>
                    </div>
                    {audioPlayerState.isLoading && (
                      <div className="flex items-center space-x-2 text-green-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Generating audio...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-end w-full lg:w-auto">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowQueue(!showQueue)}
                      className="text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                      {showQueue ? (
                        <ChevronRight className="h-5 w-5" />
                      ) : (
                        <ChevronLeft className="h-5 w-5" />
                      )}
                      <List className="h-5 w-5 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 lg:p-8 pb-32 lg:pb-32 overflow-y-auto">
                  <div className="max-w-4xl mx-auto">
                    {audioPlayerState.error && (
                      <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-lg">
                        <p className="text-red-400">{audioPlayerState.error}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 bg-transparent"
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
                          Retry
                        </Button>
                      </div>
                    )}

                    <div className="space-y-4 lg:space-y-8">
                      {currentPost.content.map((line, index) => {
                        const isCurrentLine =
                          index === playerState.currentLineIndex &&
                          playerState.isPlaying;
                        const isActiveLine =
                          index === playerState.currentLineIndex;

                        return (
                          <div
                            key={index}
                            className={`text-xl sm:text-2xl lg:text-4xl leading-relaxed font-medium transition-all duration-500 cursor-pointer relative ${
                              isCurrentLine
                                ? "text-green-400 scale-105 drop-shadow-lg"
                                : isActiveLine
                                ? "text-green-300 scale-102"
                                : "text-gray-300 hover:text-gray-100 hover:scale-101"
                            }`}
                            onClick={() => handleLineClick(index)}
                          >
                            {isCurrentLine && (
                              <div
                                className="absolute bottom-0 left-0 h-1 bg-green-400 rounded-full transition-all duration-300"
                                style={{ width: `${lineProgress * 100}%` }}
                              />
                            )}

                            {isCurrentLine && (
                              <div className="absolute inset-0 bg-green-400/10 rounded-lg -z-10 blur-xl" />
                            )}

                            <span className="relative z-10">{line}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-800">
                      <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-6 text-sm text-gray-400">
                        <span>
                          প্লে করা হয়েছে: {currentPost.playCount} বার
                        </span>
                        <span>
                          তৈরি:{" "}
                          {currentPost.createdAt.toLocaleDateString("bn-BD")}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <span>ট্যাগ:</span>
                          {currentPost.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-800 px-2 py-1 rounded text-xs"
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

              {showQueue && (
                <div className="w-full lg:w-80 bg-gray-900 border-l border-gray-800 p-4 fixed top-0 right-0 h-full z-30 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      Queue ({playerState.queue.length})
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleShuffleToggle}
                        className={
                          playerState.shuffleMode
                            ? "text-green-400"
                            : "text-gray-400"
                        }
                      >
                        <Shuffle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowQueue(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 pb-4">
                    {playerState.queue.map((queueItem, index) => (
                      <Card
                        key={queueItem.post.id}
                        className={`p-3 cursor-pointer transition-colors group ${
                          queueItem.post.id === playerState.currentPostId
                            ? "bg-green-900/30 border-green-400"
                            : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div
                            className="flex-1 min-w-0"
                            onClick={() => handleSelectPost(queueItem.post)}
                          >
                            <div className="text-sm font-medium text-white truncate">
                              {queueItem.post.title}
                            </div>
                            <div className="text-xs text-gray-400 truncate">
                              {queueItem.post.author}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center space-x-2">
                              <span>
                                {formatDuration(queueItem.post.duration)}
                              </span>
                              {audioCache[queueItem.post.id] && (
                                <span className="text-green-400">●</span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveQueueItem(index, "up");
                              }}
                              disabled={index === 0}
                              className="h-6 w-6 p-0"
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveQueueItem(index, "down");
                              }}
                              disabled={index === playerState.queue.length - 1}
                              className="h-6 w-6 p-0"
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFromQueue(queueItem.post.id);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-auto lg:h-24 bg-gray-900 border-t border-gray-800 flex flex-col lg:flex-row items-center p-4 lg:px-8 fixed bottom-0 left-0 right-0 z-20 space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4 w-full lg:w-auto">
                <img
                  src={currentPost.imageUrl || "/bengali-book-cover.png"}
                  alt="Post cover"
                  className="w-12 h-12 lg:w-16 lg:h-16 rounded"
                />
                <div className="flex-1 lg:flex-none min-w-0">
                  <div className="font-medium text-sm lg:text-base truncate">
                    {currentPost.title}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-400 truncate">
                    {currentPost.author}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center space-y-2 w-full lg:w-auto">
                <div className="flex items-center space-x-2 lg:space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRepeatToggle}
                    className={`text-gray-400 hover:text-white ${
                      playerState.repeatMode !== "off" ? "text-green-400" : ""
                    } hidden sm:flex`}
                  >
                    {playerState.repeatMode === "one" ? (
                      <Repeat1 className="h-4 w-4" />
                    ) : (
                      <Repeat className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={!queueManager.getPreviousPost()}
                    className="text-gray-400 hover:text-white disabled:opacity-50"
                  >
                    <SkipBack className="h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={handlePlayPause}
                    disabled={audioPlayerState.isLoading}
                    className="bg-green-500 hover:bg-green-400 text-black rounded-full w-10 h-10 lg:w-12 lg:h-12 disabled:opacity-50"
                  >
                    {audioPlayerState.isLoading ? (
                      <Loader2 className="h-5 w-5 lg:h-6 lg:w-6 animate-spin" />
                    ) : audioPlayerState.isPlaying ? (
                      <Pause className="h-5 w-5 lg:h-6 lg:w-6" />
                    ) : audioCache[currentPost.id] ? (
                      <Play className="h-5 w-5 lg:h-6 lg:w-6 ml-1" />
                    ) : (
                      <Sparkles className="h-5 w-5 lg:h-6 lg:w-6" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleNext}
                    disabled={!queueManager.getNextPost()}
                    className="text-gray-400 hover:text-white disabled:opacity-50"
                  >
                    <SkipForward className="h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShuffleToggle}
                    className={`text-gray-400 hover:text-white ${
                      playerState.shuffleMode ? "text-green-400" : ""
                    } hidden sm:flex`}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center space-x-2 w-full max-w-xs lg:max-w-md">
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    {Math.floor(audioPlayerState.currentTime / 60)}:
                    {Math.floor(audioPlayerState.currentTime % 60)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                  <div
                    className="flex-1 bg-gray-600 rounded-full h-1 cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percentage = clickX / rect.width;
                      const newTime = percentage * audioPlayerState.duration;
                      handleSeek(newTime);
                    }}
                  >
                    <div
                      className="bg-green-400 h-1 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          audioPlayerState.duration > 0
                            ? (audioPlayerState.currentTime /
                                audioPlayerState.duration) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    {Math.floor(audioPlayerState.duration / 60)}:
                    {Math.floor(audioPlayerState.duration % 60)
                      .toString()
                      .padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAutoPlayToggle}
                  className={`text-xs ${
                    playerState.autoPlay ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  Auto
                </Button>

                <div className="flex items-center space-x-2">
                  <Volume2 className="h-5 w-5 text-gray-400" />
                  <div
                    className="w-24 bg-gray-600 rounded-full h-1 cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percentage = clickX / rect.width;
                      const newVolume = Math.round(percentage * 100);
                      handleVolumeChange(newVolume);
                    }}
                  >
                    <div
                      className="bg-white h-1 rounded-full"
                      style={{ width: `${audioPlayerState.volume * 100}%` }}
                    ></div>
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
