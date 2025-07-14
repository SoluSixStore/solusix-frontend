# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2024-01-15

### Added

- **Logging, Tracing & Secret Guard v1.2**
  - Structured logging with Winston for Next.js
  - Automatic trace ID and span ID generation (UUID v4)
  - HTTP trace propagation via X-Trace-Id and X-Span-Id headers
  - Runtime secret detection with regex patterns
  - Privacy protection for emails, CPF, credit cards, and phone numbers
  - Prometheus metrics for secret leak monitoring
  - File rotation for production logs (20MB max, 14 days retention)
  - Uncaught exception and unhandled rejection handling
  - Development console output with call site information
  - Production JSON output to files and STDOUT

### Security

- **Secret Detection Patterns**
  - OpenAI API keys (`sk-*`, `pk-*`)
  - AWS credentials (`AKIA*`, 40-char secrets)
  - Google Cloud credentials
  - Azure credentials
  - Database URLs (PostgreSQL, MongoDB, Redis)
  - JWT secrets and tokens
  - Generic API keys and secrets
  - Email/password combinations

- **Privacy Protection**
  - Email address redaction
  - Brazilian CPF redaction
  - Credit card number redaction
  - Phone number redaction
  - Automatic PII detection and masking

- **CI/CD Security**
  - Gitleaks integration for code scanning
  - GitHub Actions security workflow
  - Automated secret detection in CI
  - Weekly security scans
  - Dependency vulnerability scanning

### Testing

- Comprehensive test suite for logging system
- Secret redaction validation tests
- Trace context management tests
- Privacy sanitization tests
- Jest configuration with coverage reporting

### Documentation

- `README.snippets.md`: Usage examples and log formats
- `SECURITY_GUIDE.md`: Regex patterns and extension guide
- `.gitleaks.toml`: CI secret detection configuration
- GitHub Actions workflow for automated security scanning

### Environment Variables

- `NODE_ENV`: Environment (development/production)
- `LOG_LEVEL`: Logging level (debug/info/warn/error/fatal)
- `SERVICE_NAME`: Service identifier
- `GIT_SHA`: Release version for tracing

### Monitoring

- Prometheus metrics: `secret_leak_total`
- Structured log fields for observability
- Security alert flagging
- Trace correlation across services

## [1.1.0] - 2024-01-10

### Added

- Initial project setup
- Next.js 14 configuration
- TypeScript support
- Tailwind CSS styling
- Basic component structure

### Changed

- Updated dependencies to latest versions
- Improved build configuration

## [1.0.0] - 2024-01-01

### Added

- Initial release
- Landing page for SoluSix
- Product catalog
- Contact forms
- Responsive design
