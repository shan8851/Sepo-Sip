'use client';

import { useAccount } from 'wagmi';
import { Stats } from './components/stats';
import { Title } from './components/title/title';
import { Description } from './description/description';
import { Request } from './components/request/request';
import { Donate } from './components/donate/donate';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className=" flex flex-col gap-6 items-center">
      <Title />
      {!isConnected && <Description />}
      {isConnected && (
        <div className="flex gap-2">
          <Request />
          <Donate />
        </div>
      )}
      <Stats />
    </main>
  );
}
