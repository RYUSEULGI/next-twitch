'use client';

import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';
import { Skeleton } from '../../ui/skeleton';
import { ChatToggleButton } from './chat-toggle-button';
import { ChatVariantToggleButton } from './chat-variant-toggle-button';

export function ChatHeader() {
  const { variant } = useChatSidebar((state) => state);
  const isChat = variant === ChatVariant.채팅;

  return (
    <div className="relative p-3 border-b">
      <div className="absolute left-2 top-2 hidden lg:block">
        <ChatToggleButton />
      </div>
      <p className="font-semibold text-priamry text-center">
        {isChat ? '생방송 채팅' : '커뮤니티'}
      </p>
      <div className="absolute right-2 top-2">
        <ChatVariantToggleButton isChat={isChat} />
      </div>
    </div>
  );
}

export function ChatHeaderSkeleton() {
  return (
    <div className="relative p-3 border-b hidden md:block">
      <Skeleton className="absolute h-6 w-6 left-3 top-3" />
      <Skeleton className="w-28 h-6 mx-auto" />
    </div>
  );
}
