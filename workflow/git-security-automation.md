# Git Security & Workflow Automation

## 🛡️ Global Git Hook Protection System

**Date Discovered:** June 7, 2025  
**Context:** Investigating why `.env` file commits were being blocked across projects

### 🔍 The Mystery

When attempting to commit in any new project, we encountered:
```
ERROR: Attempting to commit .env file, which may contain secrets.
FIX: Remove this file with: git reset .env
```

### 🎯 The Solution

This protection comes from a **global Git configuration** system that automatically applies security hooks to all new repositories.

### 🔧 How It Works

#### Global Configuration
- **Template Directory:** `/home/z/.git-templates/`
- **Git Config:** `git config --global init.templatedir /home/z/.git-templates`
- **Template Hook:** `/home/z/.git-templates/hooks/pre-commit`

#### Automatic Application
When creating any new Git repository (`git init` or `git clone`):
1. Git copies everything from `/home/z/.git-templates/` into the new `.git/` directory
2. The pre-commit hook becomes active immediately
3. No manual setup required per project

### 🛡️ Security Features

The global pre-commit hook provides:

1. **Environment File Protection**
   - Blocks commits of any file ending in `.env`
   - Prevents accidental secret exposure
   - Provides helpful error messages and fixes

2. **Main Branch Protection**
   - Prevents direct commits to `main`/`master` branches
   - Forces feature branch workflow
   - Allows initial commits for new repositories

3. **Project-Specific Hook Support**
   - Looks for `scripts/pre-commit-check.sh` in each project
   - Runs additional project-specific validations
   - Extensible security framework

### 📅 Timeline
- **Template Created:** May 20, 2025
- **Applied To:** All repositories created since then
- **Including:** `claude-code-troubleshoot`, `llm-univ`, and others

### 🎯 Benefits

This system provides:
- ✅ **Automatic Security:** Every new repo gets protection
- ✅ **Consistent Standards:** Same rules across all projects
- ✅ **Zero Setup:** Works without per-project configuration
- ✅ **Helpful Guidance:** Clear error messages and fixes
- ✅ **Extensible:** Supports project-specific additions

### 🔧 Hook Code Reference

The complete hook is stored at `/home/z/.git-templates/hooks/pre-commit` and includes:
- Environment file detection with regex pattern `\.env$`
- Branch checking with `git symbolic-ref HEAD`
- Project-specific hook execution support
- Clear error messaging with suggested fixes

#### Core Hook Logic
```bash
# Prevent committing .env files but allow .env.example
if git diff --cached --name-only | grep -E '\.env$'; then
  show_error "Attempting to commit .env file, which may contain secrets." "Remove this file with: git reset .env"
fi

# Check if trying to commit to main/master branch
BRANCH=$(git symbolic-ref HEAD 2>/dev/null | cut -d'/' -f3)
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
  if git rev-parse --verify HEAD >/dev/null 2>&1; then
    show_error "Committing directly to $BRANCH branch is not allowed." "Create a feature branch and make a pull request instead."
  fi
fi
```

### 💡 Best Practices Learned

1. **Always check current branch** before making commits
2. **Use feature branches** for all development work
3. **Keep `.env` files in `.gitignore`** for additional protection
4. **Leverage global Git templates** for consistent security across projects

### 🔗 Related Workflow Documentation

- [Terminal Management](windows-path-solutions.md) - Preventing blocking commands
- [Tool Selection](tool-selection-workflow.md) - MCP vs direct operations
- [Archive Migration](archive-migration-strategy.md) - Project organization strategy

## 📋 Implementation Across Projects

This global security system explains why new projects like `claude-code-troubleshoot` had pre-commit protection even though they were newly created - the security was automatically inherited from the global Git template configuration.

### Projects Protected
- ✅ `claude-code-troubleshoot` (discovered during troubleshooting)
- ✅ `llm-univ` (confirmed active)
- ✅ `research-exec` (strategy documentation)
- ✅ All future repositories created with `git init`

### Verification Commands
```bash
# Check if global template is active
git config --global --get init.templatedir

# Verify hook exists in a project
ls -la .git/hooks/pre-commit

# Test hook behavior (should block .env commits)
git add .env && git commit -m "test"
```

---

*This global security system provides comprehensive protection across all development projects with zero per-project setup required.*
