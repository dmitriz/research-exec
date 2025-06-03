// Core execution framework types for research-exec
export interface ExecutionConfig {
  maxParallelSessions: number;
  sessionTimeoutMinutes: number;
  dailyRequestCap: number;
  staggerIntervalMinutes: number;
  retryAttempts: number;
  failureThresholdPercent: number;
}

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
