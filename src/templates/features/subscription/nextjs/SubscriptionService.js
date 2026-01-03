import { Lazorkit } from "lazor-kit";

export default function SubscriptionService() {
  const handleSubscribe = async () => {
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

      console.log("Subscription created:", subscription.id);

      // The smart wallet will handle automated billing
      subscription.on("billing", (tx) => {
        console.log("Automated billing processed:", tx);
      });
    } catch (error) {
      console.error("Subscription creation failed:", error);
    }
  };

  return (
    <div>
      <h2>Subscription Service with Automated USDC Billing</h2>
      <button onClick={handleSubscribe}>Subscribe ($10 USDC/month)</button>
      <p>
        This demonstrates Lazorkit's subscription service with automated USDC
        billing powered by smart wallet.
      </p>
    </div>
  );
}
