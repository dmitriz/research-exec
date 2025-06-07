#!/usr/bin/env node

/**
 * Taskmaster Workflow Utility
 * 
 * Command-line tool for managing Taskmaster workflows in research-exec framework.
 * Supports PRD creation, task breakdown, and workflow execution.
 */

const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '..', 'src', 'templates');
const WORKFLOW_DIR = path.join(__dirname, '..', 'workflow');

/**
 * Available commands and their descriptions
 */
const COMMANDS = {
  'create-prd': 'Create a new PRD from template',
  'generate-tasks': 'Generate task breakdown from PRD',
  'create-workflow': 'Create complete workflow from PRD',
  'list-templates': 'List available PRD templates',
  'validate-prd': 'Validate PRD structure and completeness',
  'status': 'Show workflow status and progress',
  'help': 'Show this help message'
};

/**
 * Create a new PRD from template
 */
const create_prd = (template_type, project_name) => {
  if (!template_type || !project_name) {
    console.error('Usage: create-prd <template-type> <project-name>');
    console.error('Available templates: agent-orchestrator, guardrails-info, mcp-servers');
    return;
  }

  const template_file = path.join(TEMPLATES_DIR, `prd-${template_type}.md`);
  
  if (!fs.existsSync(template_file)) {
    console.error(`Template not found: ${template_type}`);
    return;
  }

  const template_content = fs.readFileSync(template_file, 'utf8');
  const customized_content = template_content
    .replace(/PRD Template:/g, 'PRD:')
    .replace(/Agent Orchestrator Enhancement/g, project_name)
    .replace(/June 7, 2025/g, new Date().toLocaleDateString());

  const output_file = path.join(process.cwd(), `prd-${project_name.toLowerCase().replace(/\s+/g, '-')}.md`);
  fs.writeFileSync(output_file, customized_content);
  
  console.log(`✅ PRD created: ${output_file}`);
  console.log(`📝 Next steps:`);
  console.log(`   1. Edit the PRD with your specific requirements`);
  console.log(`   2. Run: taskmaster generate-tasks ${output_file}`);
};

/**
 * Generate task breakdown from PRD
 */
const generate_tasks = (prd_file) => {
  if (!prd_file || !fs.existsSync(prd_file)) {
    console.error('Usage: generate-tasks <prd-file-path>');
    return;
  }

  const prd_content = fs.readFileSync(prd_file, 'utf8');
  
  // Extract project name from PRD
  const project_name_match = prd_content.match(/### Project Name\s*\n([^\n]+)/);
  const project_name = project_name_match ? project_name_match[1].trim() : 'Unknown Project';
  
  // Extract technical requirements
  const tech_requirements_section = prd_content.match(/### Technical Requirements\s*\n(.*?)(?=###|\n## |$)/s);
  const requirements = tech_requirements_section ? 
    tech_requirements_section[1].match(/- \[ \] (.+)/g) || [] : [];

  // Generate task structure
  const tasks = requirements.map((req, index) => {
    const requirement = req.replace(/- \[ \] /, '').trim();
    const task_id = `task-${String(index + 1).padStart(3, '0')}`;
    
    return {
      id: task_id,
      title: requirement,
      description: `Implement: ${requirement}`,
      complexity_level: determine_complexity(requirement),
      dependencies: index > 0 ? [`task-${String(index).padStart(3, '0')}`] : [],
      ai_executable: is_ai_executable(requirement),
      review_required: requires_review(requirement),
      estimated_hours: estimate_hours(requirement),
      priority: determine_priority(requirement, index),
      subtasks: generate_subtasks(requirement, task_id)
    };
  });

  const task_breakdown = {
    project_name,
    generated_at: new Date().toISOString(),
    total_tasks: tasks.length,
    estimated_total_hours: tasks.reduce((sum, task) => sum + task.estimated_hours, 0),
    tasks
  };

  const output_file = path.join(process.cwd(), `tasks-${project_name.toLowerCase().replace(/\s+/g, '-')}.json`);
  fs.writeFileSync(output_file, JSON.stringify(task_breakdown, null, 2));
  
  console.log(`✅ Task breakdown generated: ${output_file}`);
  console.log(`📊 Summary:`);
  console.log(`   Total tasks: ${tasks.length}`);
  console.log(`   Estimated hours: ${task_breakdown.estimated_total_hours}`);
  console.log(`   AI executable: ${tasks.filter(t => t.ai_executable).length}/${tasks.length}`);
};

/**
 * Helper functions for task generation
 */
const determine_complexity = (requirement) => {
  const lower = requirement.toLowerCase();
  if (lower.includes('complex') || lower.includes('architecture') || lower.includes('integration')) {
    return 'expert';
  } else if (lower.includes('implement') || lower.includes('build') || lower.includes('develop')) {
    return 'advanced';
  } else if (lower.includes('create') || lower.includes('configure')) {
    return 'intermediate';
  }
  return 'basic';
};

const is_ai_executable = (requirement) => {
  const lower = requirement.toLowerCase();
  return !lower.includes('design') && !lower.includes('analyze') && !lower.includes('research');
};

const requires_review = (requirement) => {
  const lower = requirement.toLowerCase();
  return lower.includes('security') || lower.includes('architecture') || lower.includes('integration');
};

const estimate_hours = (requirement) => {
  const complexity = determine_complexity(requirement);
  const base_hours = {
    'basic': 4,
    'intermediate': 8,
    'advanced': 16,
    'expert': 24
  };
  return base_hours[complexity];
};

const determine_priority = (requirement, index) => {
  if (index < 2) return 'critical';
  if (index < 4) return 'high';
  return 'medium';
};

const generate_subtasks = (requirement, task_id) => {
  // Basic subtask generation - can be enhanced with AI
  return [
    {
      id: `${task_id}-01`,
      title: `Design ${requirement}`,
      description: `Create design and implementation plan for ${requirement}`,
      estimated_complexity: 3,
      ai_prompt: `Design implementation approach for: ${requirement}`,
      success_criteria: ['Design document created', 'Implementation plan approved']
    },
    {
      id: `${task_id}-02`,
      title: `Implement ${requirement}`,
      description: `Core implementation of ${requirement}`,
      estimated_complexity: 6,
      ai_prompt: `Implement the following requirement: ${requirement}`,
      success_criteria: ['Code implementation complete', 'Basic testing passes']
    },
    {
      id: `${task_id}-03`,
      title: `Test ${requirement}`,
      description: `Comprehensive testing of ${requirement}`,
      estimated_complexity: 3,
      ai_prompt: `Create comprehensive tests for: ${requirement}`,
      success_criteria: ['All tests pass', 'Test coverage >80%']
    }
  ];
};

/**
 * List available templates
 */
const list_templates = () => {
  console.log('📋 Available PRD Templates:');
  console.log('');
  
  try {
    const template_files = fs.readdirSync(TEMPLATES_DIR)
      .filter(file => file.startsWith('prd-') && file.endsWith('.md'))
      .map(file => file.replace('prd-', '').replace('.md', ''));
    
    template_files.forEach(template => {
      console.log(`   ${template}`);
    });
    
    console.log('');
    console.log('Usage: taskmaster create-prd <template-name> <project-name>');
  } catch (error) {
    console.error('Error reading templates directory:', error.message);
  }
};

/**
 * Show help information
 */
const show_help = () => {
  console.log('🎯 Taskmaster Workflow Utility');
  console.log('');
  console.log('Available commands:');
  Object.entries(COMMANDS).forEach(([cmd, desc]) => {
    console.log(`   ${cmd.padEnd(15)} ${desc}`);
  });
  console.log('');
  console.log('Examples:');
  console.log('   taskmaster create-prd agent-orchestrator "My Agent Project"');
  console.log('   taskmaster generate-tasks ./prd-my-project.md');
  console.log('   taskmaster list-templates');
};

/**
 * Main CLI handler
 */
const main = () => {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help') {
    show_help();
    return;
  }

  switch (command) {
    case 'create-prd':
      create_prd(args[1], args[2]);
      break;
    case 'generate-tasks':
      generate_tasks(args[1]);
      break;
    case 'list-templates':
      list_templates();
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.error('Run "taskmaster help" for available commands');
  }
};

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  create_prd,
  generate_tasks,
  list_templates,
  show_help
};
