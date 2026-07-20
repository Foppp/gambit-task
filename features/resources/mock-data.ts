import type { Resource } from "./schema";

export const mockResources: Resource[] = [
  { id: "r-001", name: "payments-api-prod", type: "EC2 Instance", provider: "AWS", region: "us-east-1", environment: "production", criticality: "critical", owner: "payments", tags: ["pci", "api"], openIssues: 4 },
  { id: "r-002", name: "payments-db-prod", type: "RDS Database", provider: "AWS", region: "us-east-1", environment: "production", criticality: "critical", owner: "payments", tags: ["pci", "db"], openIssues: 1 },
  { id: "r-003", name: "identity-vault", type: "KMS Key", provider: "Azure", region: "eastus", environment: "production", criticality: "critical", owner: "security", tags: ["encryption", "secrets"], openIssues: 0 },
  { id: "r-004", name: "auth-service-role", type: "IAM Role", provider: "AWS", region: "global", environment: "production", criticality: "high", owner: "security", tags: ["iam", "auth"], openIssues: 2 },
  { id: "r-005", name: "analytics-warehouse", type: "BigQuery Dataset", provider: "GCP", region: "us-central1", environment: "production", criticality: "high", owner: "data", tags: ["analytics", "pii"], openIssues: 3 },
  { id: "r-006", name: "customer-sql-db", type: "Cloud SQL", provider: "GCP", region: "us-central1", environment: "production", criticality: "high", owner: "data", tags: ["pii", "db"], openIssues: 2 },
  { id: "r-007", name: "assets-static-cdn", type: "S3 Bucket", provider: "AWS", region: "eu-west-1", environment: "staging", criticality: "medium", owner: "platform", tags: ["cdn", "public"], openIssues: 0 },
  { id: "r-008", name: "billing-functions", type: "Cloud Function", provider: "GCP", region: "europe-west1", environment: "production", criticality: "medium", owner: "payments", tags: ["serverless", "billing"], openIssues: 1 },
  { id: "r-009", name: "network-vpc-core", type: "VPC", provider: "AWS", region: "us-east-1", environment: "production", criticality: "medium", owner: "network", tags: ["networking", "core"], openIssues: 0 },
  { id: "r-010", name: "ml-training-cluster", type: "GKE Cluster", provider: "GCP", region: "us-central1", environment: "development", criticality: "low", owner: "ml", tags: ["gpu", "training"], openIssues: 0 },
  { id: "r-011", name: "web-frontend-vm", type: "Virtual Machine", provider: "Azure", region: "westeurope", environment: "staging", criticality: "low", owner: "platform", tags: ["frontend"], openIssues: 1 },
  { id: "r-012", name: "dev-sandbox-storage", type: "Storage Account", provider: "Azure", region: "westeurope", environment: "development", criticality: "low", owner: "platform", tags: ["sandbox", "temp"], openIssues: 0 },
];
