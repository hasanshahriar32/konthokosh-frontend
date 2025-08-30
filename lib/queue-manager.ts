import type { Post, QueueItem, PlayerState } from "./types"

export class QueueManager {
  private state: PlayerState

  constructor(initialState: PlayerState) {
    this.state = initialState
  }

  // Add post to queue
  addToQueue(post: Post): QueueItem[] {
    const queueItem: QueueItem = {
      post,
      addedAt: new Date(),
    }

    // Check if post is already in queue
    const existingIndex = this.state.queue.findIndex((item) => item.post.id === post.id)
    if (existingIndex === -1) {
      this.state.queue.push(queueItem)
    }

    return this.state.queue
  }

  // Remove post from queue
  removeFromQueue(postId: string): QueueItem[] {
    this.state.queue = this.state.queue.filter((item) => item.post.id !== postId)
    return this.state.queue
  }

  // Move post in queue
  moveInQueue(fromIndex: number, toIndex: number): QueueItem[] {
    if (fromIndex < 0 || fromIndex >= this.state.queue.length || toIndex < 0 || toIndex >= this.state.queue.length) {
      return this.state.queue
    }

    const [movedItem] = this.state.queue.splice(fromIndex, 1)
    this.state.queue.splice(toIndex, 0, movedItem)
    return this.state.queue
  }

  // Get next post in queue
  getNextPost(): Post | null {
    if (!this.state.currentPostId) {
      return this.state.queue.length > 0 ? this.state.queue[0].post : null
    }

    const currentIndex = this.state.queue.findIndex((item) => item.post.id === this.state.currentPostId)
    if (currentIndex === -1 || currentIndex === this.state.queue.length - 1) {
      return null
    }

    return this.state.queue[currentIndex + 1].post
  }

  // Get previous post in queue
  getPreviousPost(): Post | null {
    if (!this.state.currentPostId) {
      return null
    }

    const currentIndex = this.state.queue.findIndex((item) => item.post.id === this.state.currentPostId)
    if (currentIndex <= 0) {
      return null
    }

    return this.state.queue[currentIndex - 1].post
  }

  // Clear queue
  clearQueue(): QueueItem[] {
    this.state.queue = []
    return this.state.queue
  }

  // Shuffle queue
  shuffleQueue(): QueueItem[] {
    for (let i = this.state.queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.state.queue[i], this.state.queue[j]] = [this.state.queue[j], this.state.queue[i]]
    }
    return this.state.queue
  }

  // Add to history
  addToHistory(postId: string): void {
    // Remove if already exists to avoid duplicates
    this.state.history = this.state.history.filter((id) => id !== postId)
    // Add to beginning
    this.state.history.unshift(postId)
    // Keep only last 50 items
    if (this.state.history.length > 50) {
      this.state.history = this.state.history.slice(0, 50)
    }
  }

  // Get current state
  getState(): PlayerState {
    return { ...this.state }
  }

  // Update state
  updateState(updates: Partial<PlayerState>): void {
    this.state = { ...this.state, ...updates }
  }
}
