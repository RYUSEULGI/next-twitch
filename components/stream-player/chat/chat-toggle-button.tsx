'use client';

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useChatSidebar } from '@/store/use-chat-sidebar';

export function ChatToggleButton() {
  const { collapsed, onExpand, onCollapse } = useChatSidebar((state) => state);

  const onToggle = () => {
    if (collapsed) {
      onExpand();
    } else {
      onCollapse();
    }
  };

  const label = collapsed ? '열기' : '닫기';

  return (
    <Hint label={label} side="left" asChild>
      <Button
        onClick={onToggle}
        variant="ghost"
        className="h-auto p-2 hover:bg-white/10 hover:text-primary bg-transparent"
      >
        {collapsed ? (
          <ArrowLeftFromLine className="h-4 w-4" />
        ) : (
          <ArrowRightFromLine className="h-4 w-4" />
        )}
      </Button>
    </Hint>
  );
}
