import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { CopyButton } from './copy-button';

interface Props {
  value: string;
}

export function UrlCard({ value }: Props) {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0 min-w-[100px]">서버 URL</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input value={value} disabled placeholder="서버 URL" />
            <CopyButton value={value} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ToggleCardSkeleton() {
  return <Skeleton className="rounded-xl p-10 w-full" />;
}
