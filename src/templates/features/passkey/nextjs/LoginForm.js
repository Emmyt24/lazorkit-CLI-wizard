"use client";

// import { Lazorkit } from "lazor-kit";

export default function LoginForm() {
  const handlePasskeyLogin = async () => {
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
    }
  };

  return (
    <div>
      <h2>Passkey Login with Smart Wallet</h2>
      <button onClick={handlePasskeyLogin}>Login with Passkey</button>
      <p>
        This demonstrates Lazorkit's passkey-based authentication and smart
        wallet creation.
      </p>
    </div>
  );
}
