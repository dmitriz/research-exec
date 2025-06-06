// Script to check all markdown files for broken links with clean output
const { execSync } = require('child_process');
const { readdirSync, statSync, writeFileSync } = require('fs');
const { join } = require('path');

// Recursively get all .md files in a directory
const getAllMdFiles = dir => 
  readdirSync(dir).reduce((files, file) => {
    const name = join(dir, file);
    if (statSync(name).isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      return [...files, ...getAllMdFiles(name)];
    } else {
      return file.endsWith('.md') ? [...files, name] : files;
    }
  }, []);

// Check all markdown files
const mdFiles = getAllMdFiles('.');
let totalErrors = 0;
const brokenLinks = [];

console.log(`🔍 Checking ${mdFiles.length} markdown files for broken links...\n`);

mdFiles.forEach(file => {
  try {
    // Run markdown-link-check quietly
    const result = execSync(`npx markdown-link-check --quiet "${file}"`, { 
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    console.log(`✅ ${file}`);
  } catch (error) {
    // markdown-link-check returns non-zero exit code for broken links
    if (error.stdout) {
      const lines = error.stdout.split('\n').filter(line => line.trim());
      const errors = lines.filter(line => line.includes('✖') || line.includes('ERROR'));
      
      if (errors.length > 0) {
        console.log(`❌ ${file}: ${errors.length} broken links`);
        totalErrors += errors.length;
        
        errors.forEach(error => {
          const cleaned = error.replace(/^\s*✖\s*/, '').replace(/^\s*ERROR:\s*/, '');
          console.log(`   • ${cleaned}`);
          brokenLinks.push({ file, link: cleaned });
        });
        console.log('');
      } else {
        console.log(`✅ ${file}`);
      }
    } else {
      console.log(`⚠️  ${file}: Check failed`);
    }
  }
});

// Generate summary
console.log('\n' + '═'.repeat(60));
if (totalErrors > 0) {
  console.log(`❌ Link check complete: Found ${totalErrors} broken links in ${mdFiles.length} files`);
  
  // Save detailed report
  const report = {
    timestamp: new Date().toISOString(),
    totalFiles: mdFiles.length,
    totalBrokenLinks: totalErrors,
    brokenLinks
  };
  
  writeFileSync('broken-links-report.json', JSON.stringify(report, null, 2));
  console.log(`📄 Detailed report saved to: broken-links-report.json`);
  process.exit(1);
} else {
  console.log(`✅ All links valid! Checked ${mdFiles.length} files successfully`);
  process.exit(0);
}
