'use client';

import { MessageSquare, Users } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { ChatVariant, useChatSidebar } from '@/store/use-chat-sidebar';

interface Props {
  isChat: boolean;
}

export function ChatVariantToggleButton({ isChat }: Props) {
  const { onChangeVariant } = useChatSidebar((state) => state);

  const onToggle = () => {
    onChangeVariant(isChat ? ChatVariant.커뮤니티 : ChatVariant.채팅);
  };

  const label = isChat ? '커뮤니티' : '채팅으로 돌아가기';

  return (
    <Hint label={label} side="left" asChild>
      <Button
        variant="ghost"
        onClick={onToggle}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        {isChat ? <Users className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
      </Button>
    </Hint>
  );
}
