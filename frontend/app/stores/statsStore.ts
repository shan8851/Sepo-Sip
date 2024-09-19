import { create } from 'zustand';
import { formatEther } from 'viem';
import { readContract } from '@wagmi/core';
import contractABI from '../abi.json';
import { config } from '../config';

interface StatsState {
  totalFunds: string;
  totalDonators: string;
  totalRequests: string;
  isLoading: boolean;
  error: Error | null;
  fetchStats: (showLoading?: boolean) => Promise<void>;
}

export const useStatsStore = create<StatsState>((set) => ({
  totalFunds: '0',
  totalDonators: '0',
  totalRequests: '0',
  isLoading: false,
  error: null,
  fetchStats: async (showLoading = true) => {
    const contractAddress = process.env
      .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

    if (showLoading) {
      set({ isLoading: true, error: null });
    }

    try {
      const [totalFunds, totalDonators, totalRequests] = await Promise.all([
        readContract(config, {
          address: contractAddress,
          abi: contractABI,
          functionName: 'getTotalFaucetFunds',
        }),
        readContract(config, {
          address: contractAddress,
          abi: contractABI,
          functionName: 'getTotalDonators',
        }),
        readContract(config, {
          address: contractAddress,
          abi: contractABI,
          functionName: 'getTotalPayouts',
        }),
      ]);

      set({
        totalFunds: formatEther(totalFunds as bigint),
        totalDonators: (totalDonators as bigint).toString(),
        totalRequests: (totalRequests as bigint).toString(),
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      set({ error: error as Error, isLoading: false });
    }
  },
}));
