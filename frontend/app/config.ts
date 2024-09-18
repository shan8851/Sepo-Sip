'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;

const supportedChains: Chain[] = [sepolia];

export const config = getDefaultConfig({
  appName: 'SepoSip',
  projectId,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
