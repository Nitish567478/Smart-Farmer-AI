const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, server } = require('../server');
const User = require('../models/User');
const Location = require('../models/Location');
const ResourceDevice = require('../models/ResourceDevice');
const ResourceReading = require('../models/ResourceReading');
const EmergencyReport = require('../models/EmergencyReport');
const Warehouse = require('../models/Warehouse');
const InventoryItem = require('../models/InventoryItem');
const ReliefOrder = require('../models/ReliefOrder');
const weatherService = require('../services/weather/weatherService');

let mongoServer;
let baseUrl = '';

before(async () => {
  process.env.NODE_ENV = 'test';
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await new Promise((resolve) => {
    server.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

after(async () => {
  await mongoose.disconnect();
  if (mongoServer) await mongoServer.stop();
  server.close();
});

describe('1. Authentication & RBAC Tests', () => {
  let citizenToken = '';
  let officerToken = '';
  let adminToken = '';

  test('POST /api/auth/register should create a citizen user', async () => {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Citizen',
        email: 'citizen@example.com',
        password: 'Password123!',
        role: 'citizen'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.user.role, 'citizen');
    assert.ok(data.token);
    citizenToken = data.token;
  });

  test('POST /api/auth/register should create an emergency officer', async () => {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Officer Rao',
        email: 'officer@example.com',
        password: 'Password123!',
        role: 'emergency_officer'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.user.role, 'emergency_officer');
    officerToken = data.token;
  });

  test('POST /api/auth/register should create an administrator', async () => {
    const res = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'Password123!',
        role: 'admin'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.user.role, 'admin');
    adminToken = data.token;
  });

  test('Citizen should be forbidden (403) from accessing Admin Dashboard', async () => {
    const res = await fetch(`${baseUrl}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${citizenToken}` }
    });
    assert.strictEqual(res.status, 403);
  });

  test('Admin should successfully access Admin Dashboard (200)', async () => {
    const res = await fetch(`${baseUrl}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.users.total, 3);
  });
});

describe('2. Weather & Climate Risk Indicator Tests', () => {
  test('Open-Meteo real weather API retrieves live meteorological data', async () => {
    const weather = await weatherService.getWeather(28.6139, 77.209);
    assert.strictEqual(weather.provider, 'Open-Meteo');
    assert.ok(typeof weather.current.temperature === 'number');
    assert.ok(typeof weather.current.relativeHumidity === 'number');
    assert.ok(Array.isArray(weather.daily));
    assert.strictEqual(weather.daily.length >= 7, true);
  });

  test('GET /api/climate/risks calculates Heat Hazard and Rainfall indicators', async () => {
    const res = await fetch(`${baseUrl}/api/climate/risks?lat=28.6139&lon=77.209`);
    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.indicators.heatHazard);
    assert.ok(data.indicators.rainfallAndFlood);
    assert.ok(data.indicators.droughtStress);
    assert.strictEqual(data.meta.category, 'platform-calculated indicator');
  });
});

describe('3. Resource Management & Device Auth Tests', () => {
  let deviceId = '';
  let deviceIdentifier = '';
  let apiKey = '';
  let locationId = '';

  before(async () => {
    const loc = await Location.create({
      name: 'Central Water Reservoir',
      state: 'Punjab',
      district: 'Ludhiana',
      latitude: 30.901,
      longitude: 75.8573
    });
    locationId = loc._id.toString();
  });

  test('POST /api/resources/devices should register device and return raw API key', async () => {
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Password123!' })
    });
    const { token } = await loginRes.json();

    const res = await fetch(`${baseUrl}/api/resources/devices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: 'Reservoir Level Gauge #1',
        deviceType: 'water_sensor',
        locationId,
        warningThresholds: { min: 20, max: 85 }
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.success, true);
    assert.ok(data.credentials.apiKey);
    assert.ok(data.credentials.deviceIdentifier);

    deviceId = data.device.id;
    deviceIdentifier = data.credentials.deviceIdentifier;
    apiKey = data.credentials.apiKey;
  });

  test('POST /api/resources/readings should accept authenticated reading and detect threshold breach', async () => {
    const res = await fetch(`${baseUrl}/api/resources/readings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceIdentifier,
        'x-device-key': apiKey
      },
      body: JSON.stringify({
        resourceType: 'water',
        value: 14.5,
        unit: 'Percentage',
        measuredAt: new Date().toISOString()
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.success, true);
    assert.ok(data.thresholdAlert); 
  });
});

describe('4. Emergency & Relief Logistics Lifecycle Tests', () => {
  let citizenToken = '';
  let officerToken = '';
  let reportId = '';
  let warehouseId = '';

  before(async () => {
    const cRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'citizen@example.com', password: 'Password123!' })
    });
    citizenToken = (await cRes.json()).token;

    const oRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'officer@example.com', password: 'Password123!' })
    });
    officerToken = (await oRes.json()).token;

    const loc = await Location.create({
      name: 'District Relief Depot',
      state: 'Odisha',
      district: 'Puri',
      latitude: 19.8135,
      longitude: 85.8312
    });

    const wh = await Warehouse.create({
      name: 'Puri Disaster Hub',
      locationId: loc._id
    });
    warehouseId = wh._id.toString();

    await InventoryItem.create([
      { warehouseId: wh._id, itemName: 'Drinking Water Packs', quantity: 500, unit: 'Boxes', category: 'water' },
      { warehouseId: wh._id, itemName: 'Emergency Food Kits', quantity: 200, unit: 'Kits', category: 'food' }
    ]);
  });

  test('Step 1: Citizen files an emergency report', async () => {
    const res = await fetch(`${baseUrl}/api/emergencies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${citizenToken}`
      },
      body: JSON.stringify({
        category: 'flood',
        description: 'River water entered low-lying residential sectors near the embankment.',
        address: 'Sector 4, Embankment Road'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.report.verificationStatus, 'pending');
    reportId = data.report._id;
  });

  test('Step 2: Emergency Officer verifies report and sets severity', async () => {
    const res = await fetch(`${baseUrl}/api/emergencies/${reportId}/verify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${officerToken}`
      },
      body: JSON.stringify({
        verificationStatus: 'verified',
        severity: 'high',
        note: 'Confirmed with local municipal disaster cell.'
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.report.verificationStatus, 'verified');
    assert.strictEqual(data.report.severity, 'high');
  });

  test('Step 3: Officer dispatches relief order and inventory is deducted', async () => {
    const res = await fetch(`${baseUrl}/api/relief/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${officerToken}`
      },
      body: JSON.stringify({
        emergencyReportId: reportId,
        warehouseId,
        assignedTeam: 'Rapid Response Team Alpha',
        inventoryItems: [
          { itemName: 'Drinking Water Packs', quantity: 50, unit: 'Boxes' },
          { itemName: 'Emergency Food Kits', quantity: 30, unit: 'Kits' }
        ]
      })
    });

    const data = await res.json();
    assert.strictEqual(res.status, 201);
    assert.strictEqual(data.success, true);

    const waterStock = await InventoryItem.findOne({ warehouseId, itemName: 'Drinking Water Packs' });
    assert.strictEqual(waterStock.quantity, 450); 
  });
});
