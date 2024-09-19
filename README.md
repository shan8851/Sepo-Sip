# SEPO-SIP: Sepolia Faucet

Welcome to SEPO-SIP, an Ethereum faucet running on the Sepolia testnet!

## About

SEPO-SIP is a application that allows developers to request test ETH on the Sepolia network. It's built with a focus on community contribution, allowing users to donate ETH to keep the faucet running.

## Features

- Request 0.05 ETH every 24 hours
- Donate ETH to support the faucet
- View faucet statistics (total donations, number of donors, etc.)
- Leaderboard tracking top donators
- Wallet connectivity using RainbowKit
- Smart contract powered by OpenZeppelin for enhanced security

## Tech Stack

- Smart Contracts: Solidity, Foundry
- Frontend: Next.js, wagmi, TanStack Query, viem, RainbowKit
- Development: TypeScript, Tailwind CSS

## Project Structure

```
sepo-sip/
├── contracts/            # Smart contract files
│   ├── src/              # Contract source code
│   ├── test/             # Contract tests
│   ├── script/           # Deployment scripts
│   └── lib/              # Dependencies (e.g., OpenZeppelin)
├── frontend/             # Frontend Next.js application
├── .github/              # GitHub-specific files (e.g., workflows)
├── .env.example          # Example environment file
├── .solhint.json         # Solidity linter configuration
├── .solhintignore        # Solidity linter ignore file
├── Makefile              # Project-wide task runner
└── README.md             # Project documentation
```

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```
   make install
   ```
3. Set up environment variables (see Environment Setup below)
4. Build the project:
   ```
   make build
   ```
5. Run tests:
   ```
   make test
   ```
6. Start the development server:
   ```
   make frontend-dev
   ```

## Environment Setup

1. Copy `.env.example` to `.env` in both root and frontend directories
2. Fill in your own values in the `.env` files

Note: Never commit your `.env` files to version control.

## Contributing

We welcome contributions! If you have a feature idea, spotted a bug or anything else, please open a PR

## Development

- Use `make lint` to run linters for both Solidity and TypeScript
- Ensure all tests pass with `make test` before submitting a pull request

## Deployment

- To deploy smart contracts to Sepolia testnet: `make deploy-sepolia`

For more detailed information about the smart contracts or frontend, please refer to their respective README files in the `contracts/` and `frontend/` directories.

## Contact

For questions, larger donations, or collaboration opportunities, please reach out on [X](https://x.com/shan8851): [@shan8851]

## License

This project is licensed under the MIT License.
