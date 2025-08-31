export interface Post {
  id: string;
  title: string;
  author: string;
  content: string[];
  duration: number;
  tags: string[];
  createdAt: Date;
  isLiked: boolean;
  playCount: number;
  imageUrl?: string;
}

export interface QueueItem {
  post: Post;
  addedAt: Date;
}

export interface PlayerState {
  currentPostId: string | null;
  currentLineIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  queue: QueueItem[];
  history: string[];
  repeatMode: "off" | "one" | "all";
  shuffleMode: boolean;
  autoPlay: boolean;
}
