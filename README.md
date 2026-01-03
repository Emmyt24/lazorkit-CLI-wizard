# Lazorkit CLI wizard

A powerful CLI tool for scaffolding Lazorkit-integrated applications. Generate high-quality example repositories demonstrating real-world usage of Lazorkit's key features like passkey authentication and gasless smart wallet transactions. Perfect for developers getting started with Lazorkit SDK.

## Installation

Install globally using npm:

```bash
npm install -g create-lazorkit-app
```

Or use directly with npx (recommended):

```bash
npx create-lazorkit-app
```

## Usage

Run the CLI and follow the interactive prompts:

```bash
npx create-lazorkit-app
```

The tool will guide you through:

- Choosing your project name
- Selecting a framework (Next.js, Vite, React Native)
- Selecting Lazorkit integration features to include

### Example

```bash
npx create-lazorkit-app
# Follow prompts:
# ? Project name: my-lazorkit-app
# ? Choose framework: Next.js
# ? Select features: passkey, gasless, pay-widget
```

This creates a new directory `my-lazorkit-app` with a fully configured Next.js application including Lazorkit SDK integration examples for passkey authentication, gasless transactions, and payment widgets.

## Supported Frameworks

### Web Frameworks

- **Next.js**: Full-stack React framework with App Router and Pages Router support
- **Vite + React**: Modern React applications with fast development server
- **Vite + Vanilla JS**: Lightweight vanilla JavaScript applications

### Mobile Frameworks

- **React Native**: Cross-platform mobile applications for iOS and Android

## Lazorkit Integration Features

Choose from these real-world Lazorkit SDK integration examples:

- **Passkey Login Flow**: Smart wallet authentication using passkeys
- **Gasless USDC Transfer**: Fee-less transactions on Solana Mainnet
- **Pay with Solana Widget**: Integrated payment processing
- **Biometric Login**: Mobile authentication with device biometrics
- **Token Swap Interface**: Decentralized exchange functionality
- **Subscription Service**: Automated USDC billing with smart wallets

### Core Features

- **Interactive CLI**: User-friendly prompts for project configuration
- **Template-based Generation**: Pre-built templates with working examples
- **Lazorkit SDK Integration**: Ready-to-use integration code (commented until SDK is published)
- **Multi-framework Support**: Next.js, Vite, and React Native
- **Dependency Management**: Automatic installation of required packages
- **Example Components**: Functional UI components demonstrating each feature

## Project Structure

After generation, your project will include:

```
my-lazorkit-app/
├── app/ (Next.js) or src/ (Vite) or root files (React Native)
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── sdk/
│   └── lazorkit.js       # Lazorkit SDK integration setup
└── components/           # Example components for selected features
```

## Getting Started

After creating your project:

1. Navigate to your project directory:

   ```bash
   cd my-lazorkit-app
   ```

2. Install dependencies (if not done automatically):

   ```bash
   npm install
   ```

3. Start development:

   ```bash
   npm run dev  # or yarn dev, or npx react-native run-android/ios
   ```

4. Explore the generated components in the `components/` directory to see Lazorkit integration examples

## SDK Integration

The generated projects include commented Lazorkit SDK code ready for when the package is published. Each feature component shows the exact integration pattern:

- Import statements are prepared
- API calls are structured
- Error handling is implemented
- Real-world usage examples are provided

Simply uncomment the code and replace with actual SDK calls when Lazorkit becomes available.

## Requirements

- Node.js 16+
- npm or yarn

## About Lazorkit

This CLI tool was created for the Lazorkit bounty to help developers get started with Lazorkit SDK integration. Lazorkit enables blockchain UX improvements including passkey authentication and gasless transactions.

Learn more at [lazorkit.xyz](https://lazorkit.xyz)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
