#!/usr/bin/env node
// Cross-project link validation utility
// Validates links in the documentation index and related files
//
// 📚 Documentation: CROSS_PROJECT_DOCUMENTATION_INDEX.md
// 🔗 Main Project: README.md
// 🎯 Quality Assurance: CONTRIBUTING.md

const fs = require('fs');
const path = require('path');

const cross_project_link_validator = {
  // Define base paths for the three projects
  project_paths: {
    'research-exec': '.',
    'agent-orchestrator': '../agent-orchestrator',
    'mcp-servers-info': '../mcp-servers-info'
  },

  // Check if a file exists relative to a project base
  check_file_exists: (project, file_path) => {
    const base_path = cross_project_link_validator.project_paths[project];
    const full_path = path.resolve(base_path, file_path);
    
    try {
      return fs.existsSync(full_path);
    } catch (error) {
      return false;
    }
  },

  // Validate links in the documentation index
  validate_documentation_index: () => {
    const index_path = 'CROSS_PROJECT_DOCUMENTATION_INDEX.md';
    
    if (!fs.existsSync(index_path)) {
      console.log('❌ Documentation index not found:', index_path);
      return false;
    }

    const content = fs.readFileSync(index_path, 'utf-8');
    const link_pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [...content.matchAll(link_pattern)];
    
    console.log(`🔍 Validating ${links.length} links in documentation index...`);
    
    let valid_count = 0;
    let invalid_count = 0;
    
    links.forEach(([full_match, text, url]) => {
      // Skip external URLs (http/https)
      if (url.startsWith('http')) {
        return;
      }
      
      // Handle cross-project links
      if (url.startsWith('../')) {
        const project_match = url.match(/^\.\.\/([^\/]+)\/(.+)$/);
        if (project_match) {
          const [, project, file_path] = project_match;
          const file_part = file_path.split('#')[0];
          const actual_file_path = file_part || file_path; // Use original if no anchor
          
          if (cross_project_link_validator.check_file_exists(project, actual_file_path)) {
            valid_count++;
          } else {
            console.log(`❌ Invalid cross-project link: ${url}`);
            invalid_count++;
          }
        }
      } else {
        // Local project links - handle anchor links
        const file_part = url.split('#')[0];
        const actual_url = file_part || url; // Use original if no anchor
        
        if (cross_project_link_validator.check_file_exists('research-exec', actual_url)) {
          valid_count++;
        } else {
          console.log(`❌ Invalid local link: ${url}`);
          invalid_count++;
        }
      }
    });
    
    console.log(`✅ Valid links: ${valid_count}`);
    console.log(`❌ Invalid links: ${invalid_count}`);
    
    return invalid_count === 0;
  },

  // Generate a report of all bidirectional links
  generate_link_report: () => {
    console.log('\n📊 Cross-Project Link Analysis Report\n');
    
    const report = {
      research_exec_local: [],
      cross_project_outbound: [],
      cross_project_inbound: []
    };
    
    // Analyze research-exec documentation
    const doc_files = [
      'README.md',
      'CROSS_PROJECT_DOCUMENTATION_INDEX.md',
      'src/types/TYPESCRIPT_TYPES_DOCUMENTATION.md'
    ];
    
    doc_files.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf-8');
        const links = [...content.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)];
        
        links.forEach(([, text, url]) => {
          if (url.startsWith('../')) {
            report.cross_project_outbound.push({ file, text, url });
          } else if (!url.startsWith('http')) {
            report.research_exec_local.push({ file, text, url });
          }
        });
      }
    });
    
    console.log(`📁 Local research-exec links: ${report.research_exec_local.length}`);
    console.log(`🔗 Cross-project outbound links: ${report.cross_project_outbound.length}`);
    
    return report;
  }
};

// Main execution
if (require.main === module) {
  console.log('🔍 Cross-Project Link Validation\n');
  
  const is_valid = cross_project_link_validator.validate_documentation_index();
  const report = cross_project_link_validator.generate_link_report();
  
  if (is_valid) {
    console.log('\n✅ All documentation links are valid!');
    process.exit(0);
  } else {
    console.log('\n❌ Some links need attention');
    process.exit(1);
  }
}

module.exports = cross_project_link_validator;
