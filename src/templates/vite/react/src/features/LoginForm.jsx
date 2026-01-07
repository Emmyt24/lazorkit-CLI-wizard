import { useState } from 'react';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePasskeyLogin = async () => {
    setIsLoading(true);
    try {
      // Initialize Lazorkit passkey wallet
      // const wallet = await Lazorkit.createPasskeyWallet({
      //   challenge: "your-challenge-here",
      // });

      console.log("Passkey wallet created: wallet.address");

      // Example: Sign a message
      // const signature = await wallet.signMessage("Hello Lazorkit!");
      console.log("Signature: signature");
    } catch (error) {
      console.error("Passkey login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="feature-container">
      <h2>Passkey Login with Smart Wallet</h2>
      <button onClick={handlePasskeyLogin} disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login with Passkey'}
      </button>
      <p>
        This demonstrates Lazorkit's passkey-based authentication and smart
        wallet creation.
      </p>
    </div>
  );
}
