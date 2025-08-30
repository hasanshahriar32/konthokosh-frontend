import { type NextRequest, NextResponse } from "next/server"

interface GenerateAudioRequest {
  text: string
  postId: string
}

interface ElevenLabsResponse {
  audioUrl: string
  duration: number
}

export async function POST(request: NextRequest) {
  try {
    const { text, postId }: GenerateAudioRequest = await request.json()

    if (!text || !postId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get environment variables (server-side only)
    const apiKey = process.env.ELEVENLABS_KEY
    const voiceId = process.env.ELEVENLABS_VOICE || "iP95p4xoKVk53GoZ742B"
    const modelId = process.env.ELEVENLABS_MODEL || "eleven_v3"

    if (!apiKey) {
      return NextResponse.json({ error: "ElevenLabs API key not configured" }, { status: 500 })
    }

    // Call ElevenLabs API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        Accept: "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    })

    if (!response.ok) {
      console.error("ElevenLabs API error:", response.status, response.statusText)
      return NextResponse.json({ error: "Failed to generate audio" }, { status: 500 })
    }

    // Get the audio blob
    const audioBlob = await response.blob()

    // Convert blob to base64 for transmission
    const arrayBuffer = await audioBlob.arrayBuffer()
    const base64Audio = Buffer.from(arrayBuffer).toString("base64")

    // Create a data URL
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`

    // Estimate duration based on text length (rough approximation)
    // Average reading speed is about 150-200 words per minute
    const wordCount = text.split(/\s+/).length
    const estimatedDuration = Math.max(10, (wordCount / 180) * 60) // seconds

    const result: ElevenLabsResponse = {
      audioUrl,
      duration: estimatedDuration,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error generating audio:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
