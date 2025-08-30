export interface Post {
  id: string
  title: string
  author: string
  content: string[]
  duration: number // in seconds
  category: string
  tags: string[]
  createdAt: Date
  isLiked: boolean
  playCount: number
}

export interface QueueItem {
  post: Post
  addedAt: Date
}

export interface PlayerState {
  currentPostId: string | null
  currentLineIndex: number
  isPlaying: boolean
  volume: number
  currentTime: number
  queue: QueueItem[]
  history: string[]
  repeatMode: "off" | "one" | "all"
  shuffleMode: boolean
  autoPlay: boolean
}
