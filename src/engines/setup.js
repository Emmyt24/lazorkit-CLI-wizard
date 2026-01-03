const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

async function setupApp(config, targetPath) {
  console.log("Starting setup process...");

  // Detect package manager
  const packageManager = detectPackageManager(targetPath);
  console.log(`Detected package manager: ${packageManager}`);

  // Install dependencies
  try {
    console.log("Installing dependencies...");
    execSync(`${packageManager} install`, {
      cwd: targetPath,
      stdio: "inherit",
    });
    console.log("Dependencies installed successfully.");
  } catch (error) {
    console.error("Failed to install dependencies:", error.message);
    throw error;
  }

  // Run framework-specific setup
  await runFrameworkSetup(config.framework, targetPath);

  // Create .env file if not exists
  const envPath = path.join(targetPath, ".env");
  if (!(await fs.pathExists(envPath))) {
    console.log("Creating .env file...");
    const envContent = `# Lazorkit Configuration\nLAZORKIT_API_KEY=your_api_key_here\n`;
    await fs.writeFile(envPath, envContent);
    console.log(".env file created.");
  } else {
    console.log(".env file already exists.");
  }

  // Initialize git repository
  if (!(await fs.pathExists(path.join(targetPath, ".git")))) {
    try {
      console.log("Initializing git repository...");
      execSync("git init", { cwd: targetPath, stdio: "inherit" });
      console.log("Git repository initialized.");
    } catch (error) {
      console.warn("Failed to initialize git repository:", error.message);
    }
  } else {
    console.log("Git repository already exists.");
  }

  console.log("Setup process completed successfully.");
}

function detectPackageManager(targetPath) {
  if (fs.existsSync(path.join(targetPath, "yarn.lock"))) {
    return "yarn";
  } else if (fs.existsSync(path.join(targetPath, "pnpm-lock.yaml"))) {
    return "pnpm";
  } else {
    return "npm";
  }
}

async function runFrameworkSetup(framework, targetPath) {
  switch (framework) {
    case "nextjs":
      try {
        console.log("Running Next.js setup...");
        execSync("npx next telemetry disable", {
          cwd: targetPath,
          stdio: "inherit",
        });
        console.log("Next.js telemetry disabled.");
      } catch (error) {
        console.warn("Failed to disable Next.js telemetry:", error.message);
      }
      break;
    case "vite":
      // No specific setup for Vite
      console.log("No additional setup required for Vite.");
      break;
    case "react-native":
      // Assuming React Native setup might involve linking or something, but placeholder
      console.log(
        "React Native setup: Ensure dependencies are linked if needed."
      );
      break;
    default:
      console.log("No framework-specific setup.");
  }
}

module.exports = { setupApp };
