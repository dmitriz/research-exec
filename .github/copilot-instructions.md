# GitHub Copilot Instructions

## Coding Conventions

### General Guidelines
- Use meaningful variable and function names that clearly describe their purpose
- Keep functions small and focused on a single responsibility
- Comment complex logic to explain the "why" not the "what"
- Follow the DRY (Don't Repeat Yourself) principle

### JavaScript Conventions
- Use snake_case for variables and functions
- Avoid classes and TypeScript
- Use UPPER_SNAKE_CASE for constants
- Use arrow notation for functions

### File Organization
- Group related files in directories
- Keep test files close to the code they test

## Copilot-Specific Instructions

### Code Generation Preferences
- Always follow the snake_case naming convention for JavaScript
- Prefer functional programming patterns over object-oriented
- Generate concise, focused functions
- Include meaningful comments for complex logic
- Use arrow functions by default
- Declare constants using UPPER_SNAKE_CASE

### Project Context
This is a research execution project that processes and analyzes repository data. When suggesting code:
- Focus on data processing and analysis utilities
- Maintain consistency with existing file structure
- Consider the research and documentation-heavy nature of the project
- Suggest improvements that align with the methodical approach evident in the project structure

### Code Review Guidelines
- Ensure all variable names are descriptive and use snake_case
- Verify functions have single responsibilities
- Check that constants follow UPPER_SNAKE_CASE convention
- Confirm arrow function usage where appropriate
- Validate that complex logic includes explanatory comments
