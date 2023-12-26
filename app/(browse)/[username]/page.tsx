import { StreamPlayer } from '@/components/stream-player';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';

interface Props {
  params: { username: string };
}

export default async function UserPage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <StreamPlayer user={user} stream={user.stream} />
    </div>
  );
}
