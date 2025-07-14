import {
  Logger,
  SecretScanner,
  PrivacySanitizer,
  TraceContextManager,
} from "../lib/logger";

// Mock Winston to capture log entries
const mockWinstonLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock("winston", () => ({
  createLogger: jest.fn(() => mockWinstonLogger),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    errors: jest.fn(),
    colorize: jest.fn(),
    simple: jest.fn(),
    json: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
}));

jest.mock("winston-daily-rotate-file", () => {
  return jest.fn();
});

jest.mock("prom-client", () => ({
  promClient: {
    Counter: jest.fn(() => ({
      inc: jest.fn(),
    })),
  },
}));

describe("Logging System Tests", () => {
  let logger: Logger;

  beforeEach(() => {
    jest.clearAllMocks();
    (process.env as any).NODE_ENV = "test";
    process.env.SERVICE_NAME = "test-service";
    process.env.GIT_SHA = "test-sha";
    logger = new Logger();
  });

  describe("test_logs_have_fields", () => {
    it("should include all required fields in log entries", () => {
      logger.info("Test message", { testData: "value" });

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(
        expect.objectContaining({
          timestamp: expect.any(String),
          level: "info",
          message: "Test message",
          traceId: expect.any(String),
          spanId: expect.any(String),
          serviceName: "test-service",
          env: "test",
          releaseVersion: "test-sha",
          securityAlert: false,
          testData: "value",
        }),
      );
    });

    it("should include file, line, and function in development mode", () => {
      (process.env as any).NODE_ENV = "development";
      logger = new Logger();

      logger.info("Test message");

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(
        expect.objectContaining({
          file: expect.any(String),
          line: expect.any(Number),
          function: expect.any(String),
        }),
      );
    });

    it("should include error stack when error is provided", () => {
      const error = new Error("Test error");
      logger.error("Test error message", {}, error);

      expect(mockWinstonLogger.error).toHaveBeenCalledWith(
        expect.objectContaining({
          errorStack: expect.any(String),
        }),
      );
    });
  });

  describe("test_secret_redaction", () => {
    it("should redact API keys and mark security alert", () => {
      const testData = {
        apiKey: "sk-test-1234567890abcdef",
        normalData: "safe data",
        nested: {
          secretKey: "pk-live-abcdefghijklmnop",
        },
      };

      logger.info("Test with secrets", testData);

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(
        expect.objectContaining({
          apiKey: "«REDACTED»",
          normalData: "safe data",
          nested: {
            secretKey: "«REDACTED»",
          },
          securityAlert: true,
        }),
      );
    });

    it("should redact various secret patterns", () => {
      const testData = {
        openaiKey: "sk-1234567890abcdef",
        awsKey: "AKIAIOSFODNN7EXAMPLE",
        jwtSecret: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        databaseUrl: "postgresql://user:password@localhost:5432/db",
        email: "test@example.com",
        password: "secretpassword123",
      };

      logger.info("Test various secrets", testData);

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(
        expect.objectContaining({
          openaiKey: "«REDACTED»",
          awsKey: "«REDACTED»",
          jwtSecret: "«REDACTED»",
          databaseUrl: "«REDACTED»",
          email: "«EMAIL_REDACTED»",
          password: "«REDACTED»",
          securityAlert: true,
        }),
      );
    });

    it("should not redact normal strings", () => {
      const testData = {
        normalString: "This is a normal string",
        number: 123,
        boolean: true,
        array: [1, 2, 3],
      };

      logger.info("Test normal data", testData);

      expect(mockWinstonLogger.info).toHaveBeenCalledWith(
        expect.objectContaining({
          normalString: "This is a normal string",
          number: 123,
          boolean: true,
          array: [1, 2, 3],
          securityAlert: false,
        }),
      );
    });
  });

  describe("SecretScanner", () => {
    it("should detect secrets in objects", () => {
      const obj = {
        apiKey: "sk-test-1234567890abcdef",
        normalData: "safe",
      };

      const result = SecretScanner.scanObject(obj);

      expect(result.hasSecrets).toBe(true);
      expect(result.redactedObj.apiKey).toBe("«REDACTED»");
      expect(result.redactedObj.normalData).toBe("safe");
    });

    it("should detect secrets in strings", () => {
      const text = "API key: sk-test-1234567890abcdef and normal text";
      const result = SecretScanner.scanString(text);

      expect(result.hasSecrets).toBe(true);
      expect(result.redactedText).toContain("«REDACTED»");
    });
  });

  describe("PrivacySanitizer", () => {
    it("should sanitize emails", () => {
      const data = {
        email: "user@example.com",
        name: "John Doe",
      };

      const sanitized = PrivacySanitizer.sanitize(data);

      expect(sanitized.email).toBe("«EMAIL_REDACTED»");
      expect(sanitized.name).toBe("John Doe");
    });

    it("should sanitize CPF", () => {
      const data = {
        cpf: "123.456.789-00",
        name: "John Doe",
      };

      const sanitized = PrivacySanitizer.sanitize(data);

      expect(sanitized.cpf).toBe("«CPF_REDACTED»");
      expect(sanitized.name).toBe("John Doe");
    });

    it("should sanitize credit cards", () => {
      const data = {
        card: "1234-5678-9012-3456",
        name: "John Doe",
      };

      const sanitized = PrivacySanitizer.sanitize(data);

      expect(sanitized.card).toBe("«CARD_REDACTED»");
      expect(sanitized.name).toBe("John Doe");
    });
  });

  describe("TraceContextManager", () => {
    it("should create and retrieve trace context", () => {
      const context = TraceContextManager.getTraceContext();

      expect(context.traceId).toBeDefined();
      expect(context.spanId).toBeDefined();
      expect(context.traceId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
      expect(context.spanId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      );
    });

    it("should set trace context", () => {
      const traceId = "test-trace-id";
      const spanId = "test-span-id";

      TraceContextManager.setTraceContext(traceId, spanId);
      const context = TraceContextManager.getTraceContext();

      expect(context.traceId).toBe(traceId);
      expect(context.spanId).toBe(spanId);
    });

    it("should create new spans", () => {
      const originalContext = TraceContextManager.getTraceContext();
      const newSpan = TraceContextManager.createSpan();

      expect(newSpan.traceId).toBe(originalContext.traceId);
      expect(newSpan.spanId).not.toBe(originalContext.spanId);
      expect(newSpan.parentSpanId).toBe(originalContext.spanId);
    });
  });

  describe("Logger methods", () => {
    it("should log debug only when LOG_LEVEL is debug", () => {
      process.env.LOG_LEVEL = "debug";
      logger = new Logger();

      logger.debug("Debug message");

      expect(mockWinstonLogger.debug).toHaveBeenCalled();
    });

    it("should not log debug when LOG_LEVEL is not debug", () => {
      process.env.LOG_LEVEL = "info";
      logger = new Logger();

      logger.debug("Debug message");

      expect(mockWinstonLogger.debug).not.toHaveBeenCalled();
    });

    it("should handle fatal errors and exit", () => {
      const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {
        throw new Error("process.exit called");
      });

      expect(() => {
        logger.fatal("Fatal error");
      }).toThrow("process.exit called");

      expect(mockWinstonLogger.error).toHaveBeenCalled();
      exitSpy.mockRestore();
    });
  });
});
