/**
 * Code Helpers for dynamic code generation
 * Utility functions for generating dynamic code snippets based on user selections
 */

/**
 * Generates import statements for different types
 * @param {string} type - 'default', 'named', or 'namespace'
 * @param {string} module - Module name or path
 * @param {string} alias - Optional alias for the import
 * @returns {string} Generated import statement
 */
export function generateImportStatement(type, module, alias = null) {
  if (type === "default") {
    return `import ${alias || module.split("/").pop()} from '${module}';`;
  } else if (type === "named") {
    return `import { ${
      alias ? `${module} as ${alias}` : module
    } } from '${module}';`;
  } else if (type === "namespace") {
    return `import * as ${alias || module.split("/").pop()} from '${module}';`;
  }
  return "";
}

/**
 * Generates function signatures with parameters and return types
 * @param {string} name - Function name
 * @param {Array} params - Array of parameter objects {name, type}
 * @param {string} returnType - Optional return type
 * @param {boolean} async - Whether the function is async
 * @returns {string} Generated function signature
 */
export function generateFunctionSignature(
  name,
  params = [],
  returnType = null,
  async = false
) {
  const paramStr = params
    .map((p) => `${p.name}${p.type ? `: ${p.type}` : ""}`)
    .join(", ");
  const asyncStr = async ? "async " : "";
  const returnStr = returnType ? `: ${returnType}` : "";
  return `${asyncStr}function ${name}(${paramStr})${returnStr}`;
}

/**
 * Generates conditional code blocks (if-else)
 * @param {string} condition - The condition for the if statement
 * @param {string} trueBlock - Code to execute if condition is true
 * @param {string} falseBlock - Optional code for else block
 * @returns {string} Generated conditional block
 */
export function generateConditionalBlock(
  condition,
  trueBlock,
  falseBlock = null
) {
  let code = `if (${condition}) {\n  ${trueBlock}\n}`;
  if (falseBlock) {
    code += ` else {\n  ${falseBlock}\n}`;
  }
  return code;
}

/**
 * Generates component templates for different frameworks
 * @param {string} framework - 'react', 'react-native', etc.
 * @param {string} name - Component name
 * @param {Array} props - Array of prop names
 * @returns {string} Generated component code
 */
export function generateComponentTemplate(framework, name, props = []) {
  const propStr = props.join(", ");

  if (framework === "react") {
    return `import React from 'react';

const ${name} = ({ ${propStr} }) => {
  return (
    <div>
      <h1>${name}</h1>
    </div>
  );
};

export default ${name};`;
  } else if (framework === "react-native") {
    return `import React from 'react';
import { View, Text } from 'react-native';

const ${name} = ({ ${propStr} }) => {
  return (
    <View>
      <Text>${name}</Text>
    </View>
  );
};

export default ${name};`;
  }

  return "";
}

/**
 * Generates API route handlers for different frameworks
 * @param {string} framework - 'nextjs', etc.
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} path - Route path
 * @param {string} handler - Handler code
 * @returns {string} Generated API route code
 */
export function generateApiRoute(framework, method, path, handler) {
  if (framework === "nextjs") {
    return `export default async function handler(req, res) {
  if (req.method === '${method.toUpperCase()}') {
    ${handler}
  } else {
    res.setHeader('Allow', ['${method.toUpperCase()}']);
    res.status(405).end(\`Method \${req.method} Not Allowed\`);
  }
}`;
  }

  return "";
}

/**
 * Generates configuration files
 * @param {string} type - 'env', 'json', etc.
 * @param {Object} options - Configuration options
 * @returns {string} Generated config content
 */
export function generateConfigFile(type, options) {
  if (type === "env") {
    return Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");
  } else if (type === "json") {
    return JSON.stringify(options, null, 2);
  }

  return "";
}
