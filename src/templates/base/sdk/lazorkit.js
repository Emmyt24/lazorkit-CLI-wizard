// Lazorkit SDK Integration
// import { Lazorkit } from "lazor-kit";

export const initLazorkit = (config = {}) => {
  const defaultConfig = {
    ...config,
  };

  // Lazorkit.init(defaultConfig);
  console.log("Lazorkit initialized with config:", defaultConfig);
};

// Usage: Call initLazorkit() in your app's entry point


