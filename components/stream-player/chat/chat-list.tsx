import { ReceivedChatMessage } from '@livekit/components-react';
import { Skeleton } from '../../ui/skeleton';
import { ChatListItem } from './chat-list-item';

interface Props {
  isHidden: boolean;
  messages: ReceivedChatMessage[];
}

export function ChatList({ isHidden, messages }: Props) {
  if (isHidden || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? '채팅이 불가능합니다.' : '채팅방에 오신 것을 환영합니다!'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message) => (
        <ChatListItem key={`chat-list-item-${message.timestamp}`} message={message} />
      ))}
    </div>
  );
}

export function ChatListSkeleton() {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
}
