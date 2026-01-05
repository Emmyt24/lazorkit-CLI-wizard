#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import { runWizard } from "../src/engines/wizard.js";
import { generateApp } from "../src/engines/generator.js";
import { setupApp } from "../src/engines/setup.js";

const program = new Command();

program
  .name("create-lazorkit-app")
  .description("CLI tool for scaffolding Lazorkit applications")
  .version("1.0.0")
  .argument("[app-name]", "Name of the application (optional)")
  .option(
    "--framework <framework>",
    "Framework to use (nextjs, vite, react-native)"
  )
  .option(
    "--features <features>",
    "Features to include (comma-separated: auth,database,api)"
  )
  .action(async (appName, options) => {
    try {
      console.log(chalk.blue("Welcome to create-lazorkit-app!"));

      // Prepare options for wizard
      const wizardOptions = {};
      if (appName) {
        wizardOptions.appName = appName;
        console.log(chalk.green(`Using provided app name: ${appName}`));
      }
      if (options.framework) {
        wizardOptions.framework = options.framework;
        console.log(
          chalk.green(`Using provided framework: ${options.framework}`)
        );
      }
      if (options.features) {
        wizardOptions.features = options.features.split(",");
        console.log(
          chalk.green(`Using provided features: ${options.features}`)
        );
      }

      // Run the wizard to collect configuration
      console.log(chalk.yellow("Starting the configuration wizard..."));
      const config = await runWizard(wizardOptions);

      const targetPath = path.resolve(process.cwd(), config.appName);

      // Check if directory already exists
      if (await fs.pathExists(targetPath)) {
        console.error(
          chalk.red(`Error: Directory '${config.appName}' already exists.`)
        );
        process.exit(1);
      }

      console.log(chalk.yellow(`Generating app in ${targetPath}...`));
      await generateApp(config, targetPath);

      console.log(chalk.yellow("Setting up the app..."));
      await setupApp(config, targetPath);

      console.log(chalk.green("Success! Your Lazorkit app has been created."));
      console.log(chalk.cyan(`Next steps:`));
      console.log(`  cd ${config.appName}`);
      console.log(
        `  npm start  # or yarn start, depending on your package manager`
      );
      console.log(chalk.magenta("Happy coding with Lazorkit!"));
    } catch (error) {
      console.error(chalk.red("An error occurred:"), error.message);
      process.exit(1);
    }
  });

program.parse();
