'use client';

import { createIngress } from '@/actions/ingress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { IngressInput } from 'livekit-server-sdk';
import { AlertTriangle } from 'lucide-react';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export default function ConnectModal() {
  const buttonRef = useRef<ElementRef<'button'>>(null);

  const [isPending, startTransition] = useTransition();
  const [ingressType, setIngressType] = useState<IngressType>(RTMP);

  const onChange = (value: string) => {
    setIngressType(value as IngressType);
  };

  const onSubmit = () => {
    startTransition(() => {
      createIngress(parseInt(ingressType))
        .then(() => {
          buttonRef.current?.click();
          toast.success('생성되었습니다.');
        })
        .catch(() => {
          toast.error('다시 시도해주세요.');
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="primary">생성하기</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>연결 생성하기</DialogTitle>
        </DialogHeader>
        <Select disabled={isPending} value={ingressType} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>경고 !</AlertTitle>
          <AlertDescription>경고입니다.</AlertDescription>
        </Alert>
        <div className="flex justify-between">
          <DialogClose ref={buttonRef} asChild>
            <Button variant="ghost">취소</Button>
          </DialogClose>
          <Button variant="primary" disabled={isPending} onClick={onSubmit}>
            생성
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
