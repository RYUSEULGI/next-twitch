'use client';

import { useUser } from '@clerk/nextjs';
import { Fullscreen, KeyRound, MessagesSquare, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavItem, NavItemSkeleton } from './nav-item';

export function DashboardNavigation() {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: '스트리밍',
      href: `/user/${user?.username}/stream`,
      icon: Fullscreen
    },
    {
      label: '채팅',
      href: `/user/${user?.username}/chats`,
      icon: MessagesSquare
    },
    {
      label: '커뮤니티',
      href: `/user/${user?.username}/community`,
      icon: User
    },
    { label: '설정', href: `/user/${user?.username}/keys`, icon: KeyRound }
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2 px-2 pt-4 lg:pt-0">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={`nav-item-skeleton-${i}`} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={`sidebar-menu-${route.label}`}
          label={route.label}
          href={route.href}
          icon={route.icon}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
}
