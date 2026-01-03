import { Lazorkit } from "lazor-kit";

export default function PayWidget({ amount, merchant }) {
  const handlePayment = async () => {
    try {
      const payment = await Lazorkit.createPayment({
        amount: amount,
        currency: "SOL",
        merchant: merchant,
        widget: true, // Enable widget mode
      });

      // Open payment widget
      payment.showWidget();

      payment.on("success", (tx) => {
        console.log("Payment successful:", tx);
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div>
      <h3>Pay with Solana</h3>
      <p>Amount: {amount} SOL</p>
      <button onClick={handlePayment}>Pay Now</button>
      <p>This demonstrates Lazorkit's "Pay with Solana" widget integration.</p>
    </div>
  );
}
