import fs from "fs-extra";
import path from "path";
import ejs from "ejs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function generateApp(config, targetPath) {
  // Ensure target directory exists
  await fs.ensureDir(targetPath);

  // Copy base templates
  const basePath = path.join(__dirname, "../templates/base");
  if (await fs.pathExists(basePath)) {
    await fs.copy(basePath, targetPath);
  }

  // Copy framework-specific templates
  let frameworkPath = path.join(__dirname, "../templates", config.framework);
  if (config.framework === "vite") {
    // For vite, default to react variant
    frameworkPath = path.join(__dirname, "../templates/vite/react");
  }
  if (await fs.pathExists(frameworkPath)) {
    await fs.copy(frameworkPath, targetPath);
  }

  // Copy feature-specific templates
  for (const feature of config.features) {
    const featurePath = path.join(
      __dirname,
      "../templates/features",
      feature,
      config.framework
    );
    if (await fs.pathExists(featurePath)) {
      let destPath = targetPath;
      if (config.framework === "nextjs") {
        destPath = path.join(targetPath, "app");
      }
      // Copy contents of feature framework directory to destPath
      const items = await fs.readdir(featurePath);
      for (const item of items) {
        const srcItemPath = path.join(featurePath, item);
        const destItemPath = path.join(destPath, item);
        await fs.copy(srcItemPath, destItemPath);
      }
    }
  }

  // Render all files with ejs
  await renderTemplates(targetPath, config);
}

async function renderTemplates(dir, config) {
  const items = await fs.readdir(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = await fs.stat(fullPath);
    if (stat.isDirectory()) {
      await renderTemplates(fullPath, config);
    } else {
      let content = await fs.readFile(fullPath, "utf8");
      let outputPath = fullPath;
      let shouldRender = content.includes("<%") || content.includes("<%=");
      if (item.endsWith(".ejs")) {
        outputPath = fullPath.replace(".ejs", "");
        shouldRender = true;
      }
      if (shouldRender) {
        try {
          content = ejs.render(content, config);
        } catch (err) {
          console.warn(`Failed to render ${fullPath}: ${err.message}`);
        }
      }
      await fs.writeFile(outputPath, content);
      if (item.endsWith(".ejs")) {
        await fs.remove(fullPath);
      }
    }
  }
}

export { generateApp };
