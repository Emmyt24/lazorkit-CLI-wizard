import { Lazorkit } from "lazor-kit";
import { useState } from "react";

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("1");

  const handleSwap = async () => {
    try {
      const wallet = await Lazorkit.getWallet();

      const swap = await wallet.swap({
        fromToken: fromToken,
        toToken: toToken,
        amount: amount,
        network: "solana-mainnet",
      });

      console.log("Token swap successful:", swap.txHash);
    } catch (error) {
      console.error("Token swap failed:", error);
    }
  };

  return (
    <div>
      <h2>Basic Token Swap Interface</h2>
      <div>
        <label>From Token:</label>
        <select
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
        >
          <option value="SOL">SOL</option>
          <option value="USDC">USDC</option>
        </select>
      </div>
      <div>
        <label>To Token:</label>
        <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
          <option value="USDC">USDC</option>
          <option value="SOL">SOL</option>
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleSwap}>Swap Tokens</button>
      <p>This demonstrates Lazorkit's token swap functionality.</p>
    </div>
  );
}
