# Makefile for SEPO-SIP project

include .env
export

# Variables
CONTRACTS_DIR := contracts
FRONTEND_DIR := frontend

# Phony targets
.PHONY: all test build deploy-local deploy-sepolia lint clean help frontend-dev frontend-build frontend-start

# Default target
all: build

# Build the smart contracts
build:
	@echo "Building smart contracts..."
	@forge build -C $(CONTRACTS_DIR)

# Run tests for smart contracts
test:
	@echo "Running smart contract tests..."
	@cd $(CONTRACTS_DIR) && forge test

# Deploy to local network (if local node is running)
deploy-local:
	@echo "Deploying to local network..."
	@forge script -C $(CONTRACTS_DIR) script/DeployFaucet.s.sol --broadcast --fork-url http://localhost:8545

# Deploy to Sepolia testnet (needs SEPOLIA_RPC_URL to be set)
deploy-sepolia:
	@echo "Deploying to Sepolia testnet..."
	@forge script -C $(CONTRACTS_DIR) script/DeployFaucet.s.sol --broadcast --rpc-url ${SEPOLIA_RPC_URL}

lint:
	@echo "Linting Solidity files..."
	@solhint 'contracts/src/**/*.sol' 'contracts/test/**/*.sol'

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@forge clean -C $(CONTRACTS_DIR)
	@cd $(FRONTEND_DIR) && npm run clean

# Frontend commands
frontend-dev:
	@echo "Starting Next.js development server..."
	@cd $(FRONTEND_DIR) && npm run dev

frontend-build:
	@echo "Building Next.js application..."
	@cd $(FRONTEND_DIR) && npm run build

frontend-start:
	@echo "Starting Next.js production server..."
	@cd $(FRONTEND_DIR) && npm start

# Help command to display available commands
help:
	@echo "Available commands:"
	@echo "  make build          - Build smart contracts"
	@echo "  make test           - Run smart contract tests"
	@echo "  make deploy-local   - Deploy to local network"
	@echo "  make deploy-sepolia - Deploy to Sepolia testnet"
	@echo "  make lint           - Lint Solidity files"
	@echo "  make clean          - Clean build artifacts"
	@echo "  make frontend-dev   - Start Next.js development server"
	@echo "  make frontend-build - Build Next.js application"
	@echo "  make frontend-start - Start Next.js production server"
	@echo "  make help           - Display this help message"
