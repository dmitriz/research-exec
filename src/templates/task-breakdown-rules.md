# Task Breakdown Rules

**Purpose**: Guidelines for decomposing PRD requirements into executable tasks and subtasks that support AI-driven development workflows.

## Task Hierarchy Principles

### 1. Top-Level Tasks (Major Features)
- Represent significant functional deliverables
- Should be completable within 1-3 days by experienced developer
- Map directly to PRD technical requirements
- Include clear acceptance criteria and success measures

### 2. Subtasks (Implementation Steps)
- Granular, specific implementation actions
- Completable within 1-4 hours
- Include AI-executable prompts and file hints
- Define clear validation steps

### 3. Dependencies and Ordering
- Identify blocking relationships between tasks
- Create logical execution sequences
- Enable parallel execution where possible
- Consider integration and testing dependencies

## Task Configuration Standards

### Essential Task Properties
```typescript
// Based on EnhancedTaskConfig interface
{
  id: "unique-identifier",
  title: "Clear, Action-Oriented Title",
  description: "Detailed description with context",
  complexity_level: "basic" | "intermediate" | "advanced" | "expert",
  dependencies: ["prerequisite-task-ids"],
  ai_executable: true | false,
  review_required: true | false,
  estimated_hours: realistic_estimate,
  priority: "critical" | "high" | "medium" | "low"
}
```

### Subtask Best Practices
```typescript
// Based on SubtaskConfig interface
{
  id: "subtask-identifier",
  title: "Specific Implementation Action",
  description: "Step-by-step implementation details",
  estimated_complexity: 1-10, // 1=trivial, 10=expert-level
  ai_prompt: "Detailed AI execution prompt",
  success_criteria: ["measurable completion indicators"],
  file_hints: ["specific files to modify/create"],
  validation_steps: ["how to verify completion"]
}
```

## Complexity Level Guidelines

### Basic (1-3 complexity points)
- Simple configuration changes
- Documentation updates
- Basic file modifications
- Straightforward integrations

### Intermediate (4-6 complexity points)
- New feature implementation
- API integrations
- Database schema changes
- Moderate refactoring tasks

### Advanced (7-8 complexity points)
- Complex system integrations
- Performance optimizations
- Security implementations
- Cross-system dependencies

### Expert (9-10 complexity points)
- Architecture changes
- Complex algorithm implementations
- System design decisions
- High-risk modifications

## Task Breakdown Patterns

### Feature Implementation Pattern
1. **Analysis Task**: Requirements analysis and design
2. **Core Implementation**: Main functionality development
3. **Integration Task**: System integration and configuration
4. **Testing Task**: Unit, integration, and validation testing
5. **Documentation Task**: Code documentation and user guides

### System Integration Pattern
1. **Interface Definition**: API and data contract design
2. **Adapter Implementation**: Integration layer development
3. **Configuration Setup**: System configuration and deployment
4. **Validation Testing**: End-to-end integration testing
5. **Monitoring Setup**: Logging, metrics, and alerting

### Refactoring Pattern
1. **Impact Analysis**: Analyze scope and dependencies
2. **Preparation**: Create safety nets (tests, backups)
3. **Incremental Changes**: Small, safe refactoring steps
4. **Validation**: Verify functionality and performance
5. **Cleanup**: Remove deprecated code and documentation updates

## AI Execution Optimization

### Effective AI Prompts
- Include complete context and background information
- Specify exact file locations and modification requirements
- Provide examples of expected code style and patterns
- Include validation commands and success criteria

### File Hints Best Practices
- Specify exact file paths relative to project root
- Include relevant configuration files and dependencies
- Mention related test files and documentation
- Reference existing similar implementations

### Success Criteria Definition
- Define measurable completion indicators
- Include functional testing requirements
- Specify performance or quality benchmarks
- List integration testing checkpoints

## Dependency Management

### Dependency Types
- **Blocking**: Task cannot start until dependency completes
- **Resource**: Shared resource conflicts requiring coordination
- **Information**: Output from one task required by another
- **Integration**: Changes must be compatible across tasks

### Dependency Resolution
- Create dependency graphs to visualize relationships
- Identify critical path for timeline planning
- Enable parallel execution of independent tasks
- Plan integration points and validation checkpoints

## Task Review and Quality Assurance

### Review Triggers
- All expert-level complexity tasks require review
- Security or compliance-related implementations
- Architecture or design changes
- Cross-system integrations

### Automated Validation
- Unit test execution and coverage requirements
- Linting and code style validation
- Build and deployment verification
- Performance and security scanning

### Review Checkpoints
- Task completion review with acceptance criteria validation
- Code quality and architectural consistency review
- Integration testing and system validation
- Documentation and knowledge transfer review

## Integration with Existing Systems

### Agent Orchestrator Integration
- Assign tasks to appropriate agent specializations
- Configure agent handoff protocols for task dependencies
- Define agent coordination patterns for complex workflows
- Implement automated progress tracking and reporting

### Workflow Automation
- Link task breakdown to execution planning systems
- Integrate with GitHub project management and PR workflows
- Connect to monitoring and alerting systems
- Support both manual and automated task execution

### Quality Metrics
- Track task completion rates and success metrics
- Monitor AI execution effectiveness and accuracy
- Measure review cycle efficiency and quality
- Analyze dependency resolution and workflow optimization opportunities
