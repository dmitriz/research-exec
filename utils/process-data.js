#!/usr/bin/env node

/**
 * GitHub Repository Data Processor (PUBLIC REPOS ONLY)
 * 
 * This utility processes raw GitHub CLI JSON data to generate focused statistics
 * specifically for PUBLIC repositories only. This is distinct from analyze-data.js
 * which processes ALL repositories (public + private).
 * 
 * Key Differences from analyze-data.js:
 * - SCOPE: Public repositories ONLY (excludes private repos)
 * - PURPOSE: Statistical computation and basic reporting
 * - OUTPUT: Console output with hash-linked markdown sections
 * - DATA SOURCE: Legacy 'gh-repo-data.json' file format
 * 
 * Features:
 * - Filters out private repositories for transparency
 * - Generates basic statistics (counts, languages, activity)
 * - Creates hash-linked markdown sections for navigation
 * - Reports filtering actions (total → public count)
 * 
 * Usage: npm run data:process
 * Output: Console-based statistical analysis
 * 
 * @author GitHub Repository Analysis Pipeline
 * @version 1.0.0
 * @since Project initialization
 */

const fs = require('fs');
const path = require('path');

// Load raw GitHub data from current data format with privacy fallback
let dataPath;
let rawData;

try {
    dataPath = path.join(__dirname, '..', 'data', 'raw-repos.json');
    rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (error) {
    console.log('⚠️  Personal repository data not found. Using example data.');
    console.log('💡 Run "npm run setup" to collect your personal repository data.\n');
    dataPath = path.join(__dirname, '..', 'data', 'example-repos.json');
    rawData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
}

console.log('📊 GitHub Repository Data Analysis (PUBLIC REPOS ONLY)');
console.log('=====================================================\n');

// Filter to PUBLIC repositories only
const publicRepos = rawData.filter(repo => !repo.isPrivate);

console.log(`🔍 Data Filter: ${rawData.length} total repos → ${publicRepos.length} public repos`);
console.log(`❌ Excluded: ${rawData.length - publicRepos.length} private repositories\n`);

// Basic statistics (PUBLIC ONLY)
const stats = {
    total: publicRepos.length,
    withDescription: publicRepos.filter(repo => repo.description && repo.description.trim()).length,
    languages: {},
    recent: publicRepos.filter(repo => {
        const updated = new Date(repo.updatedAt);
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        return updated >= threeMonthsAgo;
    }).length
};

// Language statistics (PUBLIC ONLY)
publicRepos.forEach(repo => {
    if (repo.primaryLanguage) {
        const lang = repo.primaryLanguage.name;
        stats.languages[lang] = (stats.languages[lang] || 0) + 1;
    } else {
        stats.languages['None'] = (stats.languages['None'] || 0) + 1;
    }
});

// Sort languages by frequency
const topLanguages = Object.entries(stats.languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

// Generate markdown sections with hash anchors
function generateMarkdown() {
    return `# Portfolio Statistics {#portfolio-stats}

> **Data Scope**: Analysis of ${stats.total} PUBLIC repositories only
> **Private repositories excluded**: ${rawData.length - publicRepos.length} private repos not included in analysis

## Repository Overview {#repo-overview}
- **Total Public Repositories**: ${stats.total}
- **Repositories with Descriptions**: ${stats.withDescription}
- **Recently Updated (3 months)**: ${stats.recent}

## Primary Languages {#languages}
${topLanguages.map(([lang, count]) => `- **${lang}**: ${count} repositories`).join('\n')}

## Data Source Verification {#data-source}
- **Collection Method**: \`gh repo list --json name,description,visibility,isPrivate,updatedAt,primaryLanguage --limit 200\`
- **Collection Date**: ${new Date().toISOString().split('T')[0]}
- **Raw Data Location**: \`data/gh-repo-data.json\`
- **Processing Script**: \`utils/process-data.js\`
- **Filter Applied**: PUBLIC repositories only (isPrivate: false)
- **Data Transparency**: ${rawData.length} total repos collected, ${publicRepos.length} public repos analyzed

## Verification Commands {#verification}
\`\`\`bash
# Verify public repo count
cat data/gh-repo-data.json | jq '[.[] | select(.isPrivate == false)] | length'

# Verify language distribution  
cat data/gh-repo-data.json | jq '[.[] | select(.isPrivate == false) | .primaryLanguage.name] | group_by(.) | map({language: .[0], count: length}) | sort_by(.count) | reverse'
\`\`\`
`;
}

// Output statistics
console.log('📊 Public Repository Statistics:');
console.log(`Total public repositories: ${stats.total}`);
console.log(`With descriptions: ${stats.withDescription}`);
console.log(`Recent (3 months): ${stats.recent}`);
console.log('\n🔤 Top Languages (Public Repos):');
topLanguages.forEach(([lang, count]) => {
    console.log(`  ${lang}: ${count}`);
});

// Write markdown output
const outputDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const markdownOutput = generateMarkdown();
fs.writeFileSync(path.join(outputDir, 'portfolio-stats.md'), markdownOutput);
console.log('\n✅ Generated data/portfolio-stats.md with hash-linked sections');
console.log('✅ PUBLIC REPOSITORIES ONLY - Private repos excluded from analysis');

// Export for other scripts
module.exports = { stats, publicRepos, generateMarkdown };
