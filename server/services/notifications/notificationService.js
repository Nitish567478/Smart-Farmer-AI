const Notification = require('../../models/Notification');

let ioInstance = null;

const setSocketIO = (io) => {
  ioInstance = io;
};

const sendNotification = async ({ userId, title, message, type = 'system', referenceId = null }) => {
  try {
    const notification = await Notification.create({
      userId,
      title,
      message,
      type,
      referenceId
    });

    if (ioInstance) {
      ioInstance.to(`user:${userId}`).emit('notification:new', notification);
    }

    return notification;
  } catch (error) {
    console.error('[Notification Service Error]', error.message);
  }
};

const broadcastToRole = (role, event, data) => {
  if (ioInstance) {
    ioInstance.to(`role:${role}`).emit(event, data);
  }
};

const broadcastPublic = (event, data) => {
  if (ioInstance) {
    ioInstance.emit(event, data);
  }
};

module.exports = {
  setSocketIO,
  sendNotification,
  broadcastToRole,
  broadcastPublic
};
