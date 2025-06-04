# Archive Migration Strategy

## Priority: Move Project-Specific Research to Individual Repositories

### High-Priority Migrations (Active Projects)
These should be moved to their respective individual repositories:

**AI & Agent Projects**:
- `ISSUE_LABELER_RESEARCH.md` → `issue-labeler` repository 
- `GIT_SCRIPTS_RESEARCH.md` → `git-scripts` repository
- `SETUP_SCRIPTS_RESEARCH.md` → `setup-scripts` repository
- `DATA_TOOLS_RESEARCH.md` → `data-tools` repository
- `FIRECRAWL_MCP_SERVER_RESEARCH.md` → `firecrawl-mcp-server` repository

**Development Tools**:
- `DEVCONTAINER_VSCODE_RESEARCH.md` → `devcontainer-vscode` repository
- `VSCODE_RUNONSAVE_RESEARCH.md` → `vscode-runonsave` repository
- `VSCODE_LEARNING_RESEARCH.md` → `vscode-learning` repository
- `API_TESTING_RESEARCH.md` → `api-testing` repository

**AI Research Projects**:
- `ANDROID_DICTATION_RESEARCH.md` → `android-dictation` repository
- `CLOUDFLARE_APP_RESEARCH.md` → `cloudflare-app` repository
- `COLLAB_FRAME_RESEARCH.md` → `collab-frame` repository

### Medium-Priority Migrations
**System Prompt Research**:
- `LEAKED_SYSTEM_PROMPTS_RESEARCH.md` → `leaked-system-prompts` repository
- `SYSTEM_PROMPTS_LEAKS_RESEARCH.md` → `system_prompts_leaks` repository
- `SYSTEM_PROMPTS_AND_MODELS_OF_AI_TOOLS_RESEARCH.md` → `system-prompts-and-models-of-ai-tools` repository

**AI Platforms & Frameworks**:
- `CUSTOM_GPTS_RESEARCH.md` → `custom-gpts` repository
- `GEMINI_AI_CHATBOT3_RESEARCH.md` → `gemini-ai-chatbot3` repository
- `NEW_LANGGRAPHJS_PROJECT_RESEARCH.md` → `new-langgraphjs-project` repository
- `OTTOMATOR_AGENTS_RESEARCH.md` → `ottomator-agents` repository

**Development & Integration**:
- `LLM_INTEGRATION_RESEARCH.md` → `llm-integration` repository
- `TESTING_API_RESEARCH.md` → `testing-api` repository
- `VOID_RESEARCH.md` → `void` repository

### Keep in Research-Exec (Strategy Level)
**Cross-Project Analysis**:
- `research-project-tracking.md` → Transform to methodology
- `research-tracking-streamlined.md` → Transform to methodology
- `agent-execution-plan.md` → Extract patterns to methodology
- `STRATEGIC_SYNTHESIS.md` → Transform to methodology

**Portfolio-Level Analysis**:
- `ai-deep-research-analysis.md` → Extract methodology patterns
- `concurrency-adaptation-analysis.md` → Extract technical patterns

## Execution Strategy

### Phase 1: Repository Validation (1 day)
- Verify all target repositories exist
- Check access permissions for each repository
- Identify any repositories that need creation

### Phase 2: Content Migration (3-5 days)
- Move research files to individual repositories
- Add brief README references in each repository
- Update file paths in any cross-references

### Phase 3: Strategy Consolidation (2 days)
- Extract universal patterns from moved content
- Consolidate into `methodology/` documents
- Update hash-linked references in README

### Phase 4: Archive Cleanup (1 day)
- Remove migrated files from `archive/`
- Keep only cross-project strategy documents
- Update directory references

## Success Criteria
- ✅ Each project has its own research documentation
- ✅ `research-exec` focuses on universal methodology
- ✅ No broken hash-link references
- ✅ Clear separation of strategy vs. project-specific data
- ✅ Reduced archive directory by 80%+

## Risk Mitigation
- Backup current state before any moves
- Test hash-links after each migration batch
- Maintain migration log for rollback if needed
- Verify each repository accepts the new research file

---
*Migration Priority: HIGH - Completes the strategy/data separation*
