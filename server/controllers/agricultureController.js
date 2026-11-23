const FarmProfile = require('../models/FarmProfile');
const CropAdvisory = require('../models/CropAdvisory');
const Location = require('../models/Location');
const FarmerChatMessage = require('../models/FarmerChatMessage');
const weatherService = require('../services/weather/weatherService');
const mandiService = require('../services/markets/mandiService');
const geminiService = require('../services/ai/geminiService');

const getMyFarmProfile = async (req, res, next) => {
  try {
    const farmProfile = await FarmProfile.findOne({ userId: req.user._id }).populate('locationId');
    res.status(200).json({
      success: true,
      farmProfile: farmProfile || null
    });
  } catch (error) {
    next(error);
  }
};

const upsertFarmProfile = async (req, res, next) => {
  try {
    const { locationId, cropTypes, soilType, area, irrigationType } = req.body;

    if (!locationId) {
      return res.status(400).json({
        success: false,
        error: 'Location is required for farm profile.'
      });
    }

    let farmProfile = await FarmProfile.findOne({ userId: req.user._id });

    if (farmProfile) {
      farmProfile.locationId = locationId;
      if (cropTypes) farmProfile.cropTypes = cropTypes;
      if (soilType !== undefined) farmProfile.soilType = soilType;
      if (area !== undefined) farmProfile.area = area;
      if (irrigationType !== undefined) farmProfile.irrigationType = irrigationType;
      await farmProfile.save();
    } else {
      farmProfile = await FarmProfile.create({
        userId: req.user._id,
        locationId,
        cropTypes: cropTypes || [],
        soilType,
        area,
        irrigationType
      });
    }

    const populated = await farmProfile.populate('locationId');

    res.status(200).json({
      success: true,
      farmProfile: populated
    });
  } catch (error) {
    next(error);
  }
};

const requestCropAdvisory = async (req, res, next) => {
  try {
    const { crop, locationId, language = 'en', latitude, longitude, locationName: customLocName } = req.body;

    if (!crop) {
      return res.status(400).json({ success: false, error: 'Crop name is required.' });
    }

    let loc = null;
    let farmProfile = await FarmProfile.findOne({ userId: req.user._id });

    const targetLocId = locationId || farmProfile?.locationId;
    if (targetLocId) {
      loc = await Location.findById(targetLocId);
    }

    if (!loc && latitude !== undefined && longitude !== undefined) {
      const latNum = parseFloat(latitude);
      const lonNum = parseFloat(longitude);
      if (!isNaN(latNum) && !isNaN(lonNum)) {
        loc = await Location.findOne({
          latitude: { $gte: latNum - 0.05, $lte: latNum + 0.05 },
          longitude: { $gte: lonNum - 0.05, $lte: lonNum + 0.05 }
        });
        if (!loc) {
          loc = await Location.create({
            name: customLocName || 'Local Farm GPS Coordinates',
            state: 'India',
            district: 'Local Zone',
            latitude: latNum,
            longitude: lonNum
          });
        }
      }
    }

    if (!loc) {
      loc = await Location.findOne();
      if (!loc) {
        loc = await Location.create({
          name: 'Northern Agricultural Plains',
          state: 'Delhi',
          district: 'New Delhi',
          latitude: 28.6139,
          longitude: 77.2090
        });
      }
    }

    const lat = loc ? loc.latitude : 28.6139;
    const lon = loc ? loc.longitude : 77.2090;
    const locationName = customLocName || (loc ? `${loc.name}, ${loc.district}, ${loc.state}` : 'Selected Location');

    const [weatherRes, mandiRes] = await Promise.allSettled([
      weatherService.getWeather(lat, lon, loc?._id),
      mandiService.searchMandiPrices({
        state: loc?.state,
        district: loc?.district,
        commodity: crop
      })
    ]);

    const weatherData = weatherRes.status === 'fulfilled' ? weatherRes.value : null;
    const mandiData = mandiRes.status === 'fulfilled' ? mandiRes.value : null;

    const advisoryResult = await geminiService.generateCropAdvisory({
      crop,
      locationName,
      weatherData,
      mandiData,
      farmProfile,
      language: language || req.user.preferredLanguage || 'en'
    });

    const advisoryRecord = await CropAdvisory.create({
      userId: req.user._id,
      locationId: loc._id,
      crop,
      inputDataReferences: advisoryResult.inputDataReferences || {},
      advisoryText: advisoryResult.advisoryText,
      language: advisoryResult.language || 'en',
      limitations: advisoryResult.limitations || 'AI-generated guidance with real meteorological context.'
    });

    res.status(200).json({
      success: true,
      advisory: advisoryRecord
    });
  } catch (error) {
    next(error);
  }
};

const getMandiPrices = async (req, res, next) => {
  try {
    const { state, district, market, commodity, limit } = req.query;

    const data = await mandiService.searchMandiPrices({
      state,
      district,
      market,
      commodity,
      limit: limit ? parseInt(limit) : 25
    });

    res.status(200).json({
      success: true,
      ...data
    });
  } catch (error) {
    next(error);
  }
};

const farmerChat = async (req, res, next) => {
  try {
    const { message, image, mimeType, language = 'auto' } = req.body;

    if (!message && !image) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a message or upload an image of your crop/leaf.'
      });
    }

    const farmProfile = await FarmProfile.findOne({ userId: req.user._id }).populate('locationId');

    const historyDocs = await FarmerChatMessage.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(6);
    const history = historyDocs.reverse().map(h => ({
      sender: h.sender,
      text: h.text
    }));

    let weatherData = null;
    let mandiData = null;
    if (farmProfile?.locationId) {
      const { latitude, longitude, state, district } = farmProfile.locationId;
      try {
        weatherData = await weatherService.getWeather(latitude, longitude, farmProfile.locationId._id);
      } catch (e) {
      }
      try {
        mandiData = await mandiService.searchMandiPrices({ state, district, limit: 15 });
      } catch (e) {
      }
    } else {
      try {
        mandiData = await mandiService.searchMandiPrices({ limit: 15 });
      } catch (e) {
      }
    }

    const farmerRecord = await FarmerChatMessage.create({
      userId: req.user._id,
      sender: 'farmer',
      text: message || 'Crop / plant health photo uploaded for diagnosis',
      imageUrl: image || null,
      language: language || 'auto'
    });

    const aiResponse = await geminiService.diagnoseCropImageAndChat({
      message,
      imageBase64: image,
      mimeType: mimeType || 'image/jpeg',
      language,
      history,
      farmProfile,
      weatherData,
      mandiData
    });

    const botRecord = await FarmerChatMessage.create({
      userId: req.user._id,
      sender: 'bot',
      text: aiResponse.reply,
      language: aiResponse.detectedLanguage || language
    });

    res.status(200).json({
      success: true,
      reply: aiResponse.reply,
      detectedLanguage: aiResponse.detectedLanguage,
      farmerMessage: farmerRecord,
      botMessage: botRecord
    });
  } catch (error) {
    next(error);
  }
};

const getFarmerChatHistory = async (req, res, next) => {
  try {
    const messages = await FarmerChatMessage.find({ userId: req.user._id })
      .sort({ createdAt: 1 })
      .limit(50);

    res.status(200).json({
      success: true,
      messages
    });
  } catch (error) {
    next(error);
  }
};

const clearFarmerChatHistory = async (req, res, next) => {
  try {
    await FarmerChatMessage.deleteMany({ userId: req.user._id });
    res.status(200).json({
      success: true,
      message: 'Chat history cleared successfully.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyFarmProfile,
  upsertFarmProfile,
  requestCropAdvisory,
  getMandiPrices,
  farmerChat,
  getFarmerChatHistory,
  clearFarmerChatHistory
};
