'use client';

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';
import { useChat, useConnectionState, useRemoteParticipant } from '@livekit/components-react';
import { ConnectionState } from 'livekit-client';
import { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChatCommunityList } from '../community/community-list';
import { ChatHeader, ChatHeaderSkeleton } from './chat-header';
import { ChatInput, ChatInputSkeleton } from './chat-input';
import { ChatList, ChatListSkeleton } from './chat-list';

interface Props {
  viewerName: string;
  hostName: string;
  hostId: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}

export function StreamChat({
  viewerName,
  hostId,
  hostName,
  isChatDelayed,
  isChatEnabled,
  isChatFollowersOnly,
  isFollowing
}: Props) {
  const matches = useMediaQuery('(max-width: 1024px)');

  const { variant, onExpand, onCollapse } = useChatSidebar((state) => state);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostId);

  const isOnline = participant && connectionState === ConnectionState.Connected;
  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState('');
  const { chatMessages: messages, send } = useChat();

  useEffect(() => {
    if (matches) {
      onCollapse();
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  const onChange = (value: string) => {
    setValue(value);
  };

  const onSubmit = () => {
    if (!send) {
      return;
    }

    send(value);
    setValue('');
  };

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {variant === ChatVariant.채팅 && (
        <>
          <ChatList isHidden={isHidden} messages={reversedMessages} />
          <ChatInput
            isHidden={isHidden}
            isFollowersOnly={isChatFollowersOnly}
            isDelayed={isChatDelayed}
            isFollowing={isFollowing}
            value={value}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </>
      )}
      {variant === ChatVariant.커뮤니티 && (
        <ChatCommunityList viewerName={viewerName} hostName={hostName} isHidden={isHidden} />
      )}
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <ChatHeaderSkeleton />
      <ChatListSkeleton />
      <ChatInputSkeleton />
    </div>
  );
}
