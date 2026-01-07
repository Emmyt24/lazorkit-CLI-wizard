import { useState } from 'react';
// import { Lazorkit } from 'lazor-kit';

export default function PayWidget({ amount = '0.1', merchant = 'example-merchant' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handlePayment = async () => {
    setIsLoading(true);
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
        setPaymentStatus('success');
      });

      payment.on("error", (error) => {
        console.error("Payment error:", error);
        setPaymentStatus('error');
      });
    } catch (error) {
      console.error("Payment failed:", error);
      setPaymentStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <div className="feature-icon">💳</div>
      <h2>Payment Widget</h2>
      <div className="payment-details">
        <div className="amount">{amount} SOL</div>
        <p className="merchant">Merchant: {merchant}</p>
      </div>
      <button onClick={handlePayment} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Pay Now'}
      </button>
      {paymentStatus === 'success' && <p className="success">Payment completed successfully!</p>}
      {paymentStatus === 'error' && <p className="error">Payment failed. Please try again.</p>}
    </div>
  );
}
