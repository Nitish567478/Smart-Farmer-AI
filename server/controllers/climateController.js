const ClimateAlert = require('../models/ClimateAlert');
const Location = require('../models/Location');
const weatherService = require('../services/weather/weatherService');
const geminiService = require('../services/ai/geminiService');
const satelliteService = require('../services/satellite/satelliteService');
const { broadcastPublic, broadcastToRole } = require('../services/notifications/notificationService');


const calculateHeatIndexCelsius = (tC, rh) => {
  const tF = (tC * 9) / 5 + 32;
  if (tF < 80) return tC; 

  let hi =
    -42.379 +
    2.04901523 * tF +
    10.14333127 * rh -
    0.22475541 * tF * rh -
    0.00683783 * tF * tF -
    0.05481717 * rh * rh +
    0.00122874 * tF * tF * rh +
    0.00085282 * tF * rh * rh -
    0.00000199 * tF * tF * rh * rh;

  return parseFloat((((hi - 32) * 5) / 9).toFixed(1));
};

const getClimateRiskIndices = async (req, res, next) => {
  try {
    let { lat, lon, locationId } = req.query;

    if (locationId && (!lat || !lon)) {
      const loc = await Location.findById(locationId);
      if (loc) {
        lat = loc.latitude;
        lon = loc.longitude;
      }
    }

    if (lat === undefined || lon === undefined) {
      lat = 28.6139;
      lon = 77.2090;
    }

    const weather = await weatherService.getWeather(lat, lon, locationId);
    const current = weather.current;
    const daily = weather.daily || [];

    const heatIndex = calculateHeatIndexCelsius(current.temperature, current.relativeHumidity);
    let heatSeverity = 'Low';
    let heatLabel = 'Normal comfort';

    if (heatIndex >= 54) {
      heatSeverity = 'Critical';
      heatLabel = 'Extreme Danger (Heat stroke imminent)';
    } else if (heatIndex >= 41) {
      heatSeverity = 'High';
      heatLabel = 'Danger (Heat exhaustion likely)';
    } else if (heatIndex >= 32) {
      heatSeverity = 'Moderate';
      heatLabel = 'Extreme Caution (Fatigue possible with prolonged exposure)';
    } else if (heatIndex >= 27) {
      heatSeverity = 'Low';
      heatLabel = 'Caution (Fatigue possible with heavy activity)';
    }

    const rain24h = current.precipitation || 0;
    const next7DaysRain = daily.reduce((sum, d) => sum + (d.precipitationSum || 0), 0);
    let rainSeverity = 'Low';
    let rainLabel = 'Normal / Low Rainfall';

    if (rain24h >= 64.5 || next7DaysRain >= 150) {
      rainSeverity = 'Critical';
      rainLabel = 'Very Heavy Rainfall / Flood Threat';
    } else if (rain24h >= 35.5 || next7DaysRain >= 90) {
      rainSeverity = 'High';
      rainLabel = 'Heavy Rainfall Alert';
    } else if (rain24h >= 15.6 || next7DaysRain >= 40) {
      rainSeverity = 'Moderate';
      rainLabel = 'Moderate Rainfall';
    }

    const dryDaysCount = daily.filter((d) => (d.precipitationSum || 0) < 1.0).length;
    let droughtSeverity = 'Low';
    let droughtLabel = 'Adequate Moisture';

    if (dryDaysCount >= 6 && current.temperature > 36) {
      droughtSeverity = 'High';
      droughtLabel = 'High Agricultural Drought Stress';
    } else if (dryDaysCount >= 5 && current.temperature > 32) {
      droughtSeverity = 'Moderate';
      droughtLabel = 'Moderate Soil Moisture Deficit';
    }

    const severityScores = { Low: 1, Moderate: 2, High: 3, Critical: 4 };
    const maxScore = Math.max(
      severityScores[heatSeverity],
      severityScores[rainSeverity],
      severityScores[droughtSeverity]
    );
    const scoreToLevel = { 1: 'Low', 2: 'Moderate', 3: 'High', 4: 'Critical' };
    const overallRisk = scoreToLevel[maxScore];

    res.status(200).json({
      success: true,
      meta: {
        category: 'platform-calculated indicator',
        methodology: 'Computed from real Open-Meteo meteorological parameters (NOAA Heat Index formula, IMD rainfall thresholds, 7-day cumulative precipitation and dry spells).',
        limitations: 'Calculated indicators estimate meteorological stress and do not replace localized emergency declarations from local civil defense or IMD.',
        observedAt: weather.observedAt,
        fetchedAt: weather.fetchedAt
      },
      overallRisk,
      indicators: {
        heatHazard: {
          severity: heatSeverity,
          heatIndexC: heatIndex,
          observedTempC: current.temperature,
          relativeHumidityPct: current.relativeHumidity,
          description: heatLabel
        },
        rainfallAndFlood: {
          severity: rainSeverity,
          currentPrecipitationMm: rain24h,
          forecast7DayRainMm: parseFloat(next7DaysRain.toFixed(1)),
          description: rainLabel
        },
        droughtStress: {
          severity: droughtSeverity,
          forecastDryDays: dryDaysCount,
          description: droughtLabel
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getClimateAlerts = async (req, res, next) => {
  try {
    const { locationId, severity, status = 'active' } = req.query;

    const query = {};
    if (status && status !== 'all') query.status = status;
    if (locationId) query.locationId = locationId;
    if (severity) query.severity = severity;

    const alerts = await ClimateAlert.find(query)
      .populate('locationId')
      .sort({ issuedAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: alerts.length,
      alerts
    });
  } catch (error) {
    next(error);
  }
};

const createClimateAlert = async (req, res, next) => {
  try {
    const { locationId, alertType, severity, title, description, source, sourceUrl, expiresAt } = req.body;

    if (!alertType || !severity || !title || !description || !source) {
      return res.status(400).json({
        success: false,
        error: 'Please provide alertType, severity, title, description, and source.'
      });
    }

    const alert = await ClimateAlert.create({
      locationId: locationId || undefined,
      alertType,
      severity,
      title,
      description,
      source,
      sourceUrl,
      expiresAt: expiresAt || undefined,
      status: 'active'
    });

    broadcastPublic('climate:alert', alert);
    broadcastToRole('emergency_officer', 'climate:alert', alert);

    res.status(201).json({
      success: true,
      alert
    });
  } catch (error) {
    next(error);
  }
};

const explainAlertWithAI = async (req, res, next) => {
  try {
    const alert = await ClimateAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found.' });
    }

    const language = req.body.language || req.user?.preferredLanguage || 'en';
    const explanation = await geminiService.explainClimateAlert({
      alertTitle: alert.title,
      alertSeverity: alert.severity,
      alertDescription: alert.description,
      language
    });

    res.status(200).json({
      success: true,
      alertId: alert._id,
      ...explanation
    });
  } catch (error) {
    next(error);
  }
};

const getSatelliteData = async (req, res, next) => {
  try {
    let { lat, lon } = req.query;
    if (lat === undefined || lon === undefined) {
      lat = 28.6139;
      lon = 77.2090;
    }

    const satelliteData = await satelliteService.getSatelliteProducts({
      latitude: lat,
      longitude: lon
    });

    res.status(200).json({
      success: true,
      data: satelliteData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClimateRiskIndices,
  getClimateAlerts,
  createClimateAlert,
  explainAlertWithAI,
  getSatelliteData
};
