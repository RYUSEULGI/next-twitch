'use client';

import { onBlock } from '@/actions/block';
import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MinusCircle } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

interface Props {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantId: string;
}

export function CommunityListItem({ hostName, viewerName, participantId, participantName }: Props) {
  const [isPending, startTransition] = useTransition();

  const isHost = viewerName === hostName;

  const handleBlock = () => {
    if (!isHost) {
      return;
    }

    startTransition(() => {
      onBlock(participantId)
        .then(() => toast.success(`${participantName}님이 차단되었습니다.`))
        .catch(() => toast.error(`${participantName}님 차단에 실패했습니다.`));
    });
  };

  return (
    <div
      className={cn(
        'group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5',
        isPending && 'opacity-50 pointer-events-none'
      )}
    >
      <p style={{ color: '' }}>{participantName}</p>
      {isHost && (
        <Hint label="차단">
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
}
