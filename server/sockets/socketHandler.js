const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { MANDI_BASE_DATA } = require('../services/markets/mandiService');

let liveTickerInterval = null;

const setupSockets = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.query?.token;
      if (!token) {
        socket.user = null;
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'climate_pulse_super_secret_jwt_key_2026_change_in_production');
      const user = await User.findById(decoded.id).select('-passwordHash');
      if (user) {
        socket.user = user;
      }
      next();
    } catch (err) {
      socket.user = null;
      next();
    }
  });

  io.on('connection', (socket) => {
    socket.join('public_alerts');

    if (socket.user) {
      socket.join(`user:${socket.user._id}`);
      socket.join(`role:${socket.user.role}`);
      console.log(`[Socket.IO] Authenticated user connected: ${socket.user.name} (${socket.user.role})`);
    } else {
      console.log('[Socket.IO] Anonymous client connected to public updates.');
    }

    socket.on('disconnect', () => {
    });
  });

  if (!liveTickerInterval) {
    let tickIndex = 0;
    liveTickerInterval = setInterval(() => {
      try {
        const item = MANDI_BASE_DATA[tickIndex % MANDI_BASE_DATA.length];
        tickIndex++;

        const jitter = Math.floor(Math.random() * 15) - 7;
        const currentModal = item.modalPrice + jitter;

        const liveTick = {
          type: 'mandi_tick',
          commodity: item.commodity,
          market: item.market,
          state: item.state,
          modalPrice: currentModal,
          unit: 'Rs/Quintal',
          change: jitter >= 0 ? `+₹${jitter}` : `-₹${Math.abs(jitter)}`,
          trend: jitter >= 0 ? 'up' : 'down',
          timestamp: new Date().toISOString()
        };

        io.to('public_alerts').emit('mandi:tick', liveTick);

        if (tickIndex % 2 === 0) {
          const tempJitter = (Math.random() * 0.4 - 0.2).toFixed(1);
          io.to('public_alerts').emit('sensor:telemetry', {
            type: 'sensor_telemetry',
            temperatureJitter: parseFloat(tempJitter),
            timestamp: new Date().toISOString()
          });
        }
      } catch (e) {
      }
    }, 7000);
  }
};

module.exports = setupSockets;
