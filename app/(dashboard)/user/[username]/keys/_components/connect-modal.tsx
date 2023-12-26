'use client';

import { createIngress } from '@/actions/ingress';
import { Dialog } from '@/components/ui/Dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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

export function ConnectModal() {
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
      <Dialog.Trigger>
        <Button variant="primary">생성하기</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>연결 생성하기</Dialog.Title>
        </Dialog.Header>
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
          <Dialog.Close ref={buttonRef}>
            <Button variant="ghost">취소</Button>
          </Dialog.Close>
          <Button variant="primary" disabled={isPending} onClick={onSubmit}>
            생성
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
