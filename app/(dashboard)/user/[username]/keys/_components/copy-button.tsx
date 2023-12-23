'use client';

import { Button } from '@/components/ui/button';
import { CheckCheck, Copy } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
  value: string;
}

export function CopyButton({ value }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (!value) {
      return;
    }

    setIsCopied(true);

    navigator.clipboard.writeText(value);

    setTimeout(() => {
      toast.success('복사되었습니다.');
      setIsCopied(false);
    }, 1000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button variant="ghost" size="sm" disabled={isCopied || !value} onClick={onCopy}>
      <Icon className="h-4 w-4" />
    </Button>
  );
}
