// Core execution framework types for research-exec
//
// 📚 Documentation: TYPESCRIPT_TYPES_DOCUMENTATION.md
// 🔗 Main Project: ../../README.md
// 🎯 Usage Examples: ../../examples/research-to-code/IMPLEMENTATION_EXAMPLE.md
// 🏗️ Architecture: ../../TECHNICAL_SPECIFICATIONS.md
export interface ExecutionConfig {
  maxParallelSessions: number;
  sessionTimeoutMinutes: number;
  dailyRequestCap: number;
  staggerIntervalMinutes: number;
  retryAttempts: number;
  failureThresholdPercent: number;
}

// =============================================================================
// TASKMASTER WORKFLOW INTEGRATION - Phase 1: PRD Template System
// =============================================================================

export interface ProjectRequirementsDocument {
  project_name: string;
  vision: string;
  technical_requirements: string[];
  success_criteria: string[];
  dependencies: string[];
  constraints: string[];
  complexity_assessment: 'basic' | 'intermediate' | 'advanced' | 'expert';
  estimated_timeline_weeks: number;
  stakeholders: string[];
  risk_factors: RiskFactor[];
}

export interface RiskFactor {
  category: 'technical' | 'resource' | 'timeline' | 'integration';
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation_strategy: string;
}

// =============================================================================
// ENHANCED TASK SYSTEM - Phase 2: Task Breakdown Enhancement
// =============================================================================

export interface EnhancedTaskConfig {
  id: string;
  title: string;
  description: string;
  complexity_level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  dependencies: string[];
  subtasks: SubtaskConfig[];
  ai_executable: boolean;
  review_required: boolean;
  estimated_hours: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  tags: string[];
  acceptance_criteria: string[];
}

export interface SubtaskConfig {
  id: string;
  title: string;
  description: string;
  estimated_complexity: number; // 1-10 scale
  dependencies: string[];
  ai_prompt: string;
  success_criteria: string[];
  file_hints?: string[];
  validation_steps: string[];
}

// =============================================================================
// WORKFLOW ORCHESTRATION - Phase 3: AI Orchestration Integration
// =============================================================================

export interface TaskmasterWorkflow {
  prd: ProjectRequirementsDocument;
  tasks: EnhancedTaskConfig[];
  execution_context: ExecutionConfig;
  review_checkpoints: ReviewCheckpoint[];
  completion_criteria: string[];
  workflow_metadata: WorkflowMetadata;
}

export interface ReviewCheckpoint {
  id: string;
  name: string;
  trigger: 'task_completion' | 'milestone_reached' | 'time_based' | 'dependency_met';
  criteria: string[];
  required_approvers: string[];
  automated_checks: AutomatedCheck[];
}

export interface AutomatedCheck {
  type: 'lint' | 'test' | 'build' | 'security' | 'performance';
  command: string;
  success_criteria: string;
  failure_action: 'block' | 'warn' | 'continue';
}

export interface WorkflowMetadata {
  created_by: string;
  created_at: Date;
  last_modified: Date;
  version: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'archived';
  execution_history: WorkflowExecution[];
}

export interface WorkflowExecution {
  execution_id: string;
  start_time: Date;
  end_time?: Date;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  tasks_completed: string[];
  current_task?: string;
  metrics: ExecutionMetrics;
}

export interface ExecutionMetrics {
  tasks_completed: number;
  total_tasks: number;
  success_rate: number;
  average_task_duration_minutes: number;
  ai_automation_rate: number;
  review_cycles_count: number;
}

// =============================================================================
// EXISTING INTERFACES (preserved)
// =============================================================================

export interface ProjectConfig {
  name: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  repository: string;
  owner: string;
  tasks: TaskConfig[];
  dependencies?: string[];
  estimatedEffort: 'small' | 'medium' | 'large';
  complexity: 'low' | 'medium' | 'high';
}

export interface TaskConfig {
  id: string;
  title: string;
  description: string;
  acceptanceCriteria: string[];
  fileHints?: string[];
  configNotes?: string[];
  estimatedMinutes: number;
  tags: string[];
}

export interface SessionResult {
  sessionId: string;
  projectName: string;
  taskId: string;
  status: 'success' | 'failure' | 'timeout' | 'partial';
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  requestsUsed: number;
  pullRequestUrl?: string;
  errorMessage?: string;
  partialWork?: string;
  metrics: SessionMetrics;
}

export interface SessionMetrics {
  requestCount: number;
  codeChangesCount: number;
  testsPassed: boolean;
  lintPassed: boolean;
  filesModified: string[];
  linesAdded: number;
  linesDeleted: number;
  performanceScore: number; // 0-100
}

export interface ExecutionPlan {
  id: string;
  name: string;
  projects: ProjectConfig[];
  totalEstimatedMinutes: number;
  totalEstimatedRequests: number;
  executionOrder: string[];
  parallelBatches: string[][];
  createdAt: Date;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

export interface ResourceUtilization {
  timestamp: Date;
  cpuPercent: number;
  memoryPercent: number;
  diskIOPercent: number;
  networkIOPercent: number;
  activeSessions: number;
  queuedTasks: number;
  dailyRequestsUsed: number;
  dailyRequestsRemaining: number;
}

export interface PerformanceTargets {
  throughputTasksPerSprint: [number, number]; // [min, max]
  successRatePercent: number;
  resourceEfficiencyPercent: number;
  scalabilityFactor: number;
  maxConcurrentSessions: number;
}

export interface AlertConfig {
  failureRateThreshold: number;
  responseTimeThreshold: number;
  resourceUtilizationThreshold: number;
  notificationChannels: ('email' | 'slack' | 'webhook')[];
  escalationRules: EscalationRule[];
}

export interface EscalationRule {
  condition: string;
  delayMinutes: number;
  action: 'notify' | 'throttle' | 'halt';
  recipients: string[];
}

export interface ConcurrencyProfile {
  name: string;
  description: string;
  maxParallelSessions: number;
  resourceLimits: {
    memoryLimitGB: number;
    cpuLimitCores: number;
    diskSpaceGB: number;
  };
  optimizationStrategy: 'throughput' | 'reliability' | 'cost' | 'balanced';
  adaptiveScaling: boolean;
}

export interface GitHubIntegration {
  token: string;
  owner: string;
  repositories: string[];
  branchPrefix: string;
  labelStrategy: 'auto' | 'manual' | 'none';
  prTemplate?: string;
  reviewersAutoAssign?: string[];
}

export interface MonitoringConfig {
  enabled: boolean;
  metricsRetentionDays: number;
  realTimeDashboard: boolean;
  alerting: AlertConfig;
  performanceTargets: PerformanceTargets;
  exportFormats: ('json' | 'csv' | 'prometheus')[];
}
