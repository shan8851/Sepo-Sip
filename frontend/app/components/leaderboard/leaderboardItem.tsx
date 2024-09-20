import { useScreenSize } from '@/app/hooks/useScreensize';
import { Blockie } from '../blockie/blockie';
import { ScreenSize } from '@/app/types/types';
import { shortenAddress } from '@/app/utils/shortenAddress';

export interface ILeaderboardItemProps {
  donator: {
    walletAddress: `0x${string}`;
    amountDonated: string;
  };
}

export const LeaderboardItem: React.FC<ILeaderboardItemProps> = ({
  donator,
}) => {
  const isMobile = useScreenSize() === ScreenSize.MOBILE;
  const address = isMobile
    ? shortenAddress(donator.walletAddress)
    : donator.walletAddress;

  return (
    <div className="flex gap-4 w-full max-w-6xl justify-center">
      <Blockie address={donator.walletAddress} size={24} />
      <h1 className="flex-grow">{address}</h1>
      <h2>{`${donator.amountDonated} ETH`}</h2>
    </div>
  );
};
