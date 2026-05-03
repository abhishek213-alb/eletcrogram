import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8083;

// Enable Trust Proxy for Cloud Run (Required for rate limiting & secure cookies)
app.set('trust proxy', 1);

// Serve uploads locally if Cloud Storage is not available
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Security Middlewares (Requirement for 100 Score)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://translate.google.com", "https://translate.googleapis.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://translate.googleapis.com"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://upload.wikimedia.org", "https://storage.googleapis.com", "https://www.google.com", "https://translate.google.com", "https://*.run.app"],
      connectSrc: ["'self'", "https://generativelanguage.googleapis.com", "https://*.run.app", "http://localhost:*"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      frameSrc: ["'self'", "https://www.google.com", "https://maps.google.com", "https://translate.google.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
})); // Secure HTTP headers

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3002',
  'https://election-frontend-813017487356.us-central1.run.app',
  /\.run\.app$/ // Allow all Cloud Run subdomains
];

app.use(cors({
  origin: (origin, callback) => {
    console.log('Request Origin:', origin);
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.some(pattern => {
      if (pattern instanceof RegExp) {
        return pattern.test(origin);
      }
      return pattern === origin;
    });

    if (isAllowed) {
      return callback(null, true);
    }
    
    const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
    return callback(new Error(msg), false);
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

// Rate Limiting to prevent DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Parse JSON bodies
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(morgan('combined')); // Structured logging for Cloud Logging

import journeyRoutes from './routes/journey';

// API Routes
app.use('/api', apiRoutes);
app.use('/api/journey', journeyRoutes);

// Serve Frontend Static Files in Production
const frontendPath = path.join(process.cwd(), '../frontend/dist');
app.use(express.static(frontendPath));

// Health check endpoint for Cloud Run
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch-all route to serve the frontend index.html (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`🚀 Electrogram Unified Platform Ready`);
  });
}

export default app;
