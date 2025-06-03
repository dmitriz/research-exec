# Agent Execution Plan

*A reusable strategy for maximizing Copilot Agent Mode research output across AI/automation/dev projects*

---

## 📋 Overview

This plan optimizes GitHub Copilot Agent usage within constraints:
- **40 premium requests per day**
- **15-minute session limit**
- **5 parallel tasks maximum**

---

## ⏱️ Session Structure

### Time-Boxed Tasks
- Define each session as **15-minute focused sprints**
- Avoid 30+ minute sessions that trigger usage limits
- Run autonomously in isolated GitHub Actions environments
- Complete full cycle: read → code → test → iterate

### Clear Scope per Session
- **One goal per session**: implement feature OR fix bug
- Leverage Sonnet 4's hybrid thinking for multi-step tasks
- Break large tasks into sequential issues
- Maintain focused objectives within time windows

### Pre-Session Context Prep
- **Front-load context** in issue descriptions
- Include: file names, key functions, config steps
- Provide clear problem statements with acceptance criteria
- Add hints about target files/modules

### Iterative Containment
- Treat each session as **contained iteration**
- Review after completion (PR creation)
- Schedule follow-ups rather than extending sessions
- Enable quick turnaround cycles

---

## 📦 Task Packing

### Comprehensive Prompting
- **Single prompt = end-to-end task**
- Combine related work: *"Implement feature X + tests + docs"*
- Leverage multi-step autonomous capabilities
- Handle code → test → documentation in one session

### Bullet-Style Requirements
- Use **checklists for sub-tasks**
- Clear acceptance criteria listing
- Example: *"1. Add API endpoint; 2. Update README; 3. Pass tests"*
- Agent interprets as complete to-do list

### Minimize Chatty Interactions
- **Self-contained instructions**
- Avoid back-and-forth (consumes premium requests)
- Include constraints, preferences, approaches upfront
- Treat issue description as complete instruction manual

### Explicit Constraints and Context
- **Performance requirements** in prompt
- **Style guides** and preferences stated
- **Preferred dependencies** mentioned
- Maximize first-attempt accuracy

---

## 🎯 Prioritization

### High-Value First
- Rank **~20+ projects** by impact/feasibility
- Target: critical bugs, major features, refactoring
- Focus on important-but-neglected tasks
- Maximize overall sprint value

### Within AI Capabilities
- **Clear, self-contained tasks** (low-medium complexity)
- Avoid: broad/ambiguous, deep domain knowledge
- Target: features, bug fixes, library upgrades, refactors
- Choose hardest tasks **without** human-only insight

### Score by "Impact vs. Effort"
- **Complexity**: worthwhile but not overwhelming
- **Implementation potential**: autonomous completion likelihood
- **Dependency weight**: unlocks/improves other areas
- Rank across all projects, select top tasks

### Coverage Balance
- **Not equal share** - value-based allocation
- Multiple sessions for high-value projects
- Accept some projects untouched per sprint
- Dynamic prioritization as project list grows

---

## ⚡ Parallel Orchestration

### Concurrent Sessions Limit
- **Maximum 5 parallel sessions**
- Each gets isolated action runner
- Prevent CI resource overload
- Align with CI concurrency quotas

### Task Distribution
- **Different projects/code areas** per session
- Avoid agent interference
- **One session per repository** maximum
- Example: 5 issues across 5 distinct projects

### Staggered Kickoff
- **5-minute intervals** between starts
- Smooth out model request bursts
- Spaced PR returns for review time
- Queue next task as slots free up

### Sync and Monitor
- **Central dashboard/tracker** for status
- Track: issue/PR, project, start time
- Catch stalled sessions (15+ minutes, no PR)
- Coordinate completion and dependencies

---

## 📚 Documentation

### Automatic PRs as Records
- **PRs = primary work record**
- Branch naming: `copilot/...`
- Contains changes + original issue linkage
- Ensure repository push permissions

### Consistent Naming and Labels
- **Convention**: `[Project ABC] Implement Feature X`
- Branch: `copilot/ABC-feature-X`
- Label: `"Copilot-Agent"` for all AI issues
- Easy filtering and review

### Log Preservation
- **Save agent activity logs** per session
- Archive with PRs (attach or link)
- Debugging and performance auditing
- Access via Copilot/Actions logs

### Post-Sprint Summary
- **Daily summary compilation**
- List: projects touched, PRs opened, key changes
- Team communication and next sprint planning
- Maintain clear narrative at scale

---

## 🚨 Interruption Handling

### Proactive Rate-Limit Management
- **Monitor usage closely**
- Watch for 10+ model requests or 15+ minutes
- Proactively stop/break apart tasks
- Prevent hard limits that lock out access

### Detection of Failure
- **Alert on failure signs**:
  - Closed issues without PRs
  - Actions workflow errors
  - Agent comments: "Sorry, no response" or "Please wait"
- Early detection enables recovery

### Tag and Triage Partials
- **Label partial solutions**: `"Agent-Partial"`
- Document remaining work
- Convert to draft PR state
- Preserve progress on existing branches

### Rescheduling Strategy
- **Build buffer for failed tasks**
- Don't immediately retry same task
- Options:
  - Split into smaller chunks
  - Schedule retry with cooldown
  - Different approach/model
- Mark with retry timing notes

### Adaptive Throttling
- **Adjust strategy dynamically**
- Reduce parallel sessions if frequent interruptions
- Smaller tasks to reduce internal calls
- Balance 40-request daily budget
- Flexible, sustainable process

---

## ✅ Ready to Execute

*This plan provides a structured, scalable approach to maximize Copilot Agent productivity while respecting platform constraints and maintaining sustainable development velocity.*
