const fs = require('fs');
const path = require('path');

const projectDir = process.argv[2] || '.'; // Usage: node extract-env-vars.js ./src
const outputFile = path.join(path.resolve(projectDir), '.env.example');

const envVarRegex = /process\.env\.([a-zA-Z0-9_]+)/g;
const foundVars = new Set();

function scanDir(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory() && !['node_modules', '.git'].includes(item)) {
      scanDir(fullPath);
    } else if (stats.isFile() && /\.(js|ts|jsx|tsx|json)$/.test(item)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      let match;
      while ((match = envVarRegex.exec(content)) !== null) {
        foundVars.add(match[1]);
      }
    }
  }
}

function writeEnvFile(vars) {
  const sorted = [...vars].sort();
  const lines = sorted.map((v) => `${v}=`);
  fs.writeFileSync( outputFile, lines.join('\n') + '\n', 'utf8');
  console.log(`✅ .env.example file created with ${sorted.length} variables at directory ${outputFile}`);
}

scanDir(path.resolve(projectDir));
writeEnvFile(foundVars);

