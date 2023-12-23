import { getUser } from '@/lib/auth-service';
import { getStreamByUserId } from '@/lib/stream-service';
import { ToggleCard } from './_components/toggle-card';

export default async function DashboardUserChatsPage() {
  const user = await getUser();
  const stream = await getStreamByUserId(user.id);

  if (!stream) {
    throw new Error('스트리밍이 없습니다.');
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4 ">
        <h1 className="text-2xl font-bold">채팅 설정</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard field="isChatEnabled" label="채팅가능" value={stream.isChatEnabled} />
        <ToggleCard field="isChatDelayed" label="채팅지연" value={stream.isChatDelayed} />
        <ToggleCard
          field="isChatFollowersOnly"
          label="팔로워만 채팅가능"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
