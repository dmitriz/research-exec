# PRD Generation Rules

**Purpose**: Guidelines for creating Project Requirements Documents (PRDs) that align with research-exec framework and support AI-driven task execution.

## Core PRD Structure

### 1. Project Definition
- **Project Name**: Clear, descriptive name that reflects the project scope
- **Vision**: Single paragraph describing the desired outcome and value proposition
- **Type Classification**: Choose from agent-orchestrator, guardrails-info, mcp-servers, or custom

### 2. Requirements Specification
- **Technical Requirements**: Specific, measurable deliverables (use checkboxes for tracking)
- **Success Criteria**: Objective measures of project completion
- **Dependencies**: External systems, tools, or prerequisites required
- **Constraints**: Limitations, restrictions, or non-functional requirements

### 3. Complexity and Risk Assessment
- **Complexity Level**: basic | intermediate | advanced | expert
- **Timeline Estimation**: Realistic timeline based on complexity and dependencies
- **Risk Factors**: Identify potential blockers with impact assessment and mitigation strategies

### 4. Stakeholder Mapping
- **Primary**: Direct project owner/decision maker
- **Secondary**: Contributors and collaborators
- **Reviewers**: Quality assurance and approval authorities
- **End Users**: Final beneficiaries of the project outcomes

## PRD Quality Guidelines

### Make Requirements SMART
- **Specific**: Clear and unambiguous language
- **Measurable**: Quantifiable success criteria
- **Achievable**: Realistic given available resources
- **Relevant**: Aligned with strategic objectives
- **Time-bound**: Clear timeline and milestones

### AI Execution Optimization
- Include specific file hints and directory structures
- Provide clear acceptance criteria for each requirement
- Define validation steps that can be automated
- Structure requirements to enable task breakdown automation

### Integration Considerations
- Link to existing strategic implementation plans
- Reference relevant TypeScript interfaces and types
- Identify opportunities for agent-orchestrator utilization
- Consider compliance and security requirements early

## Template Selection Guide

### Agent Orchestrator Projects
Use when building or enhancing multi-agent systems, automation frameworks, or AI coordination systems.

### Guardrails Info Projects
Use when implementing compliance, security, policy enforcement, or audit trail systems.

### MCP Servers Projects
Use when deploying, configuring, or managing Model Context Protocol servers and related infrastructure.

### Custom Projects
Create custom PRD when project doesn't fit standard templates. Follow the core structure and adapt sections as needed.

## PRD Validation Checklist

- [ ] Vision statement is clear and compelling
- [ ] All technical requirements are specific and testable
- [ ] Success criteria are measurable and objective
- [ ] Dependencies are identified and validated
- [ ] Complexity assessment is realistic
- [ ] Timeline estimates include buffer for risks
- [ ] Stakeholders are clearly identified
- [ ] Risk factors include mitigation strategies
- [ ] Requirements enable AI-driven task execution

## Integration with Existing Framework

### Link to Strategic Plans
- Reference relevant sections from STRATEGIC_IMPLEMENTATION_PLAN.md
- Align with priorities in IMPLEMENTATION_ROADMAP.md
- Consider technical constraints from TECHNICAL_SPECIFICATIONS.md

### Enable Task Breakdown
- Structure requirements to support automated task generation
- Include implementation hints for AI agents
- Define clear handoff points between tasks
- Specify validation and testing approaches

### Support Quality Assurance
- Define review checkpoints and criteria
- Include automated testing requirements
- Specify documentation and knowledge transfer needs
- Plan for iterative improvement and feedback incorporation
