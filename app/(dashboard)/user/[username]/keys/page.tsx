import { getUser } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';
import ConnectModal from './_components/connect-modal';
import { KeyCard } from './_components/key-card';
import { UrlCard } from './_components/url-card';

export default async function DashboardUserKeysPage() {
  const user = await getUser();
  const stream = await getStreamByUserId(user.id);

  if (!stream) {
    throw new Error('스트리밍이 없습니다.');
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">설정</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl || ''} />
        <KeyCard value={stream.streamKey || ''} />
      </div>
    </div>
  );
}
