import express, { Request, Response } from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';
import { isSupabaseConfigured } from './config/supabase.js';

export const app = express();

// Global Middleware
app.use(cors({ origin: ENV.CORS_ORIGIN }));
app.use(express.json());

// Request Logger
app.use((req: Request, _res: Response, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root & Health Endpoints
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    service: 'nova-store-backend',
    supabaseConnected: isSupabaseConfigured(),
  });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'Nova Store / Business Analytics API',
    version: '1.0.0',
    documentation: '/api',
    health: '/health',
  });
});

// Mount API Routes
app.use('/api', apiRouter);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Central Error Handler
app.use(errorHandler);

// Start server if not imported by test suite
if (process.env.NODE_ENV !== 'test') {
  app.listen(ENV.PORT, () => {
    console.log(`
==================================================
  🚀 Nova Store Backend API Server Running!
  ------------------------------------------------
  • Local URL:      http://localhost:${ENV.PORT}
  • Health Check:   http://localhost:${ENV.PORT}/health
  • API Base:       http://localhost:${ENV.PORT}/api
  • Environment:    ${ENV.NODE_ENV}
  • Supabase State: ${isSupabaseConfigured() ? 'Connected' : 'Offline / Dev Fallback Mode'}
==================================================
    `);
  });
}
