import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import contractABI from '../../abi.json';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export const Request = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const { data: isAllowed } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'allowedToRequestPayout',
    args: [address],
  });

  const sendEth = () => {
    if (!address) {
      toast.error('No address found');
      return;
    }
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: contractABI,
      functionName: 'sendEth',
      args: [address],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const requestEth = async () => {
    if (isAllowed) {
      sendEth();
    } else {
      toast.error("You're not allowed to request ETH at this time.");
    }
  };

  useEffect(() => {
    if (hash) {
      toast.loading('Request submitted', { id: hash });
    }
    if (isConfirming) {
      toast.loading('Confirming request...', { id: hash });
    }
    if (isConfirmed) {
      toast.success(
        <div>
          ETH received successfully!
          <a
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline ml-2"
          >
            View on Etherscan
          </a>
        </div>,
        { duration: 5000, id: hash }
      );
    }
    if (error) {
      toast.error('Request failed', { id: hash });
    }
  }, [hash, isConfirming, isConfirmed, error]);

  console.log(error, isPending);

  return (
    <button
      onClick={requestEth}
      disabled={!address || isPending || isConfirming}
      className="p-4 bg-red-400 text-slate-900 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending || isConfirming ? 'Requesting...' : 'Request 0.05 ETH'}
    </button>
  );
};
