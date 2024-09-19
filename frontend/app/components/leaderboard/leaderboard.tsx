import { useEffect } from 'react';
import { useLeaderboardStore } from '@/app/stores/leaderboardStore';
import { LeaderboardItem } from './leaderboardItem';
import { Spinner } from '../spinner/spinner';

export const Leaderboard = () => {
  const { donators, isLoading, error, fetchLeaderboard } =
    useLeaderboardStore();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  if (isLoading) return <Spinner />;

  if (error) return <div>Something went wrong fetching donators</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Top Donators 🔥</h2>
      <div className="flex flex-col gap-2">
        {donators.map((donator, index) => (
          <LeaderboardItem key={index} donator={donator} />
        ))}
      </div>
    </div>
  );
};
