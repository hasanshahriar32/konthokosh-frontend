import React from "react";
import { Buffer } from "buffer";
import ClientPlayer from "@/components/post/ClientPlayer";

const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
const MODEL_ID = "eleven_v3";

type Props = {
  text?: string;
};

// ClientPlayer is a separate client component (see ClientPlayer.tsx)

/**
 * Server component: fetches MP3 from ElevenLabs and hands a data URL to client player
 */
const TextToSpeech = async ({
  text = "নির্ধারিত সম্প্রদায় থেকে কিউরেট করা, পাঠ করুন ও মতামত দিন",
}: Props) => {
  const apiKey = process.env.NEXT_ELEVENLABS_KEY;

  if (!apiKey) {
    return <div>ElevenLabs API key is not configured.</div>;
  }

  try {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, model_id: MODEL_ID }),
      cache: "no-store",
    });

    if (!res.ok) {
      const bodyText = await res.text();
      console.error("ElevenLabs TTS error:", res.status, bodyText);
      return <div>Failed to generate speech: {res.status}</div>;
    }

    const arrayBuffer = await res.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const src = `data:audio/mpeg;base64,${base64}`;

    return (
      <div>
        <ClientPlayer src={src} />
      </div>
    );
  } catch (error) {
    console.error("TextToSpeech error:", error);
    return <div>Text to Speech failed.</div>;
  }
};

export default TextToSpeech;
