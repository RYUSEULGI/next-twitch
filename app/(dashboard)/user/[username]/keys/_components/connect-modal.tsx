'use client';

import { createIngress } from '@/actions/ingress';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';

import { IngressInput } from 'livekit-server-sdk';
import { ElementRef, useRef, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ConnectSelectBox } from './connect-select-box';

export const RTMP = String(IngressInput.RTMP_INPUT);
export const WHIP = String(IngressInput.WHIP_INPUT);

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
        <ConnectSelectBox disabled={isPending} value={ingressType} onChange={onChange} />
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
