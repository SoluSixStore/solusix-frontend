# Logging & Tracing Examples

## Basic Usage

```typescript
import { logger } from "@/lib/logger";

// Simple logging
logger.info("User logged in", { userId: "123", email: "user@example.com" });

// Error logging with stack trace
try {
  // Some operation
} catch (error) {
  logger.error("Failed to process payment", { orderId: "456" }, error);
}

// Debug logging (only when LOG_LEVEL=debug)
logger.debug("Processing request", { requestId: "789" });
```

## Structured Log Output

### Development (Console)

```
[2024-01-15T10:30:45.123Z] INFO: User logged in
  traceId: 550e8400-e29b-41d4-a716-446655440000
  spanId: 6ba7b810-9dad-11d1-80b4-00c04fd430c8
  serviceName: solusix-landing
  env: development
  releaseVersion: abc123def
  securityAlert: false
  userId: 123
  email: «EMAIL_REDACTED»
  file: /app/components/LoginForm.tsx
  line: 45
  function: handleLogin
```

### Production (JSON)

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "info",
  "message": "User logged in",
  "traceId": "550e8400-e29b-41d4-a716-446655440000",
  "spanId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  "serviceName": "solusix-landing",
  "env": "production",
  "releaseVersion": "abc123def",
  "securityAlert": false,
  "userId": "123",
  "email": "«EMAIL_REDACTED»"
}
```

## Trace Propagation

### HTTP Headers

```typescript
// Client sends request with trace headers
const response = await fetch("/api/users", {
  headers: {
    "X-Trace-Id": "550e8400-e29b-41d4-a716-446655440000",
    "X-Span-Id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
  },
});

// Server automatically propagates trace context
logger.info("Processing API request", { endpoint: "/api/users" });
```

### Manual Trace Management

```typescript
import { TraceContextManager } from "@/lib/logger";

// Set trace context from external source
TraceContextManager.setTraceContext("external-trace-id", "external-span-id");

// Create new span within current trace
const span = TraceContextManager.createSpan();
logger.info("Processing sub-operation", { spanId: span.spanId });
```

## Secret Detection Examples

### Detected Secrets (Redacted)

```typescript
// These will be automatically redacted
logger.info("API call", {
  apiKey: "sk-test-1234567890abcdef", // → «REDACTED»
  openaiKey: "sk-1234567890abcdef", // → «REDACTED»
  awsKey: "AKIAIOSFODNN7EXAMPLE", // → «REDACTED»
  databaseUrl: "postgresql://user:pass@db", // → «REDACTED»
  jwtSecret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", // → «REDACTED»
  email: "user@example.com", // → «EMAIL_REDACTED»
  password: "secret123", // → «REDACTED»
});
```

### Safe Data (Not Redacted)

```typescript
// These will pass through unchanged
logger.info("User data", {
  name: "John Doe",
  age: 30,
  preferences: ["dark-mode", "notifications"],
  isActive: true,
});
```

## Privacy Protection

### Automatic Sanitization

```typescript
import { PrivacySanitizer } from "@/lib/logger";

const userData = {
  name: "John Doe",
  email: "john@example.com",
  cpf: "123.456.789-00",
  card: "1234-5678-9012-3456",
  phone: "(11) 99999-9999",
};

const sanitized = PrivacySanitizer.sanitize(userData);
// Result:
// {
//   name: 'John Doe',
//   email: '«EMAIL_REDACTED»',
//   cpf: '«CPF_REDACTED»',
//   card: '«CARD_REDACTED»',
//   phone: '«PHONE_REDACTED»'
// }
```

## Error Handling

### Uncaught Exceptions

```typescript
// Automatically logged with full stack trace
process.on("uncaughtException", (error) => {
  // Logger automatically handles this
  // Logs with level: 'error', includes errorStack
});

// Unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  // Logger automatically handles this
  // Logs with level: 'error'
});
```

### Manual Error Logging

```typescript
try {
  // Risky operation
  throw new Error("Database connection failed");
} catch (error) {
  logger.error(
    "Database operation failed",
    {
      operation: "user.create",
      userId: "123",
    },
    error,
  );

  // Log entry includes:
  // - errorStack: full stack trace
  // - securityAlert: false (unless secrets detected)
  // - All other structured fields
}
```

## Environment Configuration

### Development

```bash
NODE_ENV=development
LOG_LEVEL=debug
SERVICE_NAME=solusix-landing
GIT_SHA=abc123def
```

### Production

```bash
NODE_ENV=production
LOG_LEVEL=info
SERVICE_NAME=solusix-landing
GIT_SHA=abc123def
```

## Monitoring & Metrics

### Prometheus Metrics

```typescript
// Secret leak counter
secret_leak_total{secret_type="runtime",severity="high"} 5

// Available metrics:
// - secret_leak_total: Number of secrets detected
// - Labels: secret_type (runtime/ci), severity (low/medium/high)
```

### Log Levels

- `DEBUG`: Detailed debugging information (LOG_LEVEL=debug only)
- `INFO`: General application flow
- `WARN`: Warning conditions
- `ERROR`: Error conditions
- `FATAL`: Critical errors (exits process)

## Security Alerts

When secrets are detected:

```json
{
  "securityAlert": true,
  "message": "API call made",
  "apiKey": "«REDACTED»",
  "level": "info"
}
```

## File Rotation (Production)

Logs are automatically rotated:

- Max file size: 20MB
- Max files: 14 days
- Location: `logs/application-YYYY-MM-DD.log`
- Also outputs to STDOUT for container environments
