import { useState } from 'react';
// import { Lazorkit } from 'lazor-kit';

export default function PayWidget({ amount = '0.1', merchant = 'example-merchant' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // const payment = await Lazorkit.createPayment({
      //   amount: amount,
      //   currency: "SOL",
      //   merchant: merchant,
      //   widget: true,
      // });

      // payment.showWidget();

      // payment.on("success", (tx) => {
      //   console.log("Payment successful:", tx);
      //   setPaymentStatus('success');
      // });

      setPaymentStatus('success');
      console.log("Payment initiated: " + amount + " SOL");
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <h3>Pay with Solana</h3>
      <p>Amount: {amount} SOL</p>
      <button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {paymentStatus === 'success' && <p className="success">Payment completed successfully!</p>}
      {paymentStatus === 'error' && <p className="error">Payment failed. Please try again.</p>}
    </div>
  );
}
