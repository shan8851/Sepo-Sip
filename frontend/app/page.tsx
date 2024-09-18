'use client';

import { useAccount } from 'wagmi';
import { Stats } from './components/stats';
import { Title } from './components/title/title';
import { Description } from './description/description';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className=" flex flex-col gap-6 items-center">
      <Title />
      {!isConnected && <Description />}
      <Stats />
    </main>
  );
}
