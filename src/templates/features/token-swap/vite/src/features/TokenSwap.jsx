import { useState } from 'react';
// import { Lazorkit } from 'lazor-kit';

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const handleSwap = async () => {
    setIsLoading(true);
    try {
      const wallet = await Lazorkit.getWallet();

      const swap = await wallet.swap({
        fromToken: fromToken,
        toToken: toToken,
        amount: amount,
        network: "solana-mainnet",
      });

      setTxHash(swap.txHash);
      console.log("Token swap successful:", swap.txHash);
    } catch (error) {
      console.error("Token swap failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <div className="feature-icon">🔄</div>
      <h2>Token Swap</h2>
      <p className="feature-description">Swap tokens instantly on Solana with gasless transactions</p>
      <div className="swap-form">
        <div className="form-group">
          <label>From Token:</label>
          <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
            <option value="SOL">SOL</option>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
          </select>
        </div>
        <div className="form-group">
          <label>To Token:</label>
          <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
            <option value="USDC">USDC</option>
            <option value="SOL">SOL</option>
            <option value="USDT">USDT</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
          />
        </div>
        <button onClick={handleSwap} disabled={isLoading}>
          {isLoading ? 'Swapping...' : 'Swap Tokens'}
        </button>
      </div>
      {txHash && <p className="success">Swap successful! Hash: {txHash}</p>}
    </div>
  );
}
