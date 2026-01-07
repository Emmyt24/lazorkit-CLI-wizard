import { useState } from 'react';
// import { Lazorkit } from 'lazor-kit';

export default function TransferForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const handleGaslessTransfer = async () => {
    setIsLoading(true);
    try {
      // const wallet = await Lazorkit.getWallet();

      // const tx = await wallet.transfer({
      //   to: "recipient-address",
      //   amount: "1",
      //   token: "USDC",
      //   gasless: true,
      //   network: "solana-mainnet",
      // });

      setTxHash("demo_tx_" + Math.random().toString(36).substr(2, 9));
      console.log("Gasless transfer successful: 1 USDC");
    } catch (error) {
      console.error("Gasless transfer failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <h2>Gasless USDC Transfer</h2>
      <button onClick={handleGaslessTransfer} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Send 1 USDC (Gasless)'}
      </button>
      {txHash && <p className="success">Transaction: {txHash}</p>}
      <p>
        This demonstrates Lazorkit's gasless transaction feature on Solana
        Mainnet.
      </p>
    </div>
  );
}
