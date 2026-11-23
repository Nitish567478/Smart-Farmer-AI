import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { useLanguage } from '../context/LanguageContext';
import OfflineIndicator from './OfflineIndicator';
import api from '../services/api';
import {
  Bell,
  Menu,
  X,
  LogOut,
  User,
  Shield,
  Activity,
  CheckCircle,
  AlertTriangle,
  Languages,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

export default function Navbar({ toggleSidebar, isSidebarOpen }) {
  const { user, logout, isAuthenticated } = useAuth();
  const { liveEvents } = useSocket();
  const { currentLang, setLanguage, t, lt, languages } = useLanguage();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated, liveEvents]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.data?.success) {
        setNotifications(res.data.notifications || []);
        setUnreadCount(res.data.unreadCount || 0);
      }
    } catch (err) {
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadgeStyle = (role) => {
    return 'bg-emerald-50 text-emerald-800 border-emerald-200';
  };

  const getRoleDisplayName = (role) => {
    return t(`role_${role}_badge`) || role?.replace('_', ' ');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] px-2.5 sm:px-6 py-2 sm:py-3 w-full">
      <div className="flex items-center justify-between gap-1.5 sm:gap-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
          <button
            onClick={toggleSidebar}
            className="p-1.5 sm:p-2 rounded-xl text-[#172B25] hover:bg-slate-100 focus:outline-none transition border border-slate-200/80 shadow-2xs flex items-center justify-center cursor-pointer shrink-0"
            title={isSidebarOpen ? lt('साइडबार छुपाएं', 'Hide Sidebar', 'ਸਾਈਡਬਾਰ ਛੁਪਾਓ') : lt('साइडबार दिखाएं', 'Show Sidebar', 'ਸਾਈਡਬਾਰ ਵਿਖਾਓ')}
            aria-label="Toggle Navigation"
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4 sm:w-5 sm:h-5 text-[#168A70]" /> : <PanelLeftOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#168A70]" />}
          </button>

          <Link to="/" className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#123B35] flex items-center justify-center text-white shadow-sm shrink-0">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs sm:text-base text-[#172B25] tracking-tight leading-none block truncate">
                Climate<span className="text-[#168A70]">Pulse</span> AI
              </span>
              <span className="hidden md:block text-[10px] text-[#64748B] font-medium tracking-wider uppercase truncate">
                {lt('पूर्वानुमान • सुरक्षा • राहत', 'Predict • Protect • Save', 'ਅਨੁਮਾਨ • ਸੁਰੱਖਿਆ • ਬੱਚਤ')}
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-[#F7FAF8] hover:bg-slate-100 px-1.5 sm:px-2.5 py-1 rounded-xl border border-[#E2E8F0] transition">
            <Languages className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#168A70] shrink-0" />
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-[10px] sm:text-xs font-black text-[#172B25] focus:outline-none cursor-pointer max-w-[48px] sm:max-w-none"
              title={t('select_language')}
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.label}
                </option>
              ))}
            </select>
          </div>

          <OfflineIndicator compact />

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-200 text-[11px] font-semibold text-[#16A34A]">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span>{t('live_stream')}</span>
          </div>

          {isAuthenticated ? (
            <>
              <span
                className={`hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${getRoleBadgeStyle(
                  user?.role
                )}`}
              >
                <Shield className="w-3 h-3 mr-1" />
                {getRoleDisplayName(user?.role)}
              </span>

              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => {
                    setShowNotifications((prev) => !prev);
                    setShowProfileMenu(false);
                  }}
                  className="relative p-2 rounded-xl text-[#64748B] hover:bg-slate-100 hover:text-[#172B25] transition cursor-pointer"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full ring-2 ring-white animate-pulse" />
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] z-50 overflow-hidden">
                    <div className="p-3 border-b border-[#E2E8F0] flex items-center justify-between bg-slate-50/80">
                      <span className="font-bold text-xs text-[#172B25]">{t('notifications')}</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-[11px] text-[#168A70] hover:underline font-semibold cursor-pointer"
                        >
                          {t('mark_all_read')}
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-[#E2E8F0]">
                      {notifications.length === 0 ? (
                        <div className="p-5 text-center text-xs text-[#64748B]">
                          <Bell className="w-6 h-6 mx-auto mb-1.5 text-slate-300" />
                          {t('no_notifications')}
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n._id || n.id}
                            className={`p-3 text-xs space-y-1 transition hover:bg-slate-50 ${
                              n.isRead ? 'bg-white' : 'bg-emerald-50/50'
                            }`}
                          >
                            <p className="font-bold text-[#172B25]">{n.title}</p>
                            <p className="text-[#64748B] text-[11px] leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setShowProfileMenu((prev) => !prev);
                    setShowNotifications(false);
                  }}
                  className="w-8 h-8 rounded-xl bg-[#123B35] text-white font-bold text-xs flex items-center justify-center hover:opacity-90 transition shadow-sm cursor-pointer"
                  title={user?.name || 'User Profile'}
                >
                  {user?.name ? user.name[0].toUpperCase() : 'U'}
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-[#E2E8F0] z-50 overflow-hidden py-1">
                    <div className="px-4 py-2.5 border-b border-[#E2E8F0] bg-slate-50/80">
                      <p className="font-bold text-xs text-[#172B25] truncate">{user?.name}</p>
                      <p className="text-[11px] text-[#64748B] truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-[#172B25] hover:bg-slate-50 transition font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-[#168A70]" />
                      <span>{t('nav_profile')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 transition text-left cursor-pointer border-t border-[#E2E8F0]/60 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-500" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                to="/login"
                className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-[#172B25] hover:bg-slate-100 transition whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#123B35] hover:bg-[#168A70] text-white shadow-sm transition whitespace-nowrap"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
