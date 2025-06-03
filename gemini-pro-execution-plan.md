# Gemini Pro Execution Plan

*A comprehensive strategy for parallel deep research across ~20 AI/automation projects using Gemini 2.5 Pro*

---

## 📋 Overview

This plan optimizes Gemini Pro usage for maximum research depth:
- **6 parallel sessions maximum**
- **Uncapped session size** for comprehensive exploration
- **~20 project topics** across full-day execution
- **8-10 bullet clusters** per research output

---

## ⏱️ Session Structure

### Session Scoping
- **Single project topic** per session
- Focus on core technical challenges and novel approaches
- Generate **8-10 distinct bullet point clusters**
- Extract high-value information requiring complex synthesis
- Defer secondary topics unless critical to understanding

### Time-Boxing and Iteration
- **15-25 minutes** per major prompt iteration
- Multiple iterative prompts for maximum depth
- Well-planned research "conversation" steps
- Avoid unguided multi-turn interactions
- Emphasis on depth over speed

### Defining Success for a Session
**SMART Criteria:**
- **Specific**: Addresses core technical questions in topic brief
- **Measurable**: 8-10 detailed bullet clusters, ~1500 words
- **Achievable**: Attainable depth within reasonable prompts
- **Relevant**: Directly informs project technical direction
- **Time-bound**: Fits within full-day execution constraints

### Success Indicators
- Thoroughly addresses project brief
- Well-supported by synthesized information
- Adheres to output format requirements
- Moves beyond surface-level information
- Avoids shallow preference signals

---

## 📦 Task Packing Strategy

### Multi-Objective Prompts
**Embed multiple research objectives:**
- Summary of current state-of-the-art
- Key technical challenges identification
- Novel theoretical approaches exploration
- Relevant tools/frameworks for implementation
- Known limitations and open research questions

### Advanced Prompting Techniques

#### Chain-of-Thought (CoT)
- **Step-by-step reasoning**: "First analyze X, then consider Y implications"
- Encourage explicit reasoning processes
- Particularly useful for sparse documentation topics

#### Retrieval Augmented Generation (RAG)
- Leverage Gemini's **web-enhanced synthesis**
- Frame prompts to maximize external information utility
- Request synthesis requiring web lookups

#### Multi-Objective Directional Prompting
**Balance key objectives:**
- **Technical depth** and detail
- **Innovation** highlighting
- **Clarity** of complex concepts
- **Coverage** of high-value areas

### Structuring Prompts for Synthesis
- **Clear, specific instructions** minimize ambiguity
- Use **delimiters** for structured information requests
- Request **explicit synthesis**: "Synthesize findings into..."
- Include **exhaustive analysis** phrases
- Consistent **format specification** (8-10 bullet clusters)

---

## 🎯 Prioritization Rules

### Frontload Ambiguous, High-Value Research

#### High-Value Research Definition
- **Low public documentation** topics
- **Significant technical impact** potential
- **Downstream project dependencies**

#### Rationale for Frontloading
- **Low Documentation**: Requires intensive synthesis and web research
- **Technical Impact**: Can fundamentally shape project direction
- **Dependencies**: Unblocks subsequent work early
- **Uncertainty**: Benefits most from deep synthesis

### Identifying and Ranking Topics

#### Pre-computation Assessment
- **Quick web search** for documentation availability
- **Domain expert judgment** on technical impact
- **Inter-project relationship** mapping

#### Example High-Priority Topics
- "Seccomp policies in containerized LLM runtimes"
- "Efficient scheduling for AI agents"
- "Autonomous GraphQL documentation extractors"

### Deferring Non-Critical Subtopics
- **Explicit prompt guidance** to focus on core questions
- Avoid shallow results from tangential exploration
- Clear scope and purpose definition

---

## ⚡ Parallel Execution Plan

### Session Deployment
- **Up to 6 concurrent sessions**
- One project topic per session
- Initial deployment prioritizes high-value topics
- Continuous assignment as sessions complete

### Batching and Asynchronous Processing
- **Independent task execution** per session
- Sessions start/finish at different times
- **Resource control** through 6-session limit
- Asynchronous workflow management

### Synchronization and Workflow Management

#### Project Tracking
**Central tracking mechanism:**
- **Pending**: Awaiting assignment
- **In Progress**: Session X active
- **Completed**: File Y generated
- **Flagged**: Reason specified

#### Dependency Management
- Process dependencies after initial high-priority batch
- Consider downstream project requirements
- Manage inter-project relationships

### Resource Utilization
- **Fixed upper bound**: 6 parallel sessions
- **Optimize each session** for maximum depth
- **Balance depth vs. coverage** across ~20 projects
- Monitor and adjust if sessions exceed expected duration

---

## 🚨 Overflow Management

### Detecting Overflow and Flags

#### Overflow Definition
- Responses exceeding session scope/buffer limits
- Auto-truncated outputs
- Significantly off-topic content

#### Flagged Output: `> ****`
- Weak, incomplete responses
- Auto-truncated content
- Shallow analysis requiring re-run

### Detection Mechanisms
- **Auto-Truncation**: Incomplete sentences, abrupt endings
- **Shallow Output**: Superficial coverage, generic statements
- **Incomplete Responses**: Missing prompt components
- **Format Violations**: Incorrect structure delivery

### Reprocessing Strategies

#### Immediate Review
- Quick completeness and depth assessment
- Format adherence verification

#### Corrective Prompting
**For shallow output:**
- "Elaborate significantly on point X with detailed technical explanations"
- "Provide every relevant detail—avoid artificial grouping"

**For incomplete/truncated output:**
- Ask Gemini to "continue" from truncation point
- Break into smaller sub-prompts
- Re-emphasize format instructions

**For off-topic output:**
- Re-prompt with constrained scope
- Focus only on specific aspects

### Fallback Mechanisms
- **High-priority topics**: Flag for manual research if multiple retries fail
- **Lower-priority topics**: Accept less-than-perfect output with detailed flags
- **Alternative approaches**: Significantly altered prompting strategies

### Internal Flagging Protocol
**Flag types:**
- `> ****` - General issues
- `> ****` - Quality issues  
- `> ****` - Scope issues

---

## 📄 Output Protocol

### File Naming Convention
**Format**: `/research/[project-title]-v1.md`

#### Project Title Guidelines
- **Slugified** version of topic brief
- **Lowercase letters** only
- **Hyphens** replace spaces/special characters
- **Concise yet descriptive**
- Example: `efficient-scheduling-ai-agents-v1.md`

### Markdown Formatting

#### Structure Requirements
- **H1 title** matching project brief
- **8-10 bullet clusters** representing distinct themes
- **Sub-headings** (H2/H3) for cluster organization
- **~1500 words** target length

#### Elements Standards
- **Headings**: ATX-style (#, ##, ###)
- **Lists**: Standard Markdown (-, *, 1.)
- **Emphasis**: Bold (**text**) and italics (*text*)
- **Code Blocks**: Fenced with language specification
- **Links**: Descriptive text with [text](url) format

### Versioning and Iteration
- **-v1.md**: Initial version from research sprint
- **Overwrite v1**: If reprocessed and improved same day
- **-v2.md**: Future deeper research phases
- **Consistent structure**: Enables automated analysis
- **Knowledge base evolution**: Cross-project theme extraction

---

## ✅ Ready to Execute with Gemini

*This plan transforms parallel research execution into a systematic knowledge discovery process, ensuring maximum depth and structured outputs across all project topics.*
