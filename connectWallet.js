
import { ethers } from "ethers";
import { SEPOLIA_CHAIN_ID } from "./config";

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed. Please install MetaMask.");
  }

  // Request wallet connection
  await window.ethereum.request({
    method: "eth_requestAccounts"
  });

  // Create provider
  const provider = new ethers.BrowserProvider(window.ethereum);

  // Check network
  const network = await provider.getNetwork();

  if (Number(network.chainId) !== SEPOLIA_CHAIN_ID) {
    throw new Error("Please switch MetaMask to the Sepolia test network.");
  }

  // Get connected account and signer
  const signer = await provider.getSigner();
  const account = await signer.getAddress();

  return {
    provider,
    signer,
    account
  };
}
