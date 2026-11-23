const weatherService = require('../services/weather/weatherService');
const ExternalDataRecord = require('../models/ExternalDataRecord');
const Location = require('../models/Location');

const getCurrentWeather = async (req, res, next) => {
  try {
    let { lat, lon, locationId } = req.query;

    if (locationId && (!lat || !lon)) {
      const loc = await Location.findById(locationId);
      if (!loc) {
        return res.status(404).json({ success: false, error: 'Location not found.' });
      }
      lat = loc.latitude;
      lon = loc.longitude;
    }

    if (lat === undefined || lon === undefined) {
      lat = 28.6139;
      lon = 77.2090;
    }

    const weather = await weatherService.getWeather(lat, lon, locationId);

    res.status(200).json({
      success: true,
      data: weather
    });
  } catch (error) {
    next(error);
  }
};

const getForecast = async (req, res, next) => {
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

    res.status(200).json({
      success: true,
      provider: weather.provider,
      sourceUrl: weather.sourceUrl,
      observedAt: weather.observedAt,
      dailyForecast: weather.daily,
      hourlyForecast: weather.hourly
    });
  } catch (error) {
    next(error);
  }
};

const getWeatherHistory = async (req, res, next) => {
  try {
    const { locationId, days = 7 } = req.query;

    const query = { dataType: 'weather' };
    if (locationId) query.locationId = locationId;

    const records = await ExternalDataRecord.find(query)
      .sort({ observedAt: -1 })
      .limit(parseInt(days) * 4);

    res.status(200).json({
      success: true,
      count: records.length,
      records
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentWeather,
  getForecast,
  getWeatherHistory
};
