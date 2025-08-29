"use client";

import ClientPlayer from "@/components/post/ClientPlayer";
import React, { useCallback, useState } from "react";

const VOICE_ID =
  process.env.NEXT_PUBLIC_ELEVENLABS_VOICE || "iP95p4xoKVk53GoZ742B";
const MODEL_ID = process.env.NEXT_PUBLIC_ELEVENLABS_MODEL || "eleven_v3";

type Props = {
  text?: string;
};

const TextToSpeech: React.FC<Props> = ({
  text = "নির্ধারিত সম্প্রদায় থেকে কিউরেট করা, পাঠ করুন ও মতামত দিন",
}) => {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simple cache key: hash the text. For small text, we can use a base64 of the text.
  const cacheKey = `tts:${btoa(unescape(encodeURIComponent(text)))}`;

  const fetchAndCache = useCallback(async () => {
    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_KEY;
    if (!apiKey) {
      setError("ElevenLabs API key is not configured.");
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, model_id: MODEL_ID }),
      });

      if (!res.ok) {
        const bodyText = await res.text();
        console.error("ElevenLabs TTS error:", res.status, bodyText);
        setError(`Failed to generate speech: ${res.status}`);
        return null;
      }

      const arrayBuffer = await res.arrayBuffer();
      const base64 = arrayBufferToBase64(arrayBuffer);
      const dataUrl = `data:audio/mpeg;base64,${base64}`;
      try {
        sessionStorage.setItem(cacheKey, dataUrl);
      } catch (e) {
        // ignore storage errors
      }
      setSrc(dataUrl);
      return dataUrl;
    } catch (e) {
      console.error("TextToSpeech error:", e);
      setError("Text to Speech failed.");
      return null;
    } finally {
      setLoading(false);
    }
  }, [text, cacheKey]);

  const onRequestPlay = useCallback(async (): Promise<string | null> => {
    // Check cache first
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setSrc(cached);
        return cached;
      }
    } catch (e) {
      // ignore storage errors
    }

    const result = await fetchAndCache();
    return result;
  }, [cacheKey, fetchAndCache]);

  return (
    <div>
      <ClientPlayer src={src ?? undefined} onRequestPlay={onRequestPlay} />
    </div>
  );
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export default TextToSpeech;
