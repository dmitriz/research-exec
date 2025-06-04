# Setup Guide

This repository provides a comprehensive framework for analyzing GitHub repository collections. Follow these steps to set it up for your own repositories.

## Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd research-exec
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your GitHub username**
   Edit `config.js` and update the `GITHUB_USERNAME` field:
   ```javascript
   module.exports = {
       GITHUB_USERNAME: 'YOUR_GITHUB_USERNAME', // Replace with your username
       // ... rest of configuration
   };
   ```

4. **Collect and analyze your repository data**
   ```bash
   npm run analyze
   ```

## Configuration Options

The `config.js` file contains several customizable constants:

### GitHub Settings
- `GITHUB_USERNAME`: Your GitHub username (required)

### Analysis Settings
- `RECENT_ACTIVITY_MONTHS`: How many months back to consider for "recent activity" (default: 3)
- `MAX_REPOSITORIES`: Maximum number of repositories to analyze (default: 200)
- `TOP_LANGUAGES_COUNT`: Number of top languages to display in statistics (default: 8)

### Data Settings
- `DATA_FOLDER`: Base directory for all data files (default: 'data')
- `RAW_REPOS`: Filename for raw GitHub CLI data (default: 'raw-repos.json')
- `REPOS_ANALYSIS`: Filename for generated analysis file (default: 'repos-analysis.md')

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [GitHub CLI](https://cli.github.com/) (`gh`) installed and authenticated
- Access to your GitHub repositories

## Usage

After setup, you can:

1. **Update data**: Re-run the analysis to get fresh data:
   ```bash
   npm run analyze
   ```
2. **Regenerate analysis**: Run `npm run analyze` to update your repository analysis
3. **Customize analysis**: Modify the configuration constants in `config.js` to suit your needs

## Generated Files

The framework generates the following files in the `data/` directory:

- **`data/raw-repos.json`**: Raw repository data from GitHub CLI (excluded from git)
- **`data/repos-analysis.md`**: Comprehensive repository analysis with statistics, strategic insights, and repository catalog

## Framework Benefits

This framework provides:

- **Automated repository analysis** with comprehensive statistics
- **Technology distribution tracking** across your repositories
- **Activity metrics** to identify active projects
- **Reproducible methodology** for consistent analysis
- **Universal applicability** - works with any GitHub account

## Support

For questions or issues, please refer to the documentation in the `methodology/` directory or create an issue in this repository.
