import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';

import diagnosisRoutes from './routes/diagnosisRoutes.js';
import cropsRoutes from './routes/cropsRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5645;

// Connect Database (MongoDB with resilient auto-fallback to In-Memory Store)
connectDB();

// Middlewares
app.use(cors({
  origin: '*', // Allow all during dev (including port 3231)
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'CROPSHIELD-AI Backend API',
    version: '1.0.0',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Mount modular API Routes
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/diagnoses', diagnosisRoutes);
app.use('/api/history', diagnosisRoutes);
app.use('/api/crops', cropsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CROPSHIELD-AI Server active and running on http://localhost:${PORT}`);
});
