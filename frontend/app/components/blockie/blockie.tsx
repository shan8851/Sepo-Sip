import React from 'react';
import makeBlockie from 'ethereum-blockies-base64';
import Image from 'next/image';

interface BlockieProps {
  address: string;
  size?: number;
  className?: string;
  avatar?: string;
}

export const Blockie: React.FC<BlockieProps> = ({
  address,
  size = 40,
  className = '',
  avatar,
}) => {
  const dataUrl = React.useMemo(() => {
    return makeBlockie(address);
  }, [address]);

  return (
    <Image
      src={avatar ?? dataUrl}
      width={size}
      height={size}
      className={`rounded-sm ${className}`}
      alt={`Blockie for ${address}`}
    />
  );
};
