'use client';

import { http, createStorage, cookieStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { Chain, getDefaultConfig } from '@rainbow-me/rainbowkit';

const supportedChains: Chain[] = [sepolia, mainnet];

export const config = getDefaultConfig({
  appName: 'SepoSip',
  projectId: '41aca63a9d00b5d63a65b4a1387c5ef5',
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
