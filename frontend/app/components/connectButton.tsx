'use client';

import { useEffect, useRef } from 'react';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { Blockie } from './blockie/blockie';
import { useScreenSize } from '../hooks/useScreensize';
import { ScreenSize } from '../types/types';
import { shortenAddress } from '../utils/shortenAddress';
import { mainnet } from 'viem/chains';
import { normalize } from 'path';

export const ConnectBtn = () => {
  const { isConnecting, isConnected, chain, address } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { disconnect } = useDisconnect();

  const { data: ensName } = useEnsName({
    address: address,
    chainId: mainnet.id,
  });

  const { data: avatar } = useEnsAvatar({
    name: normalize(ensName ?? ''),
    chainId: mainnet.id,
  });

  const isMounted = useRef(false);

  const isMobile = useScreenSize() === ScreenSize.MOBILE;
  const addressLabel = ensName
    ? ensName
    : isMobile
    ? shortenAddress(address)
    : address;

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
        {address && (
          <Blockie
            avatar={avatar ?? undefined}
            address={ensName ?? address}
            size={24}
          />
        )}
        {addressLabel}
      </div>
    </div>
  );
};
