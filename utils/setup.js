#!/usr/bin/env node

/**
 * GitHub Repository Analysis Setup Script
 * 
 * This setup script performs the initial configuration and data collection
 * for the GitHub repository analysis framework.
 * 
 * Features:
 * - Verifies configuration is properly set up
 * - Collects GitHub repository data
 * - Creates necessary directory structure
 * - Sets up privacy protections
 * 
 * Usage: npm run setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for better console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.blue}====================================${colors.reset}`);
console.log(`${colors.bright}${colors.blue}GitHub Repository Analysis Setup${colors.reset}`);
console.log(`${colors.bright}${colors.blue}====================================${colors.reset}\n`);

// Step 1: Check for config.js
let config;
try {
  config = require('../config');
  console.log(`${colors.green}✓ Configuration found${colors.reset}`);
} catch (error) {
  console.log(`${colors.red}✗ Configuration not found${colors.reset}`);
  console.log(`${colors.yellow}Creating default configuration from example...${colors.reset}`);
  
  try {
    const exampleConfig = fs.readFileSync(path.join(__dirname, '..', 'config.example.js'), 'utf8');
    fs.writeFileSync(path.join(__dirname, '..', 'config.js'), exampleConfig, 'utf8');
    console.log(`${colors.green}✓ Default configuration created${colors.reset}`);
    console.log(`${colors.yellow}⚠️ Please edit config.js with your GitHub username before continuing${colors.reset}`);
    process.exit(1);
  } catch (copyError) {
    console.error(`${colors.red}Failed to create default configuration:${colors.reset}`, copyError.message);
    process.exit(1);
  }
}

// Step 2: Verify GitHub username is configured
if (config.GITHUB_USERNAME === 'your-github-username') {
  console.log(`${colors.red}✗ GitHub username not configured${colors.reset}`);
  console.log(`${colors.yellow}Please edit config.js and set your actual GitHub username${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.green}✓ GitHub username configured: ${colors.bright}${config.GITHUB_USERNAME}${colors.reset}`);

// Step 3: Ensure data directory exists
const dataDir = path.join(__dirname, '..', config.DATA.DATA_FOLDER);
if (!fs.existsSync(dataDir)) {
  console.log(`${colors.yellow}Creating data directory...${colors.reset}`);
  fs.mkdirSync(dataDir, { recursive: true });
}
console.log(`${colors.green}✓ Data directory exists${colors.reset}`);

// Step 4: Check GitHub CLI is installed
let ghInstalled = false;
try {
  execSync('gh --version', { stdio: 'ignore' });
  ghInstalled = true;
  console.log(`${colors.green}✓ GitHub CLI is installed${colors.reset}`);
} catch (error) {
  console.log(`${colors.red}✗ GitHub CLI not found${colors.reset}`);
  console.log(`${colors.yellow}Please install GitHub CLI from: https://cli.github.com/${colors.reset}`);
  console.log(`${colors.yellow}After installing, run: gh auth login${colors.reset}`);
  process.exit(1);
}

// Step 5: Verify GitHub CLI authentication
if (ghInstalled) {
  try {
    execSync('gh auth status', { stdio: 'ignore' });
    console.log(`${colors.green}✓ GitHub CLI is authenticated${colors.reset}`);
  } catch (error) {
    console.log(`${colors.red}✗ GitHub CLI not authenticated${colors.reset}`);
    console.log(`${colors.yellow}Please authenticate with: gh auth login${colors.reset}`);
    process.exit(1);
  }
}

// Step 6: Collect GitHub repository data
console.log(`\n${colors.bright}${colors.blue}Collecting GitHub repository data...${colors.reset}`);
console.log(`${colors.yellow}This may take a moment depending on the number of repositories.${colors.reset}`);

try {
  // Use GitHub CLI to collect repository data with configured username
  const ghQuery = `
    gh api graphql --paginate -F username=${config.GITHUB_USERNAME} -f query='
    query($username: String!, $endCursor: String) {
      user(login: $username) {
        repositories(first: 100, after: $endCursor, ownerAffiliations: OWNER, orderBy: {field: UPDATED_AT, direction: DESC}) {
          nodes {
            name
            description
            isPrivate
            visibility
            updatedAt
            primaryLanguage {
              name
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
    ' --jq '.data.user.repositories.nodes'
  `;
  
  const rawRepos = execSync(ghQuery, { maxBuffer: 1024 * 1024 * 10 }).toString();
  
  // Save raw data
  const dataPath = path.join(dataDir, config.DATA.RAW_REPOS);
  fs.writeFileSync(dataPath, rawRepos, 'utf8');
  
  console.log(`${colors.green}✓ Repository data collected: ${colors.reset}${dataPath}`);
  console.log(`${colors.yellow}Number of repositories collected: ${colors.bright}${JSON.parse(rawRepos).length}${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Failed to collect repository data:${colors.reset}`, error.message);
  console.log(`${colors.yellow}Using example data for testing...${colors.reset}`);
}

// Step 7: Update .gitignore
console.log(`\n${colors.bright}${colors.blue}Setting up privacy protections...${colors.reset}`);
try {
  const gitignorePath = path.join(__dirname, '..', '.gitignore');
  let gitignore = '';
  
  if (fs.existsSync(gitignorePath)) {
    gitignore = fs.readFileSync(gitignorePath, 'utf8');
  }
  
  // Add privacy entries if not already present
  const privacyEntries = [
    'config.js',
    'data/',
    'analysis/',
    'repos-analysis.md',
    'gh-repos.md',
    'portfolio-stats-generated.md'
  ];
  
  let updated = false;
  privacyEntries.forEach(entry => {
    if (!gitignore.includes(entry)) {
      gitignore += `\n# Privacy protection - personal data\n${entry}`;
      updated = true;
    }
  });
  
  if (updated) {
    fs.writeFileSync(gitignorePath, gitignore, 'utf8');
    console.log(`${colors.green}✓ .gitignore updated with privacy protections${colors.reset}`);
  } else {
    console.log(`${colors.green}✓ Privacy protections already configured${colors.reset}`);
  }
} catch (error) {
  console.error(`${colors.red}Failed to update .gitignore:${colors.reset}`, error.message);
}

console.log(`\n${colors.bright}${colors.green}Setup complete!${colors.reset}`);
console.log(`${colors.cyan}Run the following commands to analyze your repositories:${colors.reset}`);
console.log(`${colors.bright}npm run data:analyze${colors.reset} - Generate comprehensive analysis`);
console.log(`${colors.bright}npm run data:process${colors.reset} - Process public repository data only\n`);
