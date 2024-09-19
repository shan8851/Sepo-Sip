import { Blockie } from '../blockie/blockie';

export interface ILeaderboardItemProps {
  donator: {
    walletAddress: `0x${string}`;
    amountDonated: string;
  };
}

export const LeaderboardItem: React.FC<ILeaderboardItemProps> = ({
  donator,
}) => {
  return (
    <div className="flex gap-4 w-full max-w-6xl justify-center">
      <Blockie address={donator.walletAddress} size={24} />
      <h1 className="flex-grow">{donator.walletAddress}</h1>
      <h2>{`${donator.amountDonated} ETH`}</h2>
    </div>
  );
};
