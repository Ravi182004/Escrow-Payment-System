
import { useState } from "react";
import { ethers } from "ethers";
import { connectWallet } from "./blockchain/connectWallet";
import { escrowABI } from "./blockchain/escrowABI";
import { CONTRACT_ADDRESS } from "./blockchain/config";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [details, setDetails] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleConnect() {
    try {
      setMessage("");
      const wallet = await connectWallet();

      setAccount(wallet.account);

      const escrow = new ethers.Contract(
        CONTRACT_ADDRESS,
        escrowABI,
        wallet.signer
      );

      setContract(escrow);
      await loadDetails(escrow);
    } catch (error) {
      setMessage(error.shortMessage || error.message);
    }
  }

  async function loadDetails(escrow = contract) {
    if (!escrow) return;

    try {
      const [
        buyer,
        seller,
        amount,
        deposited,
        completed,
        refunded,
        deadline,
        balance
      ] = await Promise.all([
        escrow.buyer(),
        escrow.seller(),
        escrow.amount(),
        escrow.deposited(),
        escrow.completed(),
        escrow.refunded(),
        escrow.deadline(),
        escrow.getBalance()
      ]);

      setDetails({
        buyer,
        seller,
        amount: ethers.formatEther(amount),
        deposited,
        completed,
        refunded,
        deadline: new Date(Number(deadline) * 1000).toLocaleString(),
        balance: ethers.formatEther(balance)
      });
    } catch (error) {
      setMessage(error.shortMessage || error.message);
    }
  }

  async function handleDeposit() {
    if (!contract || !depositAmount) return;

    try {
      setLoading(true);
      setMessage("Waiting for transaction confirmation...");

      const tx = await contract.deposit({
        value: ethers.parseEther(depositAmount)
      });

      await tx.wait();

      setMessage("Deposit successful!");
      setDepositAmount("");
      await loadDetails();
    } catch (error) {
      setMessage(error.shortMessage || error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRelease() {
    if (!contract) return;

    try {
      setLoading(true);
      setMessage("Waiting for transaction confirmation...");

      const tx = await contract.releaseFunds();
      await tx.wait();

      setMessage("Funds released to seller!");
      await loadDetails();
    } catch (error) {
      setMessage(error.shortMessage || error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefund() {
    if (!contract) return;

    try {
      setLoading(true);
      setMessage("Waiting for transaction confirmation...");

      const tx = await contract.refundBuyer();
      await tx.wait();

      setMessage("Refund completed!");
      await loadDetails();
    } catch (error) {
      setMessage(error.shortMessage || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>Escrow Payment System</h1>
        <p>Secure payments powered by Ethereum blockchain</p>
      </header>

      <main>
        <button onClick={handleConnect} disabled={loading}>
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect MetaMask"}
        </button>

        {message && <p className="message">{message}</p>}

        {details && (
          <>
            <section className="card">
              <h2>Contract Details</h2>
              <p><strong>Buyer:</strong> {details.buyer}</p>
              <p><strong>Seller:</strong> {details.seller}</p>
              <p><strong>Deadline:</strong> {details.deadline}</p>
              <p><strong>Deposited Amount:</strong> {details.amount} ETH</p>
              <p><strong>Contract Balance:</strong> {details.balance} ETH</p>
              <p><strong>Deposited:</strong> {details.deposited ? "Yes" : "No"}</p>
              <p><strong>Completed:</strong> {details.completed ? "Yes" : "No"}</p>
              <p><strong>Refunded:</strong> {details.refunded ? "Yes" : "No"}</p>

              <button onClick={() => loadDetails()} disabled={loading}>
                Refresh Details
              </button>
            </section>

            <section className="card">
              <h2>Deposit ETH</h2>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="Enter ETH amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
              <button
                onClick={handleDeposit}
                disabled={loading || !depositAmount || Number(depositAmount) <= 0}
              >
                Deposit
              </button>
            </section>

            <section className="card">
              <h2>Release Payment</h2>
              <p>Buyer can release deposited funds to the seller.</p>
              <button onClick={handleRelease} disabled={loading}>
                Release Funds
              </button>
            </section>

            <section className="card">
              <h2>Refund</h2>
              <p>Buyer can request a refund after the deadline.</p>
              <button onClick={handleRefund} disabled={loading}>
                Refund ETH
              </button>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
