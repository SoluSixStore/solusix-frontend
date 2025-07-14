# Security Guide - Secret Detection & Protection

## Runtime Secret Detection

### Current Patterns

The system automatically detects and redacts the following secret patterns:

#### API Keys

```regex
/(sk-|pk-)[a-zA-Z0-9]{20,}/gi
```

- **Matches**: `sk-test-1234567890abcdef`, `pk-live-abcdefghijklmnop`
- **Purpose**: OpenAI, Stripe, and similar API keys

#### Generic Secret Patterns

```regex
/(api_key|api_secret|access_token|secret_key)\s*[:=]\s*['"][^'"]+['"]/gi
```

- **Matches**: `api_key: "abc123"`, `secret_key = "xyz789"`
- **Purpose**: Generic API credentials

#### Cloud Provider Credentials

```regex
/(AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY|GOOGLE_APPLICATION_CREDENTIALS)\s*[:=]\s*['"][^'"]+['"]/gi
/(AZURE_CLIENT_ID|AZURE_CLIENT_SECRET|AZURE_TENANT_ID)\s*[:=]\s*['"][^'"]+['"]/gi
```

- **Matches**: AWS, Google Cloud, Azure credentials
- **Purpose**: Cloud service authentication

#### Database URLs

```regex
/(DATABASE_URL|MONGODB_URI|REDIS_URL)\s*[:=]\s*['"][^'"]+['"]/gi
```

- **Matches**: `DATABASE_URL="postgresql://user:pass@host:5432/db"`
- **Purpose**: Database connection strings

#### JWT Secrets

```regex
/(JWT_SECRET|JWT_PRIVATE_KEY)\s*[:=]\s*['"][^'"]+['"]/gi
```

- **Matches**: JWT signing keys
- **Purpose**: Authentication tokens

#### Email/Password

```regex
/(email|password)\s*[:=]\s*['"][^'"]+['"]/gi
```

- **Matches**: User credentials
- **Purpose**: User authentication data

#### Generic Secret Detection

```regex
/(token|key|secret|password)\s*[:=]\s*['"][^'"]{10,}['"]/gi
```

- **Matches**: Any key-value pair with secret-like names and long values
- **Purpose**: Catch-all for various secret patterns

## Privacy Protection Patterns

### Email Addresses

```regex
/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g
```

- **Replacement**: `«EMAIL_REDACTED»`
- **Purpose**: Protect user email addresses

### Brazilian CPF

```regex
/\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g
```

- **Replacement**: `«CPF_REDACTED»`
- **Purpose**: Protect Brazilian tax IDs

### Credit Cards

```regex
/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g
```

- **Replacement**: `«CARD_REDACTED»`
- **Purpose**: Protect payment card numbers

### Phone Numbers (Brazilian)

```regex
/\b\(\d{2}\)\s?\d{4,5}-?\d{4}\b/g
```

- **Replacement**: `«PHONE_REDACTED»`
- **Purpose**: Protect phone numbers

## Extending Secret Detection

### Adding New Patterns

1. **Edit `lib/logger.ts`**

```typescript
const SECRET_PATTERNS = [
  // Existing patterns...

  // Add your new pattern
  /your_new_pattern/gi,

  // Example: GitHub tokens
  /ghp_[a-zA-Z0-9]{36}/gi,

  // Example: Slack tokens
  /xoxb-[a-zA-Z0-9-]+/gi,
];
```

2. **Test the pattern**

```typescript
import { SecretScanner } from "@/lib/logger";

const testData = {
  githubToken: "ghp_1234567890abcdef1234567890abcdef12345678",
  normalData: "safe",
};

const result = SecretScanner.scanObject(testData);
console.log(result.hasSecrets); // Should be true
console.log(result.redactedObj.githubToken); // Should be '«REDACTED»'
```

### Adding New Privacy Patterns

1. **Edit `lib/logger.ts`**

```typescript
// In PrivacySanitizer class
const sanitizeString = (str: string): string => {
  return (
    str
      .replace(emailRegex, "«EMAIL_REDACTED»")
      .replace(cpfRegex, "«CPF_REDACTED»")
      .replace(cardRegex, "«CARD_REDACTED»")
      .replace(phoneRegex, "«PHONE_REDACTED»")
      // Add your new pattern
      .replace(/your_new_regex/g, "«YOUR_TYPE_REDACTED»")
  );
};
```

## CI/CD Secret Scanning

### Gitleaks Configuration

Create `.gitleaks.toml`:

```toml
[allowlist]
description = "Allowlist for gitleaks"
paths = [
    "test/**",
    "**/*.test.ts",
    "**/*.spec.ts"
]

[[rules]]
id = "generic-api-key"
description = "Generic API Key"
regex = '''(?i)(api[_-]?key|apikey|secret[_-]?key|private[_-]?key)['"]?\s*[:=]\s*['"]?[a-zA-Z0-9]{32,45}['"]?'''
tags = ["key", "API"]
```

### GitHub Actions Integration

```yaml
name: Security Scan
on: [push, pull_request]

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Local Testing

```bash
# Install gitleaks
brew install gitleaks

# Run scan
gitleaks detect --source . --verbose

# Run with custom config
gitleaks detect --source . --config .gitleaks.toml
```

## Monitoring & Alerting

### Prometheus Metrics

The system exports these metrics:

```typescript
// Secret leak counter
secret_leak_total{secret_type="runtime",severity="high"} 5
secret_leak_total{secret_type="ci",severity="medium"} 2
```

### Alerting Rules

```yaml
# prometheus/rules/secrets.yml
groups:
  - name: secret_leaks
    rules:
      - alert: SecretLeakDetected
        expr: secret_leak_total > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Secret leak detected"
          description: "{{ $value }} secrets detected in logs"
```

### Grafana Dashboard

Create dashboard panels for:

- Secret leak rate over time
- Secret types breakdown
- Security alert frequency
- Log volume by security status

## Best Practices

### 1. Regular Pattern Updates

- Review and update patterns monthly
- Monitor false positives/negatives
- Add patterns for new services used

### 2. Testing

```bash
# Run tests
npm run test:logs

# Run security scan
npm run test:secrets

# Check coverage
npm run test:logs -- --coverage
```

### 3. Environment Variables

```bash
# Required
NODE_ENV=production
SERVICE_NAME=solusix-landing
GIT_SHA=abc123def

# Optional
LOG_LEVEL=info
```

### 4. Log Review Process

1. Monitor `securityAlert: true` logs
2. Investigate redacted content
3. Update patterns if needed
4. Document findings

### 5. Incident Response

When secrets are detected:

1. **Immediate**: Check if real secrets were exposed
2. **Short-term**: Rotate any compromised credentials
3. **Long-term**: Review logging practices
4. **Prevention**: Update detection patterns

## Troubleshooting

### False Positives

```typescript
// If normal data is being redacted, add to allowlist
const ALLOWLIST_PATTERNS = [
  /safe_api_key/gi, // Allow specific safe patterns
  /test_data/gi, // Allow test data
];
```

### False Negatives

```typescript
// If secrets are not being detected, add patterns
const ADDITIONAL_PATTERNS = [/your_service_token/gi, /custom_secret_pattern/gi];
```

### Performance Issues

- Monitor log processing time
- Consider async processing for large objects
- Cache compiled regex patterns

## Compliance

### GDPR

- All PII is automatically redacted
- Logs can be exported for data subject requests
- Retention policies apply to logs

### SOC 2

- Secret detection is logged and monitored
- Access to logs is controlled
- Regular security reviews are conducted

### PCI DSS

- Card numbers are automatically redacted
- Logs are encrypted at rest
- Access is limited to authorized personnel
