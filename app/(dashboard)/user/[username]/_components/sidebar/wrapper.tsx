'use client';

import { cn } from '@/lib/utils';
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function DashboardWrapper({ children }: Props) {
  const { collapsed } = useDashboardSidebar((state) => state);

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
}
