## 📁 Project Structure

```text
Escrow-Payment-System/
│
├── public/
│   └── vite.svg
│
├── src/
│   │
│   ├── blockchain/
│   │   ├── config.js
│   │   ├── connectWallet.js
│   │   └── escrowABI.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── contracts/
│   └── Escrow.sol
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

## 📌 Folder and File Description

### 1. `public/`
Contains static assets used by the frontend application, such as images and icons.

### 2. `src/`
Contains the main React application source code.

**`src/blockchain/`** – Contains files responsible for blockchain integration.

- **`config.js`** – Stores the deployed smart contract address and Ethereum Sepolia network configuration.
- **`connectWallet.js`** – Handles MetaMask wallet connection, retrieves the connected account, and verifies the selected blockchain network.
- **`escrowABI.js`** – Contains the Application Binary Interface (ABI), which allows the frontend to interact with the deployed Solidity smart contract.

**Other source files:**

- **`App.jsx`** – Main React component that provides the user interface and handles escrow operations such as depositing ETH, releasing funds, and requesting refunds.
- **`App.css`** – Contains styling and layout rules for the application.
- **`main.jsx`** – Entry point of the React application that renders the main App component.

### 3. `contracts/`
Contains the Solidity smart contract source code.

- **`Escrow.sol`** – Implements the escrow payment logic, including buyer and seller management, ETH deposits, fund release, and refunds.

### 4. Root Configuration Files

- **`index.html`** – Main HTML entry point used by Vite.
- **`package.json`** – Contains project metadata, dependencies, and scripts required to run the application.
- **`package-lock.json`** – Locks dependency versions for consistent installations.
- **`vite.config.js`** – Contains Vite development and build configuration.
- **`.gitignore`** – Specifies files and folders that should not be uploaded to Git.
- **`README.md`** – Provides project information, features, technologies, setup instructions, and documentation.

## 🔄 Application Workflow

1. User opens the React application.
2. User connects their MetaMask wallet.
3. The application verifies the Ethereum Sepolia network.
4. Ethers.js uses the contract address and ABI to communicate with the deployed smart contract.
5. Buyer deposits ETH into the escrow contract.
6. Buyer can release the payment to the seller or request a refund after the deadline.
7. Contract details and transaction status are displayed in the frontend.

**Note:** The smart contract was developed and deployed using Remix IDE on the Ethereum Sepolia Testnet. The `contracts/Escrow.sol` file contains its source code for project documentation and reproducibility.
