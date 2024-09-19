'use client';

import { useEffect, useRef } from 'react';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Blockie } from './blockie/blockie';

export const ConnectBtn = () => {
  const { isConnecting, isConnected, chain, address } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isConnected) {
    return (
      <button
        className="p-4 bg-red-400 text-slate-900 rounded-lg font-bold"
        onClick={async () => {
          if (isConnected) {
            disconnect();
          }
          openConnectModal?.();
        }}
        disabled={isConnecting}
      >
        {isConnecting ? 'Connecting...' : 'Connect wallet'}
      </button>
    );
  }

  if (isConnected && !chain) {
    return (
      <button className="btn" onClick={openChainModal}>
        Wrong network
      </button>
    );
  }

  return (
    <div className="max-w-5xl w-full flex items-center justify-between">
      <div
        className="flex justify-center items-center px-4 py-2 border border-neutral-700 bg-neutral-800/30 rounded-xl gap-x-2 cursor-pointer"
        onClick={async () => openAccountModal?.()}
      >
        {address && <Blockie address={address} size={32} />}
        {address}
      </div>
    </div>
  );
};
