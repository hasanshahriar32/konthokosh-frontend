"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/Icons";
import { Play } from "lucide-react";

type Props = {
  src: string;
};

const ClientPlayer = ({ src }: Props) => {
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => setPlaying(false);
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <Button onClick={toggle} variant="default" size="sm">
        {playing ? <Icons.X className="size-4" /> : <Play className="size-4" />}
        <span>{playing ? "Pause" : "Play"}</span>
      </Button>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default ClientPlayer;
