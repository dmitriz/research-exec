/**
 * Example Configuration for GitHub Repository Analysis
 * 
 * PRIVACY & SECURITY NOTICE:
 * - This is an example configuration with anonymized data
 * - Copy this file to 'config.js' and update with your actual settings
 * - The 'config.js' file is gitignored to protect your privacy
 * - Never commit your actual GitHub username or personal data
 * 
 * Setup Instructions:
 * 1. Copy: cp config.example.js config.js
 * 2. Edit config.js with your actual GitHub username
 * 3. Run: npm run setup to collect your data
 * 4. The generated files will be local-only (not committed)
 */

module.exports = {
    // GitHub username for repository analysis
    // Replace 'your-github-username' with your actual GitHub username
    GITHUB_USERNAME: 'your-github-username',
    
    // Analysis settings
    ANALYSIS: {
        // Number of months back to consider for "recent activity"
        RECENT_ACTIVITY_MONTHS: 3,
        
        // Maximum number of repositories to analyze
        MAX_REPOSITORIES: 200,
        
        // Top N languages to display in statistics
        TOP_LANGUAGES_COUNT: 8,
        
        // Privacy settings
        PRIVACY: {
            // Whether to include repository descriptions in analysis
            INCLUDE_DESCRIPTIONS: true,
            
            // Whether to generate public portfolio reports
            GENERATE_PUBLIC_REPORTS: false,
            
            // Whether to anonymize repository names in outputs
            ANONYMIZE_REPO_NAMES: false
        }
    },
    
    // Data and output settings
    DATA: {
        // Base data directory (local only, not committed)
        DATA_FOLDER: 'data',
        
        // Raw data files (direct from GitHub CLI)
        RAW_REPOS: 'raw-repos.json',
        
        // Generated analysis files (local only)
        REPOS_ANALYSIS: 'repos-analysis.md',
        
        // Public example data (anonymized, safe for git)
        EXAMPLE_DATA: 'example-repos.json'
    },
    
    // Output settings
    OUTPUT: {
        // Whether to include timestamps in generated files
        INCLUDE_TIMESTAMPS: true,
        
        // Whether to include GitHub links (disable for privacy)
        INCLUDE_GITHUB_LINKS: false,
        
        // Transparency note for automated generation
        TRANSPARENCY_NOTE: 'This analysis was generated automatically by research-exec framework. Data collection and analysis procedures are documented and reproducible.'
    }
};
