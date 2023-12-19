import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useDashboardSidebar } from '@/store/use-dashboard-sidebar';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

export function NavItem({ label, href, icon: Icon, isActive }: Props) {
  const { collapsed } = useDashboardSidebar((state) => state);

  if (collapsed) {
    return (
      <Hint label={label} side="right" asChild>
        <Button
          asChild
          variant="ghost"
          className={cn(
            'w-full h-12',
            collapsed ? 'justify-center' : 'justify-start',
            isActive && 'bg-accent'
          )}
        >
          <Link href={href}>
            <div className="flex items-center gap-x-4">
              <Icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />
            </div>
          </Link>
        </Button>
      </Hint>
    );
  }

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        'w-full h-12',
        collapsed ? 'justify-center' : 'justify-start',
        isActive && 'bg-accent'
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />
        </div>
        <span>{label}</span>
      </Link>
    </Button>
  );
}

export function NavItemSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
}
