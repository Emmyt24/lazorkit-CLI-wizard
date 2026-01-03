# create-lazorkit-app

A powerful CLI tool for scaffolding new applications with integrated Lazorkit SDK support. Quickly bootstrap projects for web and mobile development with pre-configured authentication, database integration, and more.

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
- Selecting a framework
- Adding optional features (authentication, database, etc.)

### Example

```bash
npx create-lazorkit-app
# Follow prompts:
# ? Project name: my-awesome-app
# ? Choose framework: Next.js
# ? Add authentication? Yes
# ? Add database integration? Yes
```

This creates a new directory `my-awesome-app` with a fully configured Next.js application including Lazorkit SDK integration, authentication components, and database setup.

## Supported Frameworks

### Web Frameworks

- **Next.js**: Full-stack React framework with App Router and Pages Router support
- **Vite + React**: Modern React applications with fast development server
- **Vite + Vanilla JS**: Lightweight vanilla JavaScript applications

### Mobile Frameworks

- **React Native**: Cross-platform mobile applications for iOS and Android

## Features

### Core Features

- **Interactive CLI**: User-friendly prompts for project configuration
- **Template-based Generation**: Pre-built templates for rapid development
- **Lazorkit SDK Integration**: Automatic SDK setup with placeholder configurations
- **Dependency Management**: Automatic installation of required packages
- **Environment Setup**: Pre-configured `.env` files with API key placeholders

### Optional Features

- **Authentication**: Pre-built login forms and authentication flows
- **Database Integration**: Database connection setup and basic CRUD operations
- **Component Library**: Reusable UI components for each framework

## Project Structure

After generation, your project will include:

```
my-app/
├── src/                    # Source code
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (configure with your Lazorkit API key)
├── sdk/
│   └── lazorkit.js       # Lazorkit SDK integration
└── components/           # Pre-built components (if selected)
```

## Configuration

After creating your project:

1. Navigate to your project directory:

   ```bash
   cd my-awesome-app
   ```

2. Install dependencies (if not done automatically):

   ```bash
   npm install
   ```

3. Configure your Lazorkit API key in `.env`:

   ```
   LAZORKIT_API_KEY=your_api_key_here
   ```

4. Start development:
   ```bash
   npm run dev
   ```

## Requirements

- Node.js 16+
- npm or yarn

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
