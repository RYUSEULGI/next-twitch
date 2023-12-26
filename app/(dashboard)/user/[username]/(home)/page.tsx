import { StreamPlayer } from '@/components/stream-player';
import { getUserByUsername } from '@/lib/user-service';
import { notFound } from 'next/navigation';

interface Props {
  params: { username: string };
}

export default async function DashboardUserPage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} />
    </div>
  );
}
