'use client';

import { useTracks } from '@livekit/components-react';
import { RemoteParticipant, Track } from 'livekit-client';
import { useRef, useState } from 'react';
import { useEventListener } from 'usehooks-ts';
import { FullscreenControl } from './fullscreen-control';
import VolumeControl from './volume-control';

interface Props {
  participant: RemoteParticipant;
}

export function LiveVideo({ participant }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const handleFullscreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  useEventListener('fullscreenchange', handleFullscreenChange, videoContainerRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  const onChangeVolume = (value: number) => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.muted = value === 0;
    videoRef.current.volume === +value * 0.01;

    setVolume((prev) => prev + value);
  };

  const onToggleVolume = () => {
    if (!videoRef.current) {
      return;
    }

    const isMuted = volume === 0;
    const defaultVolume = 50;

    videoRef.current.muted = !isMuted;
    videoRef.current.volume = isMuted ? defaultVolume * 0.01 : 0;

    setVolume(isMuted ? defaultVolume : 0);
  };

  const onToggleFullscreen = () => {
    if (!isFullscreen) {
      videoContainerRef.current?.requestFullscreen();
      return;
    }

    document.exitFullscreen();
  };

  return (
    <div ref={videoContainerRef} className="relative h-full flex">
      <video ref={videoRef} width="100%" />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl value={volume} onChange={onChangeVolume} onToggle={onToggleVolume} />
          <FullscreenControl isFullscreen={isFullscreen} onToggle={onToggleFullscreen} />
        </div>
      </div>
    </div>
  );
}
