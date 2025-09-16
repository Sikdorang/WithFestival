import BottomSpace from '@/components/common/exceptions/BottomSpace';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import TopBar from '@/components/common/layouts/TopBar';
import JoinWaitlistForm from '@/components/pages/waiting/JoinWaitlistForm';

const mockWaitingListNumber = 20;

export default function Waiting() {
  return (
    <BaseResponsiveLayout>
      <TopBar />
      <JoinWaitlistForm waitingListNumber={mockWaitingListNumber} />
      <BottomSpace />
    </BaseResponsiveLayout>
  );
}
