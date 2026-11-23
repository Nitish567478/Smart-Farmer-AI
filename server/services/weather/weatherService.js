const axios = require('axios');
const ExternalDataRecord = require('../../models/ExternalDataRecord');

const WMO_CODES = {
  0: { label: 'Clear sky', icon: 'sun' },
  1: { label: 'Mainly clear', icon: 'sun' },
  2: { label: 'Partly cloudy', icon: 'cloud-sun' },
  3: { label: 'Overcast', icon: 'cloud' },
  45: { label: 'Fog', icon: 'cloud-fog' },
  48: { label: 'Depositing rime fog', icon: 'cloud-fog' },
  51: { label: 'Light drizzle', icon: 'cloud-drizzle' },
  53: { label: 'Moderate drizzle', icon: 'cloud-drizzle' },
  55: { label: 'Dense drizzle', icon: 'cloud-drizzle' },
  61: { label: 'Slight rain', icon: 'cloud-rain' },
  63: { label: 'Moderate rain', icon: 'cloud-rain' },
  65: { label: 'Heavy rain', icon: 'cloud-rain' },
  71: { label: 'Slight snow fall', icon: 'cloud-snow' },
  73: { label: 'Moderate snow fall', icon: 'cloud-snow' },
  75: { label: 'Heavy snow fall', icon: 'cloud-snow' },
  80: { label: 'Slight rain showers', icon: 'cloud-rain' },
  81: { label: 'Moderate rain showers', icon: 'cloud-rain' },
  82: { label: 'Violent rain showers', icon: 'cloud-lightning' },
  95: { label: 'Thunderstorm', icon: 'cloud-lightning' },
  96: { label: 'Thunderstorm with slight hail', icon: 'cloud-lightning' },
  99: { label: 'Thunderstorm with heavy hail', icon: 'cloud-lightning' }
};

const getWeatherDescription = (code) => {
  return WMO_CODES[code] || { label: 'Variable conditions', icon: 'cloud' };
};


const getWeather = async (latitude, longitude, locationId = null) => {
  if (latitude === undefined || longitude === undefined) {
    throw new Error('Latitude and longitude are required to fetch weather.');
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  if (locationId) {
    const cached = await ExternalDataRecord.findOne({
      locationId,
      dataType: 'weather',
      fetchedAt: { $gte: fifteenMinutesAgo }
    }).sort({ fetchedAt: -1 });

    if (cached) {
      return {
        ...cached.payload,
        isCached: true,
        observedAt: cached.observedAt,
        fetchedAt: cached.fetchedAt,
        source: 'Open-Meteo (Cached)'
      };
    }
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto`;

  try {
    const response = await axios.get(url, { timeout: 8000 });
    const data = response.data;

    const currentCode = data.current?.weather_code ?? 0;
    const weatherDesc = getWeatherDescription(currentCode);

    const resultPayload = {
      provider: 'Open-Meteo',
      sourceUrl: 'https://open-meteo.com/',
      coordinates: { latitude: lat, longitude: lon },
      elevation: data.elevation,
      timezone: data.timezone,
      current: {
        time: data.current?.time,
        temperature: data.current?.temperature_2m,
        apparentTemperature: data.current?.apparent_temperature,
        relativeHumidity: data.current?.relative_humidity_2m,
        precipitation: data.current?.precipitation,
        rain: data.current?.rain,
        cloudCover: data.current?.cloud_cover,
        windSpeed: data.current?.wind_speed_10m,
        windDirection: data.current?.wind_direction_10m,
        weatherCode: currentCode,
        condition: weatherDesc.label,
        icon: weatherDesc.icon,
        isDay: data.current?.is_day === 1
      },
      daily: (data.daily?.time || []).map((date, idx) => {
        const code = data.daily.weather_code[idx];
        const desc = getWeatherDescription(code);
        return {
          date,
          weatherCode: code,
          condition: desc.label,
          icon: desc.icon,
          tempMax: data.daily.temperature_2m_max[idx],
          tempMin: data.daily.temperature_2m_min[idx],
          precipitationSum: data.daily.precipitation_sum[idx],
          precipitationProbabilityMax: data.daily.precipitation_probability_max?.[idx] ?? 0,
          maxWindSpeed: data.daily.wind_speed_10m_max[idx]
        };
      }),
      hourly: (data.hourly?.time || []).slice(0, 24).map((time, idx) => ({
        time,
        temperature: data.hourly.temperature_2m[idx],
        relativeHumidity: data.hourly.relative_humidity_2m[idx],
        precipitationProbability: data.hourly.precipitation_probability[idx],
        precipitation: data.hourly.precipitation[idx],
        weatherCode: data.hourly.weather_code[idx]
      }))
    };

    const record = new ExternalDataRecord({
      provider: 'Open-Meteo',
      dataType: 'weather',
      locationId: locationId || undefined,
      observedAt: data.current?.time ? new Date(data.current.time) : new Date(),
      fetchedAt: new Date(),
      sourceUrl: url,
      payload: resultPayload,
      freshnessStatus: 'fresh'
    });
    await record.save();

    return {
      ...resultPayload,
      isCached: false,
      observedAt: record.observedAt,
      fetchedAt: record.fetchedAt
    };
  } catch (error) {
    console.error('[Open-Meteo Error]', error.message);
    throw new Error(`Failed to retrieve real weather data from Open-Meteo: ${error.message}`);
  }
};

module.exports = { getWeather, getWeatherDescription };
