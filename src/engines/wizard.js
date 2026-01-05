import { input, select, checkbox } from "@inquirer/prompts";

async function runWizard(options = {}) {
  let appName = options.appName;
  if (!appName) {
    appName = await input({
      message: "What is the name of your app?",
      validate: (input) => {
        if (!input || input.trim().length === 0) {
          return "App name cannot be empty.";
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
          return "App name can only contain letters, numbers, hyphens, and underscores.";
        }
        return true;
      },
    });
  }

  let framework = options.framework;
  if (!framework) {
    framework = await select({
      message: "Choose a framework:",
      choices: [
        { name: "Next.js", value: "nextjs" },
        { name: "Vite", value: "vite" },
        { name: "React Native", value: "react-native" },
      ],
    });
  }

  let features = options.features;
  if (!features) {
    features = await checkbox({
      message: "Select features:",
      choices: [
        { name: "Passkey login flow with smart wallet", value: "passkey" },
        { name: "Gasless USDC transfer on Solana Mainnet", value: "gasless" },
        { name: "Pay with Solana widget", value: "pay-widget" },
        {
          name: "React Native mobile onboarding with biometric login",
          value: "biometric",
        },
        { name: "Basic token swap interface", value: "token-swap" },
        {
          name: "Subscription service with automated USDC billing",
          value: "subscription",
        },
      ],
    });
  }

  return {
    appName,
    framework,
    features,
  };
}

export { runWizard };
