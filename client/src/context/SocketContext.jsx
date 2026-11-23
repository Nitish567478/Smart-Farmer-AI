import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [liveEvents, setLiveEvents] = useState([]);
  const [latestAlert, setLatestAlert] = useState(null);
  const [latestMandiTick, setLatestMandiTick] = useState(null);
  const [telemetryJitter, setTelemetryJitter] = useState(0);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_SOCKET_URL || (import.meta.env.DEV ? 'http://127.0.0.1:5000' : 'https://smart-farmer-ai-drxh.onrender.com');
    const socketInstance = io(socketUrl, {
      auth: { token },
      query: { token },
      transports: ['websocket', 'polling']
    });

    socketInstance.on('connect', () => {
      console.log('[Socket] Connected to real-time server with id:', socketInstance.id);
    });

    socketInstance.on('mandi:tick', (tick) => {
      setLatestMandiTick(tick);
      setLiveEvents((prev) => [
        {
          type: 'mandi',
          title: `Mandi Tick: ${tick.commodity} at ${tick.market} (${tick.state}) ₹${tick.modalPrice}/Qtl [${tick.change}]`,
          data: tick,
          time: new Date()
        },
        ...prev.slice(0, 19)
      ]);
    });

    socketInstance.on('sensor:telemetry', (data) => {
      setTelemetryJitter(data.temperatureJitter || 0);
    });

    socketInstance.on('climate:alert', (alert) => {
      setLatestAlert(alert);
      setLiveEvents((prev) => [
        { type: 'alert', title: `New Climate Alert: ${alert.title}`, data: alert, time: new Date() },
        ...prev.slice(0, 19)
      ]);
    });

    socketInstance.on('emergency:new', (emergency) => {
      setLiveEvents((prev) => [
        { type: 'emergency', title: `New Emergency Reported: ${emergency.category}`, data: emergency, time: new Date() },
        ...prev.slice(0, 19)
      ]);
    });

    socketInstance.on('emergency:verified', (emergency) => {
      setLiveEvents((prev) => [
        { type: 'verified_emergency', title: `Emergency Verified (${emergency.severity})`, data: emergency, time: new Date() },
        ...prev.slice(0, 19)
      ]);
    });

    socketInstance.on('resource:threshold_alert', (resAlert) => {
      setLiveEvents((prev) => [
        { type: 'resource_alert', title: resAlert.title, data: resAlert, time: new Date() },
        ...prev.slice(0, 19)
      ]);
    });

    socketInstance.on('notification:new', (notification) => {
      setLiveEvents((prev) => [
        { type: 'notification', title: notification.title, data: notification, time: new Date() },
        ...prev.slice(0, 19)
      ]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  const clearAlert = () => setLatestAlert(null);

  return (
    <SocketContext.Provider
      value={{
        socket,
        liveEvents,
        latestAlert,
        clearAlert,
        latestMandiTick,
        telemetryJitter
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
