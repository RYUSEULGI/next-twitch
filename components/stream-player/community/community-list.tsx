'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParticipants } from '@livekit/components-react';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';
import { ChangeEvent, useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { CommunityListItem } from './community-list-item';

interface Props {
  isHidden: boolean;
  viewerName: string;
  hostName: string;
}

export function ChatCommunityList({ isHidden, viewerName, hostName }: Props) {
  const participants = useParticipants();

  const [value, setValue] = useState('');
  const debouncedValue = useDebounce<string>(value, 300);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const filteredParticipants = useMemo(() => {
    const duplicate = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return duplicate.filter((participant) => {
      return participant.name?.toLowerCase().includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">시청자가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input onChange={onChange} placeholder="필터" className="border-white/10" />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          죄송합니다. {value} 유저를 찾을 수 없습니다. <br />
          커뮤니티의 일부 구성원만 이곳에 나열됩니다.
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityListItem
            key={`community-list-item-${participant.identity}`}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantId={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
