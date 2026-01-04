"use client";

import { Lazorkit } from "lazor-kit";

export default function TransferForm() {
  const handleGaslessTransfer = async () => {
    try {
      // Assuming wallet is already created (e.g., from passkey)
      const wallet = await Lazorkit.getWallet();

      // Gasless USDC transfer on Solana
      const tx = await wallet.transfer({
        to: "recipient-address",
        amount: "1", // 1 USDC
        token: "USDC",
        gasless: true, // Enable gasless transaction
        network: "solana-mainnet",
      });

      console.log("Gasless transfer successful:", tx.hash);
    } catch (error) {
      console.error("Gasless transfer failed:", error);
    }
  };

  return (
    <div>
      <h2>Gasless USDC Transfer</h2>
      <button onClick={handleGaslessTransfer}>Send 1 USDC (Gasless)</button>
      <p>
        This demonstrates Lazorkit's gasless transaction feature on Solana
        Mainnet.
      </p>
    </div>
  );
}
