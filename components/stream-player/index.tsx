'use client';

import useViewerToken from '@/hooks/use-viewer-token';
import { cn } from '@/lib/utils';
import { useChatSidebar } from '@/store/use-chat-sidebar';
import { LiveKitRoom } from '@livekit/components-react';
import { Stream, User } from '@prisma/client';
import { ChatSkeleton, StreamChat } from './chat';
import { ChatHeaderSkeleton } from './chat/chat-header';
import { ChatToggleButton } from './chat/chat-toggle-button';
import { VideoContainer, VideoSkeleton } from './video/video-container';
import { StreamInfoHeader } from './info/info-header';

interface Props {
  user: User;
  stream: Stream;
  isFollowing?: boolean;
}

const serverUrl = process.env.NEXT_PUBLIC_LIVEKET_WS_URL;

export function StreamPlayer({ user, stream, isFollowing = true }: Props) {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggleButton />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        className={cn(
          'grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <VideoContainer hostId={user.id} hostName={user.username} />
          <StreamInfoHeader
            image={user.imageUrl}
            hostName={user.username}
            hostId={user.id}
            viewerId={''}
            isFollowing={false}
            name={''}
          />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <StreamChat
            viewerName={name}
            hostName={user.username}
            hostId={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

export function StreamPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <ChatHeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
}
