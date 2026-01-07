import { useState } from 'react';
// import { Lazorkit } from 'lazor-kit';

export default function SubscriptionService() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const wallet = await Lazorkit.getWallet();

      // Create subscription with automated USDC billing
      const subscription = await wallet.createSubscription({
        amount: "10", // 10 USDC per month
        currency: "USDC",
        interval: "monthly",
        service: "premium-service",
        network: "solana-mainnet",
      });

      setSubscriptionId(subscription.id);
      setIsSubscribed(true);
      console.log("Subscription created:", subscription.id);

      // The smart wallet will handle automated billing
      subscription.on("billing", (tx) => {
        console.log("Automated billing processed:", tx);
      });
    } catch (error) {
      console.error("Subscription creation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <div className="feature-icon">⭐</div>
      <h2>Premium Subscription</h2>
      {!isSubscribed ? (
        <>
          <div className="subscription-pricing">
            <div className="price">$10</div>
            <p className="billing-period">USDC per month</p>
          </div>
          <p className="feature-description">Subscribe to access premium features with automated billing</p>
          <button onClick={handleSubscribe} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Subscribe Now'}
          </button>
        </>
      ) : (
        <div className="subscription-active">
          <p className="success">✓ Subscription Active</p>
          <p>Subscription ID: {subscriptionId}</p>
          <p className="feature-description">Your smart wallet will handle automated monthly billing.</p>
        </div>
      )}
    </div>
  );
}
