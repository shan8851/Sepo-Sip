'use client';

import { useScreenSize } from '@/app/hooks/useScreensize';
import { Blockie } from '../blockie/blockie';
import { ScreenSize } from '@/app/types/types';
import { shortenAddress } from '@/app/utils/shortenAddress';
import { useEnsAvatar, useEnsName } from 'wagmi';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

export interface ILeaderboardItemProps {
  donator: {
    walletAddress: `0x${string}`;
    amountDonated: string;
  };
}

export const LeaderboardItem: React.FC<ILeaderboardItemProps> = ({
  donator,
}) => {
  const { walletAddress, amountDonated } = donator;
  const { data: ensName } = useEnsName({
    address: walletAddress,
    chainId: mainnet.id,
  });

  const { data: avatar } = useEnsAvatar({
    name: normalize(ensName ?? ''),
    chainId: mainnet.id,
  });

  const isMobile = useScreenSize() === ScreenSize.MOBILE;
  const address = ensName
    ? ensName
    : isMobile
    ? shortenAddress(walletAddress)
    : walletAddress;

  return (
    <div className="flex gap-4 w-full max-w-6xl justify-center">
      <Blockie avatar={avatar ?? undefined} address={walletAddress} size={24} />
      <h1 className="flex-grow">{address}</h1>
      <h2>{`${amountDonated} ETH`}</h2>
    </div>
  );
};
