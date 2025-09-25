import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Enhanced logging middleware with better formatting
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      const timestamp = new Date().toISOString().substring(11, 19); // HH:mm:ss format
      const statusColor = res.statusCode >= 400 ? '🔴' : res.statusCode >= 300 ? '🟡' : '🟢';
      
      let logLine = `[${timestamp}] ${statusColor} ${req.method} ${path} ${res.statusCode} (${duration}ms)`;
      
      if (capturedJsonResponse) {
        const responsePreview = JSON.stringify(capturedJsonResponse).substring(0, 100);
        logLine += ` :: ${responsePreview}${responsePreview.length >= 100 ? '...' : ''}`;
      }

      if (logLine.length > 120) {
        logLine = logLine.slice(0, 119) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    const server = await registerRoutes(app);

    // Enhanced error handling middleware
    app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      // Log errors for debugging
      if (status >= 500) {
        log(`❌ Server Error: ${req.method} ${req.path} - ${message}`);
        console.error(err.stack);
      }

      res.status(status).json({ 
        message,
        ...(app.get("env") === "development" && { stack: err.stack })
      });
    });

    // Setup Vite for development or serve static files for production
    if (app.get("env") === "development") {
      log("🔧 Setting up Vite development server...");
      await setupVite(app, server);
    } else {
      log("📦 Serving static files for production...");
      serveStatic(app);
    }

    // Server configuration with enhanced logging
    const port = parseInt(process.env.PORT || '5000', 10);
    const host = "0.0.0.0";
    
    server.listen({
      port,
      host,
      reusePort: true,
    }, () => {
      log(`🚀 Server running on http://${host}:${port}`);
      log(`📊 Environment: ${app.get("env") || "production"}`);
      log(`🎯 API endpoints available at http://${host}:${port}/api`);
    });

  } catch (error) {
    log("❌ Failed to start server:");
    console.error(error);
    process.exit(1);
  }
})();