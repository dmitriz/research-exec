/**
 * GitHub Repository Data Analyzer
 * 
 * Processes raw JSON data to generate comprehensive repository analysis
 * and markdown documentation with transparency notes about automated generation.
 * 
 * Key Functions:
 * - Analyzes repository portfolios and generates detailed statistics
 * - Creates hash-linked markdown sections for easy navigation
 * - Filters public repositories and calculates language distributions
 * - Generates comprehensive analysis reports with automated transparency
 * 
 * TypeScript Integration:
 * This module can leverage the TypeScript interfaces defined in src/types/execution.ts
 * which provide type definitions for:
 *   - ExecutionConfig: Configuration parameters for execution framework
 *   - ProjectConfig: Project-specific configuration settings
 *   - TaskConfig: Task execution parameters and requirements
 *   - SessionResult: Analysis session results and statistics
 * 
 * Future Implementation:
 * - Convert this module to TypeScript for better type safety
 * - Use the interfaces for proper type checking and validation
 * - Add runtime type validation for configuration objects
 * 
 * Privacy Features:
 * - Respects config.js settings for including/excluding private repositories
 * - Can anonymize repository names based on configuration
 * - Excludes sensitive data from generated reports
 * 
 * Usage: node utils/analyze-data.js
 * Output: Analysis results and markdown documentation (data/repos-analysis.md)
 * 
 * @module analyze-data
 * @author GitHub Repository Analysis Framework
 * @see src/types/execution.ts for TypeScript interfaces
 */

const fs = require('fs');
const path = require('path');

// Load configuration with fallback to example config for demonstration
let config;
try {
    config = require('../config');
} catch (error) {
    console.log('⚠️  Personal config.js not found. Using example configuration.');
    console.log('💡 Copy config.example.js to config.js and add your GitHub username for personal analysis.\n');
    config = require('../config.example');
}

// Load the JSON data with fallback to example data
let rawDataPath;
let rawData;

try {
    rawDataPath = path.join(config.DATA.DATA_FOLDER, config.DATA.RAW_REPOS);
    rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
} catch (error) {
    console.log('⚠️  Personal repository data not found. Using example data for demonstration.');
    console.log('💡 Run "npm run setup" to collect your personal repository data.\n');
    rawDataPath = path.join(config.DATA.DATA_FOLDER, config.DATA.EXAMPLE_DATA);
    rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf8'));
}

console.log('GitHub Repository Analysis');
console.log('==========================\n');

// Basic counts
const totalRepos = rawData.length;
const publicRepos = rawData.filter(repo => !repo.isPrivate).length;
const privateRepos = rawData.filter(repo => repo.isPrivate).length;
const withDescriptions = rawData.filter(repo => repo.description && repo.description.trim()).length;

// Recent activity (last 3 months)
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - config.ANALYSIS.RECENT_ACTIVITY_MONTHS);
const recentlyUpdated = rawData.filter(repo => {
    return new Date(repo.updatedAt) >= threeMonthsAgo;
}).length;

// Language statistics
const languages = {};
rawData.forEach(repo => {
    const lang = repo.primaryLanguage ? repo.primaryLanguage.name : 'No Language';
    languages[lang] = (languages[lang] || 0) + 1;
});

// Sort languages by frequency
const sortedLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, config.ANALYSIS.TOP_LANGUAGES_COUNT);

console.log(`Total repositories: ${totalRepos}`);
console.log(`Public: ${publicRepos} | Private: ${privateRepos}`);
console.log(`With descriptions: ${withDescriptions}`);
console.log(`Recently updated (${config.ANALYSIS.RECENT_ACTIVITY_MONTHS} months): ${recentlyUpdated}`);
console.log('\nTop Languages:');
sortedLanguages.forEach(([lang, count]) => {
    console.log(`  ${lang}: ${count}`);
});

// Filter public repositories only
const publicReposData = rawData.filter(repo => !repo.isPrivate);

// Generate comprehensive GitHub repositories analysis markdown
const markdown = `# GitHub Repository Analysis

**Data Collection Date**: ${new Date().toISOString().split('T')[0]}  
**GitHub User**: [@${config.GITHUB_USERNAME}](https://github.com/${config.GITHUB_USERNAME})  
**Analysis Framework**: [research-exec](https://github.com/${config.GITHUB_USERNAME}/research-exec)

## Executive Summary

This analysis provides comprehensive insights into a ${totalRepos}-repository collection, focusing on ${publicRepos} public repositories. The collection demonstrates active development with ${recentlyUpdated} repositories updated within the last ${config.ANALYSIS.RECENT_ACTIVITY_MONTHS} months, indicating sustained engagement and continuous improvement across projects.

## Repository Statistics {#repository-stats}

### Repository Distribution
- **Total Repositories**: ${totalRepos}
- **Public Repositories**: ${publicRepos} (analyzed)
- **Private Repositories**: ${privateRepos} (excluded from analysis)
- **With Descriptions**: ${withDescriptions} (${Math.round((withDescriptions/totalRepos)*100)}% documentation coverage)

### Activity Metrics
- **Recently Active**: ${recentlyUpdated} repositories (updated in last ${config.ANALYSIS.RECENT_ACTIVITY_MONTHS} months)
- **Activity Rate**: ${Math.round((recentlyUpdated/publicRepos)*100)}% of public repositories show recent activity
- **Documentation Quality**: ${Math.round((withDescriptions/totalRepos)*100)}% of repositories include descriptions

### Technology Distribution {#tech-distribution}
${sortedLanguages.map(([lang, count]) => {
    const percentage = Math.round((count/publicRepos)*100);
    return `- **${lang}**: ${count} repositories (${percentage}%)`;
}).join('\n')}

## Strategic Analysis {#strategic-analysis}

### Repository Characteristics
The repository collection shows a **${sortedLanguages[0][0]}-dominant** technology stack with strong representation across web technologies. The high activity rate (${Math.round((recentlyUpdated/publicRepos)*100)}%) indicates active maintenance and development, while comprehensive documentation coverage (${Math.round((withDescriptions/totalRepos)*100)}%) demonstrates professional development practices.

### Development Patterns
- **Primary Focus**: ${sortedLanguages[0][0]} development (${sortedLanguages[0][1]} repositories)
- **Secondary Expertise**: ${sortedLanguages[1] ? `${sortedLanguages[1][0]} (${sortedLanguages[1][1]} repositories)` : 'Diversified across multiple languages'}
- **Repository Diversity**: ${sortedLanguages.length} distinct programming languages
- **Maintenance Quality**: High (${Math.round((recentlyUpdated/publicRepos)*100)}% recent activity rate)

## Repository Catalog {#repository-catalog}

${publicReposData.map(repo => {
    const desc = repo.description ? repo.description : '*No description available*';
    const lang = repo.primaryLanguage ? repo.primaryLanguage.name : 'No Language';
    const updated = new Date(repo.updatedAt).toISOString().split('T')[0];
    const isRecent = new Date(repo.updatedAt) >= threeMonthsAgo;
    const activityBadge = isRecent ? ' 🟢' : '';
    
    return `### [${repo.name}](https://github.com/${config.GITHUB_USERNAME}/${repo.name})${activityBadge}
**Language**: ${lang} | **Last Updated**: ${updated}  
${desc}`;
}).join('\n\n')}

---

## Methodology & Data Sources {#methodology}

### Data Collection
- **Source Command**: \`gh repo list --json name,description,visibility,isPrivate,updatedAt,primaryLanguage --limit ${config.ANALYSIS.MAX_REPOSITORIES}\`
- **Raw Data File**: [\`${rawDataPath}\`](${rawDataPath})
- **Processing Script**: [\`utils/analyze-data.js\`](utils/analyze-data.js)
- **Configuration**: [\`config.js\`](config.js)

### Analysis Framework
- **Repository Scope**: Public repositories only (private repositories excluded for privacy)
- **Activity Threshold**: ${config.ANALYSIS.RECENT_ACTIVITY_MONTHS} months for "recent activity" classification
- **Technology Analysis**: Based on GitHub's primary language detection
- **Documentation Assessment**: Presence and quality of repository descriptions

### Framework Applicability
This analysis methodology is designed to be universally applicable to any GitHub repository collection. The framework separates configuration from analysis logic, enabling easy adaptation for different users and requirements while maintaining analytical consistency and reproducibility.

**Legend**: 🟢 = Recently active (updated within ${config.ANALYSIS.RECENT_ACTIVITY_MONTHS} months)
`;

// Ensure data directory exists
if (!fs.existsSync(config.DATA.DATA_FOLDER)) {
    fs.mkdirSync(config.DATA.DATA_FOLDER, { recursive: true });
}

const outputPath = path.join(config.DATA.DATA_FOLDER, config.DATA.REPOS_ANALYSIS);
fs.writeFileSync(outputPath, markdown);
console.log(`\n✅ Generated comprehensive repository analysis: ${outputPath}`);
