'use client';

import { Dropdown } from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/input';
import { ChevronDownIcon } from 'lucide-react';
import { RTMP, WHIP } from './connect-modal';

interface Props {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function ConnectSelectBox({ disabled, value, onChange }: Props) {
  const getValue = () => {
    if (value === RTMP) {
      return 'RTMP';
    }

    if (value === WHIP) {
      return 'WHIP';
    }

    return '';
  };

  return (
    <Dropdown defaultValue={value} onChangeValue={onChange}>
      <Dropdown.Trigger className="w-full">
        <div className="relative">
          <Input disabled={disabled} value={getValue()} placeholder="선택해주세요" readOnly />
          <ChevronDownIcon className="absolute top-3 right-3 w-4 h-4 opacity-50" />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item value={RTMP}>RTMP</Dropdown.Item>
        <Dropdown.Item value={WHIP}>WHIP</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
