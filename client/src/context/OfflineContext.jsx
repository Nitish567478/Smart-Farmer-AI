import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { offlineStorage } from '../services/offlineStorage';

const OfflineContext = createContext(null);

export function OfflineProvider({ children }) {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [justReconnected, setJustReconnected] = useState(false);
  const [lastSynced, setLastSynced] = useState(offlineStorage.getLastSyncedTime());
  const [syncStatus, setSyncStatus] = useState('idle'); 
  const [pendingQueueCount, setPendingQueueCount] = useState(
    offlineStorage.getOfflineQueue().length
  );

  useEffect(() => {
    offlineStorage.initializeCache();
  }, []);

  const syncNow = useCallback(async () => {
    if (!navigator.onLine) {
      setSyncStatus('idle');
      return;
    }

    setSyncStatus('syncing');
    try {
      const queue = offlineStorage.getOfflineQueue();
      if (queue.length > 0) {
        for (const item of queue) {
          try {
            if (item.actionType === 'community_story') {
              const existingRaw = localStorage.getItem('cp_farmer_community_stories');
              const existing = existingRaw ? JSON.parse(existingRaw) : [];
              existing.unshift({ ...item.payload, synced: true });
              localStorage.setItem('cp_farmer_community_stories', JSON.stringify(existing));
            }
          } catch (e) {
            console.warn('Queue item sync error:', e);
          }
        }
        offlineStorage.clearOfflineQueue();
        setPendingQueueCount(0);
      }

      const primaryCrops = ['Wheat', 'Rice / Paddy', 'Mustard', 'Cotton', 'Soybean', 'Potato'];
      for (const crop of primaryCrops) {
        try {
          const res = await api.get('/markets/prices', { params: { commodity: crop } });
          if (res.data?.success && res.data.records) {
            offlineStorage.cacheMandiRates(crop, res.data.records);
          }
        } catch (e) {
        }
      }

      const now = new Date().toISOString();
      localStorage.setItem('cp_offline_last_synced', now);
      setLastSynced(now);
      setSyncStatus('synced');

      setTimeout(() => {
        setSyncStatus('idle');
      }, 3500);
    } catch (err) {
      console.warn('Sync failed:', err);
      setSyncStatus('idle');
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setJustReconnected(true);
      syncNow();

      const timer = setTimeout(() => {
        setJustReconnected(false);
      }, 5000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setJustReconnected(false);
      setSyncStatus('idle');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (navigator.onLine) {
      const interval = setInterval(() => {
        if (navigator.onLine) syncNow();
      }, 10 * 60 * 1000);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        clearInterval(interval);
      };
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncNow]);

  const queueAction = (actionType, payload) => {
    const newCount = offlineStorage.queueOfflineAction(actionType, payload);
    setPendingQueueCount(newCount);
  };

  return (
    <OfflineContext.Provider
      value={{
        isOnline,
        justReconnected,
        lastSynced,
        syncStatus,
        pendingQueueCount,
        syncNow,
        queueAction,
        getCachedMandiRates: offlineStorage.getCachedMandiRates,
        cacheMandiRates: offlineStorage.cacheMandiRates,
        searchCropGuidanceOffline: offlineStorage.searchCropGuidanceOffline
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
}

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
}
