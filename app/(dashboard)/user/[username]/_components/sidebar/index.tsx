import { DashboardNavigation } from './navigation';
import { DashboardToggle } from './toggle';
import { DashboardWrapper } from './wrapper';

export function DashboardSidebar() {
  return (
    <DashboardWrapper>
      <DashboardToggle />
      <DashboardNavigation />
    </DashboardWrapper>
  );
}
