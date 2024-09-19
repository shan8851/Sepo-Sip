# SEPO-SIP Smart Contracts

This directory contains the smart contracts for the SEPO-SIP Sepolia faucet.

## Contract Overview

The main contract is `Faucet.sol`, which implements the following functionality:

- ETH requests (0.05 ETH every 24 hours)
- ETH donations
- Tracking of donators and their contributions
- Owner-only functions for contract management

## Development

We use Foundry for smart contract development. Make sure you have it installed.

### Setup

1. Install dependencies:
   ```
   forge install
   ```

2. Build the contracts:
   ```
   forge build
   ```

3. Run tests:
   ```
   forge test
   ```

### Key Files

- `src/Faucet.sol`: Main faucet contract
- `test/Faucet.t.sol`: Contract tests
- `script/DeployFaucet.s.sol`: Deployment script

## Verification

The contract is verified on [Etherscan](https://sepolia.etherscan.io/address/0x9c1bf4facda0312df3a377d14d0c2429df96a044).

## Security

This contract uses OpenZeppelin's libraries for enhanced security. Always ensure you're using the latest version and consider a professional audit before mainnet deployment.
