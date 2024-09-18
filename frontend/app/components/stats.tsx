'use client';
import contractABI from '../abi.json';
import { useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import { Stat } from './stats/stat';
import { FaEthereum, FaServer } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';

export const Stats = () => {
  const {
    data: totalFunds,
    isError: totalFundsError,
    isLoading: totalFundsLoading,
  } = useReadContract({
    abi: contractABI,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'getTotalFaucetFunds',
  });

  const {
    data: donators,
    isError: donatorsError,
    isLoading: donatorsLoading,
  } = useReadContract({
    abi: contractABI,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'getTotalDonators',
  });

  const {
    data: requests,
    isError: requestsError,
    isLoading: requestsLoading,
    error,
  } = useReadContract({
    abi: contractABI,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    functionName: 'getTotalPayouts',
  });

  // Format the data
  const formattedTotalFunds = totalFunds
    ? formatEther(totalFunds as bigint)
    : '0';
  const formattedDonators = donators ? donators.toString() : '0';
  const formattedRequests = requests ? requests.toString() : '0';

  const iconClass = 'text-6xl text-red-400';

  console.debug(requests, requestsError, requestsLoading, error);

  return (
    <div className="flex gap-8 justify-center">
      <Stat
        icon={<FaEthereum className={iconClass} />}
        title="Faucet Balance"
        value={formattedTotalFunds}
        error={totalFundsError}
        loading={totalFundsLoading}
      />
      <Stat
        icon={<FaPeopleGroup className={iconClass} />}
        title="Total Donators"
        value={formattedDonators}
        error={donatorsError}
        loading={donatorsLoading}
      />
      <Stat
        icon={<FaServer className={iconClass} />}
        title="Total Requests"
        value={formattedRequests}
        error={requestsError}
        loading={requestsLoading}
      />
    </div>
  );
};
