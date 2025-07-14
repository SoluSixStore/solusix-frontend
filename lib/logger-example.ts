// Example integration of the logging system into existing components
// This file demonstrates how to use the logger in your Next.js application

import { logger } from "./logger";

// Example: API route with logging
export async function exampleApiHandler(req: any, res: any) {
  try {
    logger.info("API request received", {
      method: req.method,
      url: req.url,
      userAgent: req.headers["user-agent"],
    });

    // Simulate some work
    const result = await processRequest(req.body);

    logger.info("API request completed", {
      statusCode: 200,
      processingTime: Date.now() - req.startTime,
    });

    res.status(200).json(result);
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error(
      "API request failed",
      {
        method: req.method,
        url: req.url,
        error: err.message,
      },
      err,
    );

    res.status(500).json({ error: "Internal server error" });
  }
}

// Example: Component with user interaction logging
export function exampleComponent() {
  const handleClick = () => {
    logger.info("User interaction", {
      action: "button_click",
      component: "ExampleComponent",
      userId: "user123", // This will be redacted if it's an email
    });
  };

  const handleFormSubmit = (formData: any) => {
    // The logger will automatically redact any secrets in formData
    logger.info("Form submitted", {
      formType: "contact",
      fields: Object.keys(formData),
      data: formData, // Secrets will be automatically redacted
    });
  };

  return {
    handleClick,
    handleFormSubmit,
  };
}

// Example: Database operation with tracing
export async function exampleDatabaseOperation(userId: string) {
  logger.withSpan((spanId) => {
    logger.info("Database operation started", {
      operation: "user.fetch",
      userId,
      spanId,
    });
  });

  try {
    // Simulate database call
    const user = await fetchUserFromDatabase(userId);

    logger.info("Database operation completed", {
      operation: "user.fetch",
      userId,
      result: "success",
    });

    return user;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error(
      "Database operation failed",
      {
        operation: "user.fetch",
        userId,
      },
      err,
    );

    throw err;
  }
}

// Example: External API call with secret protection
export async function exampleExternalApiCall(apiKey: string) {
  // The logger will automatically redact the apiKey
  logger.info("External API call", {
    service: "payment",
    apiKey, // This will be redacted as «REDACTED»
    endpoint: "/v1/charges",
  });

  try {
    const response = await fetch("https://api.stripe.com/v1/charges", {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    logger.info("External API response", {
      service: "payment",
      statusCode: response.status,
      success: response.ok,
    });

    return response.json();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    logger.error(
      "External API call failed",
      {
        service: "payment",
        error: err.message,
      },
      err,
    );

    throw err;
  }
}

// Example: Privacy-sensitive data handling
export function examplePrivacyHandling(userData: any) {
  // The PrivacySanitizer will automatically redact PII
  const sanitizedData = {
    name: userData.name,
    email: userData.email, // Will be redacted as «EMAIL_REDACTED»
    cpf: userData.cpf, // Will be redacted as «CPF_REDACTED»
    card: userData.card, // Will be redacted as «CARD_REDACTED»
  };

  logger.info("User data processed", {
    dataType: "user_profile",
    hasPII: true,
    sanitizedData, // All PII will be automatically redacted
  });
}

// Example: Error boundary with logging
export function exampleErrorBoundary(error: Error, errorInfo: any) {
  logger.error(
    "React error boundary caught error",
    {
      component: errorInfo.componentStack,
      error: error.message,
      stack: error.stack,
    },
    error,
  );
}

// Example: Performance monitoring
export function examplePerformanceMonitoring(operation: string) {
  const startTime = Date.now();

  return {
    end: () => {
      const duration = Date.now() - startTime;
      logger.info("Performance measurement", {
        operation,
        duration,
        unit: "ms",
      });
    },
  };
}

// Helper functions (simulated)
async function processRequest(body: any) {
  return { success: true, data: body };
}

async function fetchUserFromDatabase(userId: string) {
  return { id: userId, name: "John Doe" };
}
