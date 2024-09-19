import { useReadContract } from 'wagmi';
import contractABI from '../abi.json';

const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const useDonator = (address: `0x${string}`) => {
  const {
    data: donator,
    isError,
    isLoading,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getIndividualDonator',
    args: [address],
  }) as {
    data: {
      walletAddress: `0x${string}`;
      amountDonated: bigint;
    };
    isError: boolean;
    isLoading: boolean;
  };

  return {
    donator,
    isLoading,
    isError,
  };
};
