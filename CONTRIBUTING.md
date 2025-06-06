# Contributing to Research-Exec

## Overview

Research-Exec is a meta-framework for transforming GitHub repository analysis into AI-powered development strategies. We welcome contributions that enhance the framework's analysis capabilities, implementation workflows, and documentation.

## Quick Start for Contributors

```bash
# 1. Fork and clone
git clone https://github.com/your-username/research-exec.git
cd research-exec

# 2. Setup development environment
cp config.example.js config.js  # Edit with your GitHub username
npm install && npm run setup

# 3. Verify setup
npm run analyze && npm test
```

## Development Workflow

### 1. Code Conventions (Required)
- **JavaScript naming**: Use `snake_case` for variables and functions
- **Constants**: Use `UPPER_SNAKE_CASE` 
- **Functions**: Arrow notation preferred: `const analyze_repos = () => {}`
- **No classes**: Use functional programming patterns
- **Comments**: Explain "why" not "what" for complex logic

### 2. Project Structure
```
research-exec/
├── src/types/           # TypeScript interfaces 
├── utils/               # Data processing scripts
├── methodology/         # Universal frameworks
├── data/               # Analysis results (local only)
├── examples/           # Implementation examples
└── workflow/           # Process documentation
```

### 3. Contribution Types

#### 🔍 **Analysis Enhancement**
- Improve repository classification algorithms
- Add new technology detection patterns
- Enhance strategic priority assessment

#### 🤖 **AI Integration**
- Expand multi-agent orchestration capabilities
- Improve research-to-implementation workflows
- Add new autonomous execution patterns

#### 📚 **Documentation**
- Add implementation examples with before/after
- Improve methodology documentation
- Create user-specific workflow guides

#### 🔧 **Framework Development**
- Enhance TypeScript interfaces
- Improve data processing utilities
- Add new analysis dimensions

## Pull Request Guidelines

### Required Elements
- [ ] **Clear description** of changes and motivation
- [ ] **Follow naming conventions** (snake_case for JS)
- [ ] **Add examples** for new features
- [ ] **Update documentation** if needed
- [ ] **Privacy compliance** - no personal data in commits

### PR Template
```markdown
## Summary
Brief description of changes

## Type of Change
- [ ] Analysis enhancement
- [ ] AI integration  
- [ ] Documentation
- [ ] Framework development

## Testing
- [ ] Verified with `npm run analyze`
- [ ] Added examples if applicable
- [ ] Documentation updated

## Privacy Check
- [ ] No personal API keys or tokens
- [ ] No private repository data
- [ ] Follows privacy-first principles
```

## Issue Templates

### Bug Report
```markdown
**Problem**: Describe the issue
**Steps to Reproduce**: 1. 2. 3.
**Expected**: What should happen
**Actual**: What actually happens
**Environment**: OS, Node version, etc.
```

### Feature Request
```markdown
**Use Case**: Who needs this and why
**Proposed Solution**: How it should work
**Alternatives**: Other approaches considered
**Impact**: Expected benefits
```

## Code Standards

### JavaScript Examples
```javascript
// ✅ Good: snake_case, arrow functions, functional approach
const analyze_repository_data = (repos) => {
    const PRIORITY_THRESHOLD = 0.8; // UPPER_SNAKE_CASE for constants
    
    return repos
        .filter(repo => repo.strategic_value > PRIORITY_THRESHOLD)
        .map(extract_implementation_opportunities);
};

// ❌ Avoid: camelCase, classes, imperative style
class RepositoryAnalyzer {
    analyzeData(repos) { /* ... */ }
}
```

### TypeScript Interfaces
```typescript
// ✅ Extend existing interfaces from src/types/execution.ts
interface AnalysisConfig extends ExecutionConfig {
    privacy_mode: boolean;
    strategic_focus: string[];
}
```

## Testing Guidelines

### Analysis Testing
```bash
# Test with sample data
npm run analyze -- --config config.example.js

# Verify output structure
ls data/repos-analysis.md
cat data/repos-analysis.md | head -20
```

### Integration Testing
```bash
# Test multi-project coordination
cd ../agent-orchestrator && npm test
cd ../guardrails-info && npm run dev
cd ../research-exec && npm run analyze
```

## Privacy Requirements

### ✅ **Always Include**
- Public repository analysis only
- Example/anonymized data for testing
- Clear documentation of data handling

### ❌ **Never Include**
- Private repository data
- Personal API keys or tokens
- Individual usernames in examples
- Sensitive configuration files

## Documentation Standards

### File Naming
- Use descriptive names: `TYPESCRIPT_TYPES_DOCUMENTATION.md` not `README.md`
- Avoid duplicate README files in subdirectories
- Include version/date in research documents

### Content Structure
```markdown
# Clear Title

## Overview (What this does)

## Quick Start (How to use immediately)

## Detailed Guide (Step-by-step)

## Examples (Real workflows)

## Integration (How it fits with other components)
```

## Release Process

### Version Guidelines
- **Major**: Breaking changes to analysis methodology
- **Minor**: New analysis features, enhanced workflows  
- **Patch**: Bug fixes, documentation improvements

### Release Checklist
- [ ] All tests pass: `npm test && npm run analyze`
- [ ] Documentation updated
- [ ] Examples added for new features
- [ ] Privacy audit completed
- [ ] Multi-project integration verified

## Community Guidelines

### Communication
- **Be specific**: Include examples and concrete use cases
- **Privacy-conscious**: Never share personal data or API keys
- **Collaborative**: Focus on improving the framework for all users
- **Evidence-based**: Support suggestions with data and examples

### Recognition
Contributors will be recognized in:
- README.md contributor section
- Release notes for significant contributions
- Documentation authorship for major additions

---

## Getting Help

- **Setup Issues**: Check [SETUP.md](SETUP.md) for detailed configuration
- **Framework Questions**: Review [methodology/](methodology/) for universal approaches
- **Implementation Examples**: See [examples/](examples/) for concrete workflows
- **Architecture**: Check [src/types/TYPESCRIPT_TYPES_DOCUMENTATION.md](src/types/TYPESCRIPT_TYPES_DOCUMENTATION.md)

**Ready to contribute?** Start with a small documentation improvement or analysis enhancement!
