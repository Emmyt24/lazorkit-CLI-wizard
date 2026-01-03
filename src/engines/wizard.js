const inquirer = require("inquirer").default;

async function runWizard(options = {}) {
  const prompts = [];
  if (!options.appName) {
    prompts.push({
      type: "input",
      name: "appName",
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
  if (!options.framework) {
    prompts.push({
      type: "list",
      name: "framework",
      message: "Choose a framework:",
      choices: [
        { name: "Next.js", value: "nextjs" },
        { name: "Vite", value: "vite" },
        { name: "React Native", value: "react-native" },
      ],
    });
  }
  if (!options.features) {
    prompts.push({
      type: "checkbox",
      name: "features",
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
  const answers = await inquirer.prompt(prompts);
  return {
    appName: options.appName || answers.appName,
    framework: options.framework || answers.framework,
    features: options.features || answers.features,
  };
}

module.exports = { runWizard };
