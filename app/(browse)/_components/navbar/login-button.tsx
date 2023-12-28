'use client';

import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/button';
import { Clapperboard } from 'lucide-react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

export function LoginButton() {
  const { data: session } = useSession();

  const onLogin = () => {
    signIn('google', { redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error('Invalid credentials!');
      }
    });
  };

  const onLogout = () => {
    signOut();
  };

  if (session) {
    return (
      <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-primary"
          >
            <Link href={`/user`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <Button onClick={onLogout} size="sm" variant="primary">
            로그아웃
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
      <Dialog>
        <Dialog.Trigger>
          <Button size="sm" variant="primary">
            로그인
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <div className="flex items-center gap-4 mb-10">
            <Image src="/twitch.svg" alt="next-twitch" width="40" height="40" />
            <h2 className="text-lg font-semibold">next-twitch 로그인</h2>
          </div>
          <Button onClick={onLogin}>구글로 로그인</Button>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
