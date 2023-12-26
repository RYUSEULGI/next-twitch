'use client';

import { Maximize, Minimize } from 'lucide-react';
import { Hint } from '../../hint';

interface Props {
  isFullscreen: boolean;
  onToggle: () => void;
}

export function FullscreenControl({ isFullscreen, onToggle }: Props) {
  const label = isFullscreen ? '전체화면 종료' : '전체화면';

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label} asChild>
        <button onClick={onToggle} className="text-white p-1.5 hover:bg-white/10 rounded-lg">
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </button>
      </Hint>
    </div>
  );
}
