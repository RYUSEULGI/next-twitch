'use client';

import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react';
import { ConnectionState, Track } from 'livekit-client';
import { Skeleton } from '../../ui/skeleton';
import { LiveVideo } from './live-video';
import { LoadingVideo } from './loading-video';
import { OfflineVideo } from './offline-video';

interface Props {
  hostName: string;
  hostId: string;
}

export function VideoContainer({ hostName, hostId }: Props) {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);

  const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
    (track) => track.participant.identity === hostId
  );

  const Content = () => {
    if (!participant && connectionState === ConnectionState.Connected) {
      return <OfflineVideo username={hostName} />;
    }

    if (!participant || tracks.length === 0) {
      return <LoadingVideo label={connectionState} />;
    }

    return <LiveVideo participant={participant} />;
  };

  return <div className="aspect-video border-b relative">{Content()}</div>;
}

export function VideoSkeleton() {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
}
