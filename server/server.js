const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config(); 

const { connectDB } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');
const setupSockets = require('./sockets/socketHandler');
const { setSocketIO } = require('./services/notifications/notificationService');

const authRoutes = require('./routes/authRoutes');
const locationRoutes = require('./routes/locationRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const marketRoutes = require('./routes/marketRoutes');
const climateRoutes = require('./routes/climateRoutes');
const agricultureRoutes = require('./routes/agricultureRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const reliefRoutes = require('./routes/reliefRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const server = http.createServer(app);

const clientUrl = process.env.CLIENT_URL || 'https://smart-farmer-ai-drxh.onrender.com';
const isDev = process.env.NODE_ENV !== 'production';
const allowedOrigins = [
  clientUrl,
  'https://smart-farmer-ai-drxh.onrender.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5174',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

const corsOrigin = (origin, callback) => {
  if (!origin || isDev) return callback(null, true);
  if (
    allowedOrigins.includes(origin) ||
    origin.endsWith('.onrender.com') ||
    origin.endsWith('.vercel.app') ||
    origin.includes('localhost')
  ) {
    return callback(null, true);
  }
  return callback(null, true);
};

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true
  }
});

setupSockets(io);
setSocketIO(io);

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', generalLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/markets', marketRoutes);
app.use('/api/climate', climateRoutes);
app.use('/api', agricultureRoutes); 
app.use('/api/resources', resourceRoutes);
app.use('/api/emergencies', emergencyRoutes);
app.use('/api', reliefRoutes); 
app.use('/api', dashboardRoutes); 
app.use('/api/notifications', notificationRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Climate Pulse AI Backend'
  });
});

app.use(errorHandler);

const fs = require('fs');
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads') || req.path.startsWith('/socket.io')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

process.on('uncaughtException', (err) => {
  console.error('[Server Guard] Caught Unhandled Exception:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.warn('[Server Guard] Caught Unhandled Rejection:', reason?.message || reason);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`[Server] Climate Pulse AI server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
};

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[Server Error] Port ${PORT} is in use. Exiting cleanly to allow supervisor/retry.`);
    process.exit(1);
  } else {
    console.error('[Server Socket Error]:', err.message);
  }
});

if (require.main === module) {
  startServer();
}

module.exports = { app, server, startServer };
