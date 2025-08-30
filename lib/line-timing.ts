export interface LineTimestamp {
  lineIndex: number
  startTime: number
  endTime: number
  text: string
}

export class LineTimingCalculator {
  /**
   * Calculate timing for each line based on text length and total duration
   * This provides a reasonable approximation when we have one continuous audio file
   */
  static calculateLineTimings(lines: string[], totalDuration: number): LineTimestamp[] {
    if (lines.length === 0 || totalDuration <= 0) return []

    // Calculate relative weights based on text length
    const lineWeights = lines.map((line) => {
      // Consider both character count and word count for better timing
      const charCount = line.length
      const wordCount = line.split(/\s+/).length
      return charCount * 0.7 + wordCount * 0.3
    })

    const totalWeight = lineWeights.reduce((sum, weight) => sum + weight, 0)

    // Calculate timestamps
    const timestamps: LineTimestamp[] = []
    let currentTime = 0

    lines.forEach((line, index) => {
      const lineWeight = lineWeights[index]
      const lineDuration = (lineWeight / totalWeight) * totalDuration

      timestamps.push({
        lineIndex: index,
        startTime: currentTime,
        endTime: currentTime + lineDuration,
        text: line,
      })

      currentTime += lineDuration
    })

    return timestamps
  }

  /**
   * Find the current line index based on current time
   */
  static getCurrentLineIndex(timestamps: LineTimestamp[], currentTime: number): number {
    if (timestamps.length === 0) return 0

    for (let i = 0; i < timestamps.length; i++) {
      if (currentTime >= timestamps[i].startTime && currentTime < timestamps[i].endTime) {
        return i
      }
    }

    // If we're past the end, return the last line
    if (currentTime >= timestamps[timestamps.length - 1].endTime) {
      return timestamps.length - 1
    }

    return 0
  }

  /**
   * Get the start time for a specific line
   */
  static getLineStartTime(timestamps: LineTimestamp[], lineIndex: number): number {
    if (lineIndex < 0 || lineIndex >= timestamps.length) return 0
    return timestamps[lineIndex].startTime
  }

  /**
   * Calculate progress within the current line (0-1)
   */
  static getLineProgress(timestamps: LineTimestamp[], currentTime: number, lineIndex: number): number {
    if (lineIndex < 0 || lineIndex >= timestamps.length) return 0

    const timestamp = timestamps[lineIndex]
    const lineDuration = timestamp.endTime - timestamp.startTime

    if (lineDuration <= 0) return 0

    const progressInLine = Math.max(0, currentTime - timestamp.startTime)
    return Math.min(1, progressInLine / lineDuration)
  }
}
