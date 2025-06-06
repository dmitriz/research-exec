# Windows Path Issues - Systematic Prevention

## 🚨 MANDATORY GITHUB COPILOT BEHAVIOR RULES 🚨

### ❗️🚫 ABSOLUTELY FORBIDDEN COMMANDS (WILL BLOCK TERMINAL):
- `git log`, `git show`, `git diff` (without strict limits)
- `less`, `more`, `man`, `cat` (on large files)
- Any interactive command waiting for user input
- Commands with Windows backslash paths (`C:\Users\...`)
- Any command that opens a pager or editor

### ✅ MANDATORY REPLACEMENT STRATEGY:

**1. ALWAYS TRY MCP SERVERS FIRST:**
- `f51_git_status` - Instead of `git status`
- `f51_git_log` - Instead of `git log`
- `f51_git_diff` - Instead of `git diff`
- `f51_git_show` - Instead of `git show`

**2. PATH FORMAT REQUIREMENTS:**
- ✅ Forward slashes: `/c/Users/dmitr/Projects/`
- ✅ Relative paths from workspace root
- 🚫 NEVER use backslashes: `C:\Users\dmitr\Projects\`

**3. TERMINAL SAFETY PROTOCOL:**
Before ANY terminal command, verify:
1. Check working directory with `pwd`
2. Confirm files exist with `ls` or `dir`
3. Use non-blocking, limited output commands only

## 🎯 Systematic Prevention Strategy

### Root Cause Analysis
- **Problem**: Reactive fixing wastes time on every interaction
- **Solution**: Proactive tool selection with built-in safety checks
- **Goal**: Eliminate entire category of Windows path failures

### Prevention Implementation
1. **Tool Selection**: MCP servers over terminal commands
2. **Path Standards**: Forward slashes mandatory
3. **Safety Protocols**: 3-step verification before any command
4. **Fallback Strategy**: Document when and why terminal needed

## Problem Analysis & Historical Context
- Commands often fail due to Windows path handling
- Mixed forward/back slashes cause issues
- Terminal blocking commands waste time and require force-quit
- Need systematic prevention approach instead of reactive fixes

## ✅ Sustainable Solutions (Proactive Prevention)

### 1. MCP Server Tools (Primary Strategy)
```bash
# Instead of terminal git commands that may block:
# Use MCP tools for all git operations:
f51_git_status    # Repository status
f51_git_log       # Commit history  
f51_git_diff      # File differences
f51_git_show      # Commit details
```

### 2. Path Format Standards
```bash
# ✅ ALWAYS use forward slashes:
cd /c/Users/dmitr/Projects/research-exec
npm run data:process

# 🚫 NEVER use backslashes:
cd "C:\Users\dmitr\Projects\research-exec"  # FORBIDDEN
```

### 3. Workspace-Relative Navigation (Best Practice)
```bash
# Terminal opens in workspace root - use relative paths:
cd research-exec
npm run data:process
# No absolute paths needed in most cases
```

### 4. Safety Verification Protocol
```bash
# MANDATORY before any terminal command:
pwd  # 1. Verify location
ls   # 2. Confirm files exist  
# 3. Use only non-blocking commands
```

### 5. NPM Scripts Over Direct Execution
```bash
# ✅ Preferred - uses project configuration:
npm run analyze
npm test
npm start

# 🚫 Avoid - path-dependent:
python src/analysis.py
node scripts/process.js
```

## 🛡️ Emergency Protocols

### If MCP Tools Fail
```bash
# Fallback strategy with strict safety:
pwd                           # Verify location
git status --porcelain       # Brief status
git log --oneline -5         # Limited log output
git diff --name-only         # File names only
```

### Terminal Recovery
```bash
# If terminal becomes unresponsive:
Ctrl+C                       # Interrupt command
Ctrl+Z                       # Suspend process
# Then close terminal and open new one
```

## 📊 Success Metrics
- ✅ Zero Windows path failures per session
- ✅ No terminal blocking incidents
- ✅ All git operations via MCP tools when available
- ✅ Consistent forward slash path usage
- ✅ Sub-5-second command execution times

## 🔄 Implementation Checklist
- [ ] MCP git tools tested and working
- [ ] Path format standards documented
- [ ] Safety protocols established
- [ ] Fallback procedures defined
- [ ] Success metrics defined
- [ ] Team training completed (if applicable)

---
*This systematic approach eliminates the Windows path problem category entirely through proactive tool selection and built-in safety checks.*
