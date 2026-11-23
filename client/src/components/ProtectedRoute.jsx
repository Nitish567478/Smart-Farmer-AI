import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-2xl shadow-sm border border-red-200 text-center">
        <h3 className="font-bold text-lg text-red-600 mb-2">Access Restricted</h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Your current account role (<strong>{user?.role}</strong>) does not have permission to view this section.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return <Outlet />;
}
