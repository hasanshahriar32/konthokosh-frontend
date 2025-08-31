import { LineTimingCalculator, type LineTimestamp } from "./line-timing"

export interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isLoading: boolean
  error: string | null
}

export class AudioPlayer {
  private audio: HTMLAudioElement | null = null
  private onStateChange: (state: AudioPlayerState) => void
  private onLineChange: (lineIndex: number, progress: number) => void
  private onAudioEnd: () => void
  private lineTimestamps: LineTimestamp[] = []
  private currentLineIndex = 0
  private state: AudioPlayerState = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.75,
    isLoading: false,
    error: null,
  }

  constructor(
    onStateChange: (state: AudioPlayerState) => void,
    onLineChange: (lineIndex: number, progress: number) => void,
    onAudioEnd: () => void,
  ) {
    this.onStateChange = onStateChange
    this.onLineChange = onLineChange
    this.onAudioEnd = onAudioEnd
  }

  setLineTimestamps(lines: string[], duration: number): void {
    this.lineTimestamps = LineTimingCalculator.calculateLineTimings(lines, duration)
  }

  seekToLine(lineIndex: number): void {
    const startTime = LineTimingCalculator.getLineStartTime(this.lineTimestamps, lineIndex)
    this.seekTo(startTime)
  }

  async loadAudio(audioUrl: string): Promise<void> {
    this.updateState({ isLoading: true, error: null })

    try {
      if (this.audio) {
        this.audio.pause()
        this.audio.currentTime = 0
        this.audio.removeEventListener("timeupdate", this.handleTimeUpdate)
        this.audio.removeEventListener("ended", this.handleEnded)
        this.audio.removeEventListener("error", this.handleError)
      }

      this.audio = new Audio(audioUrl)
      this.audio.volume = this.state.volume
      this.audio.currentTime = 0

      // Add event listeners
      // Update duration and loading state when metadata is available
      this.audio.addEventListener(
        "loadedmetadata",
        () => {
          this.updateState({
            duration: this.audio?.duration || 0,
            isLoading: false,
          })
        },
        { once: true }
      )

      this.audio.addEventListener("timeupdate", this.handleTimeUpdate)
      this.audio.addEventListener("ended", this.handleEnded)
      this.audio.addEventListener("error", this.handleError)

      // Load the audio and wait until metadata is loaded or an error occurs
      await new Promise<void>((resolve, reject) => {
        const onLoaded = () => resolve()
        const onError = () => reject(new Error("Failed to load audio"))

        // one-time listeners for readiness
        this.audio?.addEventListener("loadedmetadata", onLoaded, { once: true })
        this.audio?.addEventListener("error", onError, { once: true })

        try {
          // kick off loading
          this.audio?.load()
        } catch (e) {
          reject(e)
        }
      })
    } catch (error) {
      this.updateState({
        isLoading: false,
        error: "Failed to load audio",
      })
    }
  }

  play(): void {
    if (this.audio && !this.state.isLoading) {
      try {
        const playResult = this.audio.play()
        // If play() returns a promise, update state on resolution/rejection
        if (playResult && typeof (playResult as Promise<void>).then === "function") {
          (playResult as Promise<void>)
            .then(() => {
              this.updateState({ isPlaying: true })
            })
            .catch((err) => {
              console.error("Audio play failed:", err)
              this.updateState({ isPlaying: false, error: "Playback failed" })
            })
        } else {
          // play() executed synchronously
          this.updateState({ isPlaying: true })
        }
      } catch (err) {
        console.error("Audio play exception:", err)
        this.updateState({ isPlaying: false, error: "Playback exception" })
      }
    }
  }

  pause(): void {
    console.log("AudioPlayer.pause() called, audio exists:", !!this.audio);
    if (this.audio) {
      console.log("Calling audio.pause(), current isPlaying:", this.state.isPlaying);
      console.log("Audio element paused state before pause:", this.audio.paused);
      this.audio.pause();
      console.log("Audio element paused state after pause:", this.audio.paused);
      this.updateState({ isPlaying: false });
      console.log("Audio paused, state updated");
    } else {
      console.log("No audio element to pause");
    }
  }

  stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.updateState({ isPlaying: false, currentTime: 0 });
    }
  }

  setVolume(volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    if (this.audio) {
      this.audio.volume = clampedVolume
    }
    this.updateState({ volume: clampedVolume })
  }

  seekTo(time: number): void {
    if (this.audio && this.state.duration > 0) {
      const clampedTime = Math.max(0, Math.min(this.state.duration, time))
      this.audio.currentTime = clampedTime
      this.updateState({ currentTime: clampedTime })
    }
  }

  private handleTimeUpdate = (): void => {
    if (this.audio) {
      const currentTime = this.audio.currentTime
      this.updateState({ currentTime })

      // Calculate current line index and progress
      if (this.lineTimestamps.length > 0) {
        const newLineIndex = LineTimingCalculator.getCurrentLineIndex(this.lineTimestamps, currentTime)
        const progress = LineTimingCalculator.getLineProgress(this.lineTimestamps, currentTime, newLineIndex)

        if (newLineIndex !== this.currentLineIndex) {
          this.currentLineIndex = newLineIndex
          this.onLineChange(newLineIndex, progress)
        } else {
          // Update progress even if line hasn't changed
          this.onLineChange(newLineIndex, progress)
        }
      }
    }
  }

  private handleEnded = (): void => {
    this.updateState({ isPlaying: false, currentTime: 0 })
    this.onAudioEnd()
  }

  private handleError = (): void => {
    this.updateState({
      isPlaying: false,
      isLoading: false,
      error: "Audio playback error",
    })
  }

  private updateState(updates: Partial<AudioPlayerState>): void {
    this.state = { ...this.state, ...updates }
    this.onStateChange(this.state)
  }

  getState(): AudioPlayerState {
    return { ...this.state }
  }

  getLineTimestamps(): LineTimestamp[] {
    return [...this.lineTimestamps]
  }

  getCurrentLineIndex(): number {
    return this.currentLineIndex
  }

  destroy(): void {
    if (this.audio) {
      this.audio.pause()
      this.audio.currentTime = 0
      this.audio.removeEventListener("timeupdate", this.handleTimeUpdate)
      this.audio.removeEventListener("ended", this.handleEnded)
      this.audio.removeEventListener("error", this.handleError)
      this.audio = null
    }
  }
}
