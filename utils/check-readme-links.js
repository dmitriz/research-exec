// Script to check README.md for broken links with clean output
const { execSync } = require('child_process');

console.log('🔍 Checking README.md links...\n');

try {
  // Run markdown-link-check on README.md only
  const result = execSync('npx markdown-link-check README.md', { 
    encoding: 'utf-8'
  });
  
  // Parse the output for the summary line
  const lines = result.split('\n').filter(line => line.trim());
  const summaryLine = lines.find(line => line.includes('links checked'));
  const errors = lines.filter(line => line.includes('✖') || line.includes('[✖]'));
  
  if (errors.length > 0) {
    console.log(`❌ Found ${errors.length} broken links:\n`);
    errors.forEach(error => {
      console.log(`   • ${error.trim()}`);
    });
    console.log('');
    process.exit(1);
  } else {
    console.log('✅ All README.md links are valid!');
    if (summaryLine) {
      console.log(`📊 ${summaryLine.trim()}\n`);
    }
    process.exit(0);
  }
} catch (error) {
  // Check if this is just a non-zero exit code due to broken links
  if (error.stdout) {
    const lines = error.stdout.split('\n').filter(line => line.trim());
    const errors = lines.filter(line => line.includes('✖') || line.includes('[✖]'));
    const summaryLine = lines.find(line => line.includes('links checked'));
    
    if (errors.length > 0) {
      console.log(`❌ Found ${errors.length} broken links:\n`);
      errors.forEach(error => {
        console.log(`   • ${error.trim()}`);
      });
      if (summaryLine) {
        console.log(`\n📊 ${summaryLine.trim()}`);
      }
      console.log('');
    } else {
      console.log('❌ Link checking failed with unknown error\n');
      console.log(error.stdout);
    }
  } else {
    console.log('❌ Failed to run link checker\n');
    console.log(error.message);
  }
  process.exit(1);
}
