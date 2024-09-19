import { create } from 'zustand';
import { readContract } from '@wagmi/core';
import contractABI from '../abi.json';
import { config } from '../config';
import { formatEther } from 'viem';

interface Donator {
  walletAddress: `0x${string}`;
  amountDonated: string;
}

interface RawDonator {
  walletAddress: `0x${string}`;
  amountDonated: bigint;
  hasDonated: boolean;
  lastTimeSentAt: bigint;
}

interface LeaderboardState {
  donators: Donator[];
  isLoading: boolean;
  error: Error | null;
  fetchLeaderboard: () => Promise<void>;
  updateDonator: (address: `0x${string}`, amount: bigint) => void;
}

export const useLeaderboardStore = create<LeaderboardState>((set, get) => ({
  donators: [],
  isLoading: false,
  error: null,
  fetchLeaderboard: async () => {
    const contractAddress = process.env
      .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
    set({ isLoading: true, error: null });

    try {
      const addresses = (await readContract(config, {
        address: contractAddress,
        abi: contractABI,
        functionName: 'getDonatorAddresses',
      })) as `0x${string}`[];

      const donatorPromises = addresses.map(
        (address) =>
          readContract(config, {
            address: contractAddress,
            abi: contractABI,
            functionName: 'getIndividualDonator',
            args: [address],
          }) as Promise<RawDonator>
      );

      const donatorsData = await Promise.all(donatorPromises);
      const formattedDonators = donatorsData.map((donator) => ({
        walletAddress: donator.walletAddress,
        amountDonated: formatEther(donator.amountDonated),
      }));

      set({
        donators: formattedDonators.sort(
          (a, b) => parseFloat(b.amountDonated) - parseFloat(a.amountDonated)
        ),
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      set({ error: error as Error, isLoading: false });
    }
  },
  updateDonator: (address, amount) => {
    const { donators } = get();
    const updatedDonators = donators.map((donator) =>
      donator.walletAddress === address
        ? { ...donator, amountDonated: formatEther(amount) }
        : donator
    );
    if (!updatedDonators.some((d) => d.walletAddress === address)) {
      updatedDonators.push({
        walletAddress: address,
        amountDonated: formatEther(amount),
      });
    }
    set({
      donators: updatedDonators.sort(
        (a, b) => parseFloat(b.amountDonated) - parseFloat(a.amountDonated)
      ),
    });
  },
}));
