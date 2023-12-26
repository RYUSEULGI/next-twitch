import { cn } from '@/lib/utils';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Skeleton } from '../../ui/skeleton';
import { ChatInfo } from './chat-info';

interface Props {
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function ChatInput({
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
  value,
  onChange,
  onSubmit
}: Props) {
  const isDisabled = isHidden || (isFollowersOnly && !isFollowing);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value || isDisabled) {
      return;
    }

    onSubmit();
  };

  if (isHidden) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-3">
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          value={value}
          disabled={isDisabled}
          placeholder="메시지 보내기"
          onChange={handleChange}
          className={cn(
            'border-white/10',
            (isFollowersOnly || isDelayed) && 'rounded-t-none border-t-0'
          )}
        />
      </div>
      <div className="ml-auto">
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          전송
        </Button>
      </div>
    </form>
  );
}

export const ChatInputSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
