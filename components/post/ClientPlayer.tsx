"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { AudioLines, Square } from "lucide-react";
import React from "react";

type Props = {
  src?: string;

  onRequestPlay?: () => Promise<string | null> | string | null;
  loading?: boolean;
  error?: string | null;
};

const ClientPlayer = ({
  src,
  onRequestPlay,
  loading: propsLoading,
  error: propsError,
}: Props) => {
  const [playing, setPlaying] = React.useState(false);
  const [requesting, setRequesting] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    if (!src && onRequestPlay) {
      setRequesting(true);
      try {
        const result = await onRequestPlay();
        if (typeof result === "string" && result) {
          audio.src = result;
          await audio.play();
          setPlaying(true);
        }
      } catch (e) {
        console.error("ClientPlayer onRequestPlay error:", e);
      } finally {
        setRequesting(false);
      }
      return;
    }

    if (src) {
      try {
        await audio.play();
        setPlaying(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onError = () => setPlaying(false);

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("error", onError);
    };
  }, []);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (src && !requesting) audio.src = src;
  }, [src]);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <Button onClick={toggle} variant="default" size="xs">
          {requesting ? (
            <Spinner size="sm" className="size-4"/>
          ) : playing ? (
            <Square className="size-4 text-white fill-white" />
          ) : (
            <AudioLines className="size-4" />
          )}
        </Button>

        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default ClientPlayer;
