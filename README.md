# SEPO-SIP: Sepolia Faucet

Welcome to SEPO-SIP, an Ethereum faucet running on the Sepolia testnet!

## About

Out of ETH on Sepolia? We've got you covered! SEPO-SIP allows you to request 0.05 ETH every 24 hours, ensuring you have the test ETH you need for development and testing.

## Features

- Request 0.05 ETH every 24 hours
- Donate ETH to keep the faucet running
- View faucet statistics (total donations, number of donors, etc.)
- Smart contract powered by OpenZeppelin for enhanced security

## Project Structure

```
sepo-sip/
├── contracts/            # Smart contract files
│   ├── src/              # Contract source code
│   ├── test/             # Contract tests
│   ├── script/           # Deployment scripts
│   └── lib/              # Dependencies (e.g., OpenZeppelin)
├── frontend/             # Frontend application (to be implemented)
├── .github/              # GitHub-specific files (e.g., workflows)
├── .env.example          # Example environment file
├── .solhint.json         # Solidity linter configuration
├── .solhintignore        # Solidity linter ignore file
├── Makefile              # Project-wide task runner
└── README.md             # Project documentation
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   cd contracts
   forge install
   ```
3. Build the project:
   ```
   make build
   ```
4. Run tests:
   ```
   make test
   ```

## Environment Setup

1. Copy `.env.example` to `.env`:
   ```
   cp .env.example .env
   ```
2. Fill in your own values in the `.env` file.

Note: Never commit your `.env` file .

## Contributing

This dApp needs you! We cannot thrive without user donations. Please consider donating some ETH so that others can access it when needed. You can donate 0.1 ETH directly through the site. For larger donations, please reach out on [X](https://x.com/shan8851).

## Development

- Use `make lint` to run the Solidity linter
- Ensure all tests pass with `make test` before submitting a pull request

## Deployment

- To deploy to a local network: `make deploy-local`
- To deploy to Sepolia testnet: `make deploy-sepolia` (Ensure you have set the `SEPOLIA_RPC_URL` environment variable)

## Contact

For questions, larger donations, or collaboration opportunities, please reach out on [X](https://x.com/shan8851): [@shan8851]

## License

This project is licensed under the MIT License - see the LICENSE file for details.
