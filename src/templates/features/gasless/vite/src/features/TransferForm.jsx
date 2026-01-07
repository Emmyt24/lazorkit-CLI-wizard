import { useState } from 'react';
// import { Lazorkit } from 'lazor-kit';

export default function TransferForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const handleGaslessTransfer = async () => {
    setIsLoading(true);
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

      setTxHash(tx.hash);
      console.log("Gasless transfer successful:", tx.hash);
    } catch (error) {
      console.error("Gasless transfer failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <div className="feature-icon">🚀</div>
      <h2>Gasless Transfer</h2>
      <p className="feature-description">Send USDC without paying gas fees on Solana</p>
      <button onClick={handleGaslessTransfer} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Send 1 USDC (Gasless)'}
      </button>
      {txHash && <p className="success">Transaction: {txHash}</p>}
      <p className="feature-description">
        This demonstrates Lazorkit's gasless transaction feature on Solana
        Mainnet.
      </p>
    </div>
  );
}
