import { useDonator } from '@/app/hooks/useDonator';
import { formatEther } from 'viem';
import { Blockie } from '../blockie/blockie';
import { Spinner } from '../spinner/spinner';

export interface ILeaderboardItemProps {
  address: `0x${string}`;
}

export const LeaderboardItem: React.FC<ILeaderboardItemProps> = (props) => {
  const { address } = props;
  const { donator, isLoading, isError } = useDonator(address);

  if (isLoading)
    return (
      <div className="flex gap-4 w-full max-w-6xl justify-center">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="w-full max-w-6xl justify-center">
        Something went wrong fetching donator data
      </div>
    );

  const formattedAmount = formatEther(
    donator.amountDonated as bigint
  ).toString();

  return (
    <div className="flex gap-4 w-full max-w-6xl justify-center">
      <Blockie address={donator.walletAddress} size={24} />
      <h1 className="flex-grow">{donator.walletAddress}</h1>
      <h2>{`${formattedAmount} ETH`}</h2>
    </div>
  );
};
