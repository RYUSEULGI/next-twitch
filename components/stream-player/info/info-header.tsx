import { Skeleton } from '@/components/ui/skeleton';
import { UserAvatar, UserAvatarSkeleton } from '@/components/user-avatar';
import { useParticipants, useRemoteParticipant } from '@livekit/components-react';
import { UserIcon } from 'lucide-react';

interface Props {
  image: string;
  hostName: string;
  hostId: string;
  viewerId: string;
  isFollowing: boolean;
  name: string;
}

export function StreamInfoHeader({ image, hostId, hostName, viewerId, isFollowing, name }: Props) {
  const participants = useParticipants();
  const participant = useRemoteParticipant(hostId);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostId}`;
  const isHost = hostId === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-3">
        <UserAvatar image={image} username={hostName} size="lg" isLive={false} showBadge />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            {/* <VerifiedMark /> */}
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount} {participantCount === 1 ? 'viewer' : 'viewers'}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">오프라인</p>
          )}
        </div>
      </div>
      {/* <Actions isFollowing={isFollowing} hostId={hostId} isHost={isHost} /> */}
    </div>
  );
}

export function StreamInfoHeaderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      {/* <ActionsSkeleton /> */}
    </div>
  );
}
