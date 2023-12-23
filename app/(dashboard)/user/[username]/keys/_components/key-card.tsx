'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { CopyButton } from './copy-button';

interface Props {
  value: string;
}

export function KeyCard({ value }: Props) {
  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start gap-x-10">
        <p className="font-semibold shrink-0 min-w-[100px]">스트리밍 Key</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={value}
              type={show ? 'text' : 'password'}
              disabled
              placeholder="스트리밍 Key"
            />
            <CopyButton value={value} />
          </div>
          <Button size="sm" variant="link" onClick={onClick}>
            {show ? '숨기기' : '보기'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ToggleCardSkeleton() {
  return <Skeleton className="rounded-xl p-10 w-full" />;
}
