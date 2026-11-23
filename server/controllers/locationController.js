const Location = require('../models/Location');
const axios = require('axios');

const searchLocations = async (req, res, next) => {
  try {
    const { q, state, district } = req.query;

    const query = {};
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: 'i' } },
        { district: { $regex: q, $options: 'i' } },
        { state: { $regex: q, $options: 'i' } }
      ];
    }
    if (state) query.state = { $regex: state, $options: 'i' };
    if (district) query.district = { $regex: district, $options: 'i' };

    let locations = await Location.find(query).limit(20);

    if (locations.length === 0 && q) {
      try {
        const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: { q, format: 'json', addressdetails: 1, limit: 5 },
          headers: { 'User-Agent': 'ClimatePulseAI/1.0' },
          timeout: 4000
        });

        if (geoRes.data && geoRes.data.length > 0) {
          const createdLocations = [];
          for (const item of geoRes.data) {
            const locState = item.address?.state || item.address?.region || 'National';
            const locDistrict = item.address?.county || item.address?.state_district || item.address?.city || item.display_name.split(',')[0];
            const locName = item.display_name.split(',').slice(0, 2).join(',').trim();

            let saved = await Location.findOne({
              latitude: parseFloat(item.lat),
              longitude: parseFloat(item.lon)
            });

            if (!saved) {
              saved = await Location.create({
                name: locName,
                state: locState,
                district: locDistrict,
                village: item.address?.village || item.address?.suburb,
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lon)
              });
            }
            createdLocations.push(saved);
          }
          locations = createdLocations;
        }
      } catch (geoErr) {
        console.warn('[Geocoding]', geoErr.message);
      }
    }

    res.status(200).json({
      success: true,
      count: locations.length,
      locations
    });
  } catch (error) {
    next(error);
  }
};

const getLocationById = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({
        success: false,
        error: 'Location not found.'
      });
    }

    res.status(200).json({
      success: true,
      location
    });
  } catch (error) {
    next(error);
  }
};

const createLocation = async (req, res, next) => {
  try {
    const { name, state, district, village, latitude, longitude } = req.body;

    if (!name || !state || !district || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, state, district, latitude, and longitude.'
      });
    }

    const location = await Location.create({
      name,
      state,
      district,
      village,
      latitude,
      longitude
    });

    res.status(201).json({
      success: true,
      location
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchLocations,
  getLocationById,
  createLocation
};
