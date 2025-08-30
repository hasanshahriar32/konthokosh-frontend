interface AudioGenerationResponse {
  audioUrl: string
  duration: number
}

export class ElevenLabsService {
  private audioCache = new Map<string, string>()

  async generateAudio(text: string, postId: string): Promise<AudioGenerationResponse> {
    const cacheKey = `${postId}-${this.hashText(text)}`

    // Check cache first
    if (this.audioCache.has(cacheKey)) {
      const audioUrl = this.audioCache.get(cacheKey)!
      return {
        audioUrl,
        duration: await this.getAudioDuration(audioUrl),
      }
    }

    try {
      // Call our server-side API route instead of ElevenLabs directly
      const response = await fetch("/api/generate-audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          postId,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const audioData: AudioGenerationResponse = await response.json()

      // Cache the audio URL
      this.audioCache.set(cacheKey, audioData.audioUrl)

      return audioData
    } catch (error) {
      console.error("Error generating audio:", error)
      throw error
    }
  }

  async generateAudioForLines(
    lines: string[],
    postId: string,
  ): Promise<{ [lineIndex: number]: AudioGenerationResponse }> {
    const audioMap: { [lineIndex: number]: AudioGenerationResponse } = {}

    // Generate audio for each line
    for (let i = 0; i < lines.length; i++) {
      try {
        const audioData = await this.generateAudio(lines[i], `${postId}-line-${i}`)
        audioMap[i] = audioData
      } catch (error) {
        console.error(`Error generating audio for line ${i}:`, error)
        // Continue with other lines even if one fails
      }
    }

    return audioMap
  }

  private hashText(text: string): string {
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString()
  }

  private async getAudioDuration(audioUrl: string): Promise<number> {
    return new Promise((resolve) => {
      const audio = new Audio(audioUrl)
      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration)
      })
      audio.addEventListener("error", () => {
        resolve(0) // Default duration if unable to load
      })
    })
  }

  clearCache(): void {
    // Clean up blob URLs to prevent memory leaks
    this.audioCache.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url)
      }
    })
    this.audioCache.clear()
  }
}
