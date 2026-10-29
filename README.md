# Escrow Payment System | Solidity & Ethereum

A blockchain-based escrow payment system developed using Solidity and deployed on the Ethereum Sepolia testnet. The smart contract securely holds a buyer's ETH until the buyer authorizes payment to the seller, with a deadline-based refund mechanism if the transaction is not completed.

## Features
- **Secure Deposits:** Accepts and holds ETH in a smart contract.
- **Controlled Payments:** Allows only the buyer to authorize the release of funds to the seller.
- **Deadline-Based Refunds:** Enables the buyer to reclaim deposited funds after the deadline if payment has not been released.
- **Access Control:** Restricts sensitive operations to the authorized buyer.
- **Transaction Events:** Emits events for deposits, payment releases, and refunds.
- **Balance Tracking:** Provides a function to check the contract's ETH balance.
- **Blockchain Deployment:** Supports deployment and testing on Ethereum Sepolia.

## Tech Stack
- Solidity
- Ethereum Blockchain
- Remix IDE
- MetaMask
- Ethereum Sepolia Testnet
- Sepolia Etherscan

## How It Works
1. Deploy the smart contract with the seller's wallet address and an escrow deadline.
2. The buyer deposits ETH into the contract.
3. The buyer authorizes the release of funds to the seller after the agreed conditions are met.
4. If the deadline passes before payment is released, the buyer can request a refund.
5. All successful transactions are recorded on the blockchain.

## Learning Outcomes
- Smart contract development using Solidity.
- Ether transfers and payable functions.
- Access control and transaction-state management.
- Blockchain deployment and transaction verification.
- Testing smart contract functions using Remix IDE.

**Note:** This project is an educational prototype and has not been audited for production use.
