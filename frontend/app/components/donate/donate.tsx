import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import contractABI from '../../abi.json';
import { parseEther } from 'viem';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useStatsStore } from '@/app/stores/statsStore';

export const Donate = () => {
  const { fetchStats } = useStatsStore();
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const donate = async () => {
    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI,
        functionName: 'deposit',
        value: parseEther('0.1'), // Donating 0.1 ETH
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (hash) {
      toast.loading('Transaction submitted', { id: hash });
    }
    if (isConfirming) {
      toast.loading('Confirming transaction...', { id: hash });
    }
    if (isConfirmed) {
      toast.success(
        <div>
          Donation successful!
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            View on Etherscan
          </a>
        </div>,
        { duration: 5000, id: hash }
      );
      fetchStats(false);
    }
    if (error) {
      toast.error('Transaction failed', { id: hash });
    }
  }, [hash, isConfirming, isConfirmed, error, fetchStats]);

  return (
    <button
      onClick={donate}
      disabled={isPending || isConfirming}
      className="border border-red-400 hover:border-red-600 font-bold p-4 rounded-lg"
    >
      Donate 0.1 ETH
    </button>
  );
};
