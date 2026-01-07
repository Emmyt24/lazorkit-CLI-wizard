import { useState } from 'react';
// import { Lazorkit } from 'lazor-kit';

export default function SubscriptionService() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // const wallet = await Lazorkit.getWallet();

      // const subscription = await wallet.createSubscription({
      //   amount: "10",
      //   currency: "USDC",
      //   interval: "monthly",
      //   service: "premium-service",
      //   network: "solana-mainnet",
      // });

      const demoSubId = "sub_" + Math.random().toString(36).substr(2, 9);
      setSubscriptionId(demoSubId);
      setIsSubscribed(true);
      console.log("Subscription created:", demoSubId);

      // subscription.on("billing", (tx) => {
      //   console.log("Automated billing processed:", tx);
      // });
    } catch (error) {
      console.error("Subscription creation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <h2>Subscription Service with Automated USDC Billing</h2>
      {!isSubscribed ? (
        <>
          <p>Subscribe to access premium features</p>
          <p className="price">$10 USDC per month</p>
          <button onClick={handleSubscribe} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Subscribe Now'}
          </button>
        </>
      ) : (
        <div className="subscription-active">
          <p className="success">✓ Subscription Active</p>
          <p>Subscription ID: {subscriptionId}</p>
          <p>Your smart wallet will handle automated monthly billing.</p>
        </div>
      )}
    </div>
  );
}
