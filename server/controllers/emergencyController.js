const EmergencyReport = require('../models/EmergencyReport');
const AuditLog = require('../models/AuditLog');
const InventoryItem = require('../models/InventoryItem');
const geminiService = require('../services/ai/geminiService');
const { broadcastToRole, broadcastPublic, sendNotification } = require('../services/notifications/notificationService');

const createReport = async (req, res, next) => {
  try {
    const { category, description, coordinates, address, locationId } = req.body;

    if (!category || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please provide emergency category and description.'
      });
    }

    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map((file) => `/uploads/${file.filename}`);
    } else if (req.body.imageUrls) {
      imageUrls = Array.isArray(req.body.imageUrls) ? req.body.imageUrls : [req.body.imageUrls];
    }

    let parsedCoords = undefined;
    if (coordinates) {
      try {
        parsedCoords = typeof coordinates === 'string' ? JSON.parse(coordinates) : coordinates;
      } catch (e) {
      }
    }

    const report = await EmergencyReport.create({
      userId: req.user._id,
      locationId: locationId || undefined,
      category,
      description,
      coordinates: parsedCoords,
      address,
      imageUrls,
      verificationStatus: 'pending',
      status: 'reported',
      statusHistory: [
        {
          status: 'reported',
          updatedBy: req.user._id,
          note: 'Initial citizen emergency report filed.',
          updatedAt: new Date()
        }
      ]
    });

    broadcastToRole('emergency_officer', 'emergency:new', report);
    broadcastToRole('admin', 'emergency:new', report);

    res.status(201).json({
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};

const getMyReports = async (req, res, next) => {
  try {
    const reports = await EmergencyReport.find({ userId: req.user._id })
      .populate('locationId')
      .populate('assignedOfficerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    next(error);
  }
};

const getAllReports = async (req, res, next) => {
  try {
    const { verificationStatus, status, category, severity } = req.query;

    const query = {};
    if (verificationStatus) query.verificationStatus = verificationStatus;
    if (status) query.status = status;
    if (category) query.category = category;
    if (severity) query.severity = severity;

    const reports = await EmergencyReport.find(query)
      .populate('userId', 'name email phone')
      .populate('locationId')
      .populate('assignedOfficerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      reports
    });
  } catch (error) {
    next(error);
  }
};

const getReportById = async (req, res, next) => {
  try {
    const report = await EmergencyReport.findById(req.params.id)
      .populate('userId', 'name email phone')
      .populate('locationId')
      .populate('assignedOfficerId', 'name email phone')
      .populate('statusHistory.updatedBy', 'name role');

    if (!report) {
      return res.status(404).json({ success: false, error: 'Emergency report not found.' });
    }

    if (req.user.role === 'citizen' && report.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Not authorized to view this emergency report.' });
    }

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};

const verifyReport = async (req, res, next) => {
  try {
    const { verificationStatus, severity, note } = req.body;

    if (!verificationStatus || !['verified', 'rejected', 'investigating'].includes(verificationStatus)) {
      return res.status(400).json({
        success: false,
        error: 'Valid verificationStatus is required (verified, rejected, investigating).'
      });
    }

    const report = await EmergencyReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found.' });
    }

    report.verificationStatus = verificationStatus;
    if (severity) report.severity = severity;

    report.statusHistory.push({
      status: `Verification: ${verificationStatus}`,
      updatedBy: req.user._id,
      note: note || `Report marked as ${verificationStatus} by officer.`,
      updatedAt: new Date()
    });

    await report.save();

    await AuditLog.create({
      actorId: req.user._id,
      actorRole: req.user.role,
      action: 'EMERGENCY_VERIFIED',
      entityType: 'EmergencyReport',
      entityId: report._id.toString(),
      details: { verificationStatus, severity, note }
    });

    await sendNotification({
      userId: report.userId,
      title: 'Emergency Report Status Update',
      message: `Your emergency report regarding "${report.category}" has been marked as ${verificationStatus}.`,
      type: 'emergency',
      referenceId: report._id.toString()
    });

    if (verificationStatus === 'verified') {
      broadcastPublic('emergency:verified', report);
    }
    broadcastToRole('emergency_officer', 'emergency:updated', report);

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};

const updateReportStatus = async (req, res, next) => {
  try {
    const { status, note } = req.body;

    if (!status || !['reported', 'active', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Valid status is required (reported, active, resolved, closed).'
      });
    }

    const report = await EmergencyReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found.' });
    }

    report.status = status;
    report.statusHistory.push({
      status,
      updatedBy: req.user._id,
      note: note || `Status updated to ${status}.`,
      updatedAt: new Date()
    });

    await report.save();

    await sendNotification({
      userId: report.userId,
      title: 'Emergency Case Update',
      message: `Your reported case status has changed to: ${status.toUpperCase()}.`,
      type: 'emergency',
      referenceId: report._id.toString()
    });

    broadcastToRole('emergency_officer', 'emergency:updated', report);

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};

const assignOfficer = async (req, res, next) => {
  try {
    const { officerId } = req.body;

    const report = await EmergencyReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found.' });
    }

    report.assignedOfficerId = officerId;
    report.statusHistory.push({
      status: 'Officer Assigned',
      updatedBy: req.user._id,
      note: `Assigned to officer ID ${officerId}`,
      updatedAt: new Date()
    });
    await report.save();

    await sendNotification({
      userId: officerId,
      title: 'New Emergency Assigned',
      message: `You have been assigned to emergency #${report._id.toString().slice(-6)} (${report.category}).`,
      type: 'emergency',
      referenceId: report._id.toString()
    });

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};

const getAIRecommendations = async (req, res, next) => {
  try {
    const report = await EmergencyReport.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found.' });
    }

    const inventory = await InventoryItem.find({ quantity: { $gt: 0 } }).limit(20);

    const recommendation = await geminiService.summarizeEmergencyNeeds({
      reportDescription: report.description,
      category: report.category,
      severity: report.severity,
      availableInventory: inventory
    });

    res.status(200).json({
      success: true,
      recommendation
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReport,
  getMyReports,
  getAllReports,
  getReportById,
  verifyReport,
  updateReportStatus,
  assignOfficer,
  getAIRecommendations
};
