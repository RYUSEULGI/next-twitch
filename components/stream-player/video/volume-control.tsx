'use client';

import { Volume1, Volume2, VolumeX } from 'lucide-react';
import { Hint } from '../../hint';
import { Slider } from '../../ui/slider';

interface Props {
  value: number;
  onChange: (value: number) => void;
  onToggle: () => void;
}

export default function VolumeControl({ value, onChange, onToggle }: Props) {
  const isMuted = value === 0;
  const label = isMuted ? '음소거해제' : '음소거하기';

  const getIcon = () => {
    if (isMuted) {
      return <VolumeX className="h-6 w-6" />;
    }

    if (value > 50) {
      return <Volume2 className="h-6 w-6" />;
    }

    return <Volume1 className="h-6 w-6" />;
  };

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button onClick={onToggle} className="text-white hover:bg-white/10 p-1.5 rounded-lg">
          {getIcon()}
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={handleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
}
