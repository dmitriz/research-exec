// Configuration file for GitHub Repository Analysis
// Update this file with your GitHub username and other settings

module.exports = {
    // GitHub username for repository analysis
    GITHUB_USERNAME: 'dmitriz',
    
    // Analysis settings
    ANALYSIS: {
        // Number of months back to consider for "recent activity"
        RECENT_ACTIVITY_MONTHS: 3,
        
        // Maximum number of repositories to analyze
        MAX_REPOSITORIES: 200,
        
        // Top N languages to display in statistics
        TOP_LANGUAGES_COUNT: 8
    },
    
    // Data and output settings
    DATA: {
        // Base data directory
        DATA_FOLDER: 'data',
        
        // Raw data files (direct from GitHub CLI)
        RAW_REPOS: 'raw-repos.json',
        
        // Generated analysis files
        REPOS_ANALYSIS: 'repos-analysis.md'
    }
};
