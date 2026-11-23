import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainDashboard from './pages/MainDashboard';
import AgricultureDashboard from './pages/AgricultureDashboard';
import WeatherDashboard from './pages/WeatherDashboard';
import ClimateMapPage from './pages/ClimateMapPage';
import ClimateAlertsPage from './pages/ClimateAlertsPage';
import EmergencyPage from './pages/EmergencyPage';
import ProfilePage from './pages/ProfilePage';
import MandiRatesPage from './pages/MandiRatesPage';
import KisanSchemesPage from './pages/KisanSchemesPage';
import FertilizerCalculatorPage from './pages/FertilizerCalculatorPage';
import CropCalendarPage from './pages/CropCalendarPage';
import SoilHealthPage from './pages/SoilHealthPage';
import SavingsCalculatorPage from './pages/SavingsCalculatorPage';
import FarmerStoriesPage from './pages/FarmerStoriesPage';

export default function App() {
  return (
    <Routes>
      
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/agriculture" element={<AgricultureDashboard />} />
          <Route path="/kisan-doctor" element={<AgricultureDashboard defaultTab="chat" />} />
          <Route path="/mandi-rates" element={<MandiRatesPage />} />
          <Route path="/crop-calendar" element={<CropCalendarPage />} />
          <Route path="/soil-health" element={<SoilHealthPage />} />
          <Route path="/fertilizer-calc" element={<FertilizerCalculatorPage />} />
          <Route path="/savings-calculator" element={<SavingsCalculatorPage />} />
          <Route path="/community-stories" element={<FarmerStoriesPage />} />
          <Route path="/schemes" element={<KisanSchemesPage />} />
          <Route path="/weather" element={<WeatherDashboard />} />
          <Route path="/map" element={<ClimateMapPage />} />
          <Route path="/alerts" element={<ClimateAlertsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/emergencies" element={<EmergencyPage />} />
        </Route>
      </Route>

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
