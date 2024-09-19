'use client';
import { useEffect } from 'react';
import { Stat } from './stats/stat';
import { FaEthereum, FaServer } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { useStatsStore } from '../stores/statsStore';

export const Stats = () => {
  const {
    totalFunds,
    totalDonators,
    totalRequests,
    fetchStats,
    isLoading,
    error,
  } = useStatsStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const iconClass = 'text-6xl text-red-400';

  if (error) {
    return <div>Error loading stats: {error.message}</div>;
  }

  return (
    <div className="flex gap-8 justify-center">
      <Stat
        icon={<FaEthereum className={iconClass} />}
        title="Faucet Balance"
        value={totalFunds}
        loading={isLoading}
      />
      <Stat
        icon={<FaPeopleGroup className={iconClass} />}
        title="Total Donators"
        value={totalDonators}
        loading={isLoading}
      />
      <Stat
        icon={<FaServer className={iconClass} />}
        title="Total Requests"
        value={totalRequests}
        loading={isLoading}
      />
    </div>
  );
};
