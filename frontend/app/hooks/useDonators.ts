import { useReadContract } from 'wagmi';
import contractABI from '../abi.json';

const contractAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export const useDonators = () => {
  const {
    data: donators,
    isError,
    isLoading,
  } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: 'getDonatorAddresses',
  }) as {
    data: `0x${string}`[] | undefined;
    isError: boolean;
    isLoading: boolean;
  };

  return {
    donators,
    isLoading,
    isError,
  };
};
