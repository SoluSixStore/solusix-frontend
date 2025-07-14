import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { v4 as uuidv4 } from "uuid";
let secretLeakCounter: { inc: (...args: any[]) => void } = { inc: () => {} };
try {
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'test') {
    // Only require prom-client in Node.js, not in browser or test
    const { Counter } = require('prom-client');
    secretLeakCounter = new Counter({
      name: "secret_leak_total",
      help: "Total number of secret leaks detected",
      labelNames: ["secret_type", "severity"],
    });
  }
} catch (e) {
  // fallback: do nothing
}

// Secret patterns for runtime detection
const SECRET_PATTERNS = [
  // API Keys
  /(sk-|pk-)[a-zA-Z0-9-]{10,}/gi,
  /(api_key|api_secret|access_token|secret_key)\s*[:=]\s*['"][^'"]+['"]/gi,
  // Cloud providers
  /(AWS_ACCESS_KEY_ID|AWS_SECRET_ACCESS_KEY|GOOGLE_APPLICATION_CREDENTIALS)\s*[:=]\s*['"][^'"]+['"]/gi,
  /AKIA[0-9A-Z]{16}/g,
  /(AZURE_CLIENT_ID|AZURE_CLIENT_SECRET|AZURE_TENANT_ID)\s*[:=]\s*['"][^'"]+['"]/gi,
  // Database
  /(DATABASE_URL|MONGODB_URI|REDIS_URL)\s*[:=]\s*['"][^'"]+['"]/gi,
  /postgres(?:ql)?:\/\/[\w\d]+:[^@]+@[^:]+:\d+\/[\w\d]+/g,
  /mongodb:\/\/[\w\d]+:[^@]+@[^:]+:\d+\/[\w\d]+/g,
  // JWT
  /(JWT_SECRET|JWT_PRIVATE_KEY)\s*[:=]\s*['"][^'"]+['"]/gi,
  /eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g,
  // Email/Password
  /(email|password)\s*[:=]\s*['"][^'"]+['"]/gi,
  /password\s*[:=]\s*['"][^'"]+['"]/gi,
  // Common patterns
  /(token|key|secret|password)\s*[:=]\s*['"][^'"]{10,}['"]/gi,
];

// Trace context interface
export interface TraceContext {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
}

// Log entry interface
export interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  traceId: string;
  spanId: string;
  file?: string;
  line?: number;
  function?: string;
  serviceName: string;
  env: string;
  releaseVersion: string;
  userContext?: any;
  securityAlert: boolean;
  errorStack?: string;
  [key: string]: any;
}

// Secret scanner
export class SecretScanner {
  static scanObject(
    obj: any,
    path: string = "",
  ): { hasSecrets: boolean; redactedObj: any } {
    let hasSecrets = false;
    const redactedObj = { ...obj };

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof value === "string") {
        const isSecret = SECRET_PATTERNS.some((pattern) => value.match(pattern));
        if (isSecret) {
          redactedObj[key] = "«REDACTED»";
          hasSecrets = true;
          secretLeakCounter.inc({ secret_type: "runtime", severity: "high" });
        }
      } else if (typeof value === "object" && value !== null) {
        const { hasSecrets: childHasSecrets, redactedObj: childRedacted } =
          this.scanObject(value, currentPath);
        if (childHasSecrets) {
          redactedObj[key] = childRedacted;
          hasSecrets = true;
        }
      }
    }

    return { hasSecrets, redactedObj };
  }

  static scanString(text: string): {
    hasSecrets: boolean;
    redactedText: string;
  } {
    let redactedText = text;
    let hasSecrets = false;

    SECRET_PATTERNS.forEach((pattern) => {
      if (text.match(pattern)) {
        redactedText = redactedText.replace(pattern, "«REDACTED»");
        hasSecrets = true;
        secretLeakCounter.inc({ secret_type: "runtime", severity: "high" });
      }
    });

    return { hasSecrets, redactedText };
  }
}

// Privacy sanitizer
export class PrivacySanitizer {
  static sanitize(obj: any): any {
    const sanitized = { ...obj };

    // Email patterns
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

    // CPF pattern (Brazilian)
    const cpfRegex = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;

    // Credit card pattern
    const cardRegex = /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g;

    // Phone pattern
    const phoneRegex = /\b\(\d{2}\)\s?\d{4,5}-?\d{4}\b/g;

    const sanitizeString = (str: string): string => {
      return str
        .replace(emailRegex, "«EMAIL_REDACTED»")
        .replace(cpfRegex, "«CPF_REDACTED»")
        .replace(cardRegex, "«CARD_REDACTED»")
        .replace(phoneRegex, "«PHONE_REDACTED»");
    };

    const sanitizeObject = (obj: any): any => {
      if (typeof obj === "string") {
        return sanitizeString(obj);
      } else if (typeof obj === "object" && obj !== null) {
        const sanitized: any = Array.isArray(obj) ? [] : {};
        for (const [key, value] of Object.entries(obj)) {
          sanitized[key] = sanitizeObject(value);
        }
        return sanitized;
      }
      return obj;
    };

    return sanitizeObject(sanitized);
  }
}

// Trace context manager
export class TraceContextManager {
  private static context = new Map<string, TraceContext>();

  static getTraceContext(): TraceContext {
    const threadId = this.getThreadId();
    let context = this.context.get(threadId);

    if (!context) {
      context = {
        traceId: uuidv4(),
        spanId: uuidv4(),
      };
      this.context.set(threadId, context);
    }

    return context;
  }

  static setTraceContext(
    traceId: string,
    spanId: string,
    parentSpanId?: string,
  ): void {
    const threadId = this.getThreadId();
    this.context.set(threadId, { traceId, spanId, parentSpanId });
  }

  static createSpan(): TraceContext {
    const current = this.getTraceContext();
    const newSpanId = uuidv4();

    this.setTraceContext(current.traceId, newSpanId, current.spanId);

    return {
      traceId: current.traceId,
      spanId: newSpanId,
      parentSpanId: current.spanId,
    };
  }

  private static getThreadId(): string {
    // In Node.js, we can use process.pid for simple thread identification
    // In a real distributed system, you'd use async_hooks or similar
    return process.pid.toString();
  }
}

// Main logger class
export class Logger {
  private winstonLogger: winston.Logger;
  private serviceName: string;
  private env: string;
  private releaseVersion: string;

  constructor() {
    this.serviceName = process.env.SERVICE_NAME || "solusix-landing";
    this.env = process.env.NODE_ENV || "development";
    this.releaseVersion = process.env.GIT_SHA || "unknown";

    // Configure Winston
    const transports: winston.transport[] = [];

    // Console transport for development
    if (this.env === "development") {
      transports.push(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      );
    }

    // File transport for production
    if (this.env === "production") {
      transports.push(
        new DailyRotateFile({
          filename: "logs/application-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxSize: "20m",
          maxFiles: "14d",
          format: winston.format.json(),
        }),
      );

      // Also log to STDOUT in JSON format
      transports.push(
        new winston.transports.Console({
          format: winston.format.json(),
        }),
      );
    }

    this.winstonLogger = winston.createLogger({
      level: process.env.LOG_LEVEL || "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports,
    });

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      this.error("Uncaught Exception", {
        error: error.message,
        stack: error.stack,
      });
      process.exit(1);
    });

    process.on("unhandledRejection", (reason, promise) => {
      this.error("Unhandled Rejection", { reason, promise });
    });
  }

  private createLogEntry(
    level: string,
    message: string,
    meta: any = {},
    error?: Error,
  ): LogEntry {
    const traceContext = TraceContextManager.getTraceContext();
    const { hasSecrets, redactedObj } = SecretScanner.scanObject(meta);
    const sanitizedMeta = PrivacySanitizer.sanitize(redactedObj);

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      traceId: traceContext.traceId,
      spanId: traceContext.spanId,
      serviceName: this.serviceName,
      env: this.env,
      releaseVersion: this.releaseVersion,
      securityAlert: hasSecrets,
      ...sanitizedMeta,
    };

    // Add stack trace for errors
    if (error) {
      entry.errorStack = error.stack;
    }

    // Add call site information in development
    if (this.env === "development") {
      const stack = new Error().stack;
      if (stack) {
        const lines = stack.split("\n");
        const callerLine = lines[3]; // Skip Error constructor and logger calls
        const match = callerLine.match(/at\s+(.+?)\s+\((.+):(\d+):(\d+)\)/);
        if (match) {
          entry.function = match[1];
          entry.file = match[2];
          entry.line = parseInt(match[3]);
        }
      }
    }

    return entry;
  }

  debug(message: string, meta: any = {}): void {
    if (process.env.LOG_LEVEL === "debug") {
      const entry = this.createLogEntry("debug", message, meta);
      this.winstonLogger.debug(entry);
    }
  }

  info(message: string, meta: any = {}): void {
    const entry = this.createLogEntry("info", message, meta);
    this.winstonLogger.info(entry);
  }

  warn(message: string, meta: any = {}): void {
    const entry = this.createLogEntry("warn", message, meta);
    this.winstonLogger.warn(entry);
  }

  error(message: string, meta: any = {}, error?: Error): void {
    const entry = this.createLogEntry("error", message, meta, error);
    this.winstonLogger.error(entry);
  }

  fatal(message: string, meta: any = {}, error?: Error): void {
    const entry = this.createLogEntry("fatal", message, meta, error);
    this.winstonLogger.error(entry);
    process.exit(1);
  }

  // HTTP request logging
  logRequest(req: any, res: any, next?: any): void {
    const startTime = Date.now();

    res.on("finish", () => {
      const duration = Date.now() - startTime;
      this.info("HTTP Request", {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration,
        userAgent: req.get("User-Agent"),
        ip: req.ip || req.connection.remoteAddress,
      });
    });

    if (next) next();
  }

  // Trace propagation helpers
  withTrace(traceId: string, spanId: string, fn: () => void): void {
    TraceContextManager.setTraceContext(traceId, spanId);
    fn();
  }

  withSpan(fn: (spanId: string) => void): void {
    const span = TraceContextManager.createSpan();
    fn(span.spanId);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for Next.js API routes
export const getLogger = () => logger;
