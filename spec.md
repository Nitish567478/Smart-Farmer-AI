Climate Pulse AI - Project Specification
1. Project Overview
Name: Climate Pulse AI
Tagline: Predict Risks. Protect Resources. Save Lives.

Climate Pulse AI is a climate intelligence and resource-management
platform for farmers, citizens, administrators, resource managers, and
emergency response teams.

The platform has four modules: 1. Smart Agriculture Assistant: Uses
real weather, available mandi prices, and farmer-provided details to
provide farming guidance. 2. Climate Risk Monitoring: Displays
location-specific weather, official warnings, historical context, and
climate indicators. 3. Smart Resource Management: Monitors water,
electricity, and solar resources using connected sensors or verified
utility data. 4. Emergency Response & Supply Chain: Manages
emergency reports, relief inventory, vehicles, assignments, and delivery
progress.

Clearly distinguish measured data, official alerts, forecasts,
calculated indicators, and AI-generated recommendations.
2. Technology Stack
  Layer               Technology
  Frontend            React.js + Vite
Styling             Tailwind CSS
Backend             Node.js + Express.js
Database            MongoDB + Mongoose
Authentication      JWT + bcrypt
AI                  Gemini API, backend only
Weather             Open-Meteo or another approved provider
Official warnings   IMD, where accessible
Mandi prices        Agmarknet / data.gov.in, subject to access
Satellite data      Copernicus Data Space, subject to access
Maps                Leaflet + OpenStreetMap
Charts              Recharts
Real-time           Socket.IO
File storage        Cloudinary or persistent storage
Voice               Web Speech API where supported

Check API availability, access requirements, licensing, rate limits, and
update frequency before integration. Do not assume a website provides a
public API.
3. User Roles
Farmer
- Select state, district, village, and farm location.
- View current weather and forecasts.
- Check available mandi prices.
- Enter crop and farm details.
- Request crop and weather-related guidance.
- Receive relevant weather alerts.
- Use the assistant in supported languages.
Citizen
- View local weather and climate alerts.
- Report emergencies with location and optional images.
- View public emergency information and relief locations.
- Track their own reports.
Administrator
- Manage users, locations, services, and configuration.
- View emergency and resource information.
- Verify emergency reports.
- Manage alert publication and administrative records.
- Review audit logs.
Emergency Officer
- View assigned emergencies.
- Verify reports and update status.
- Create relief operations.
- Assign inventory and vehicles.
- Track delivery progress and record evidence.
Resource Manager
- Register and manage resource locations and devices.
- Monitor connected water, electricity, and solar readings.
- Review consumption and shortage alerts.
- Manage resource availability and maintenance records.
Enforce permissions on the backend, not only in frontend route guards.
4. Module 1 - Smart Agriculture Assistant
Purpose: Provide farming guidance using current data and farmer-provided
information.

Features: - Location selection by state, district, village, or
coordinates. - Current temperature, rainfall, humidity, wind, and
forecast. - Seven-day forecast where supported. - Mandi price search by
crop and market. - Display market, commodity, price, unit, date, and
source when available. - Farmer profile with optional crop, soil type,
acreage, and irrigation details. - AI crop advisory based on available
weather, market, and farm information. - Sowing, harvesting, and
crop-protection guidance only where reliable information exists. -
English and Hindi support initially. - Voice input where browser support
exists.

Show the data and date used for AI guidance. Do not guarantee yield,
prices, or harvest outcomes. If mandi or soil data is unavailable, state
that clearly instead of inventing values.
5. Module 2 - Climate Risk Monitoring
Purpose: Display location-specific weather conditions and potential
climate hazards.

Features: - Current weather and forecasts. - Official weather warnings
from supported sources. - Heavy rainfall and heat alerts. - Flood and
drought indicators where suitable data exists. - Historical rainfall
comparison where datasets are available. - Satellite imagery or derived
products from a configured provider. - Interactive map with available
risk layers. - Location-specific alert history. - Notifications for
relevant new alerts.

Risk levels: Low, Moderate, High, Critical.

Clearly label observed data, forecast data, official warnings,
platform-calculated indicators, and AI-generated explanations. Do not
present an AI estimate as an official warning or guaranteed prediction.
Explain risk-score methodology and limitations.
6. Module 3 - Smart Resource Management
Purpose: Monitor water, electricity, and solar resource availability and
consumption.

Features: - Register resource locations and devices. - Accept readings
from authenticated IoT devices or verified utility APIs. - Monitor water
availability/level, consumption, electricity usage, solar generation,
and timestamps where supported. - Display resource history and trends. -
Create threshold-based shortage alerts using configured thresholds. -
Show device connectivity and last received reading. - Allow authorized
managers to record inspections and maintenance.

Do not generate simulated sensor readings. If no sensor or utility
integration is connected, show that resource data is unavailable and
explain how to connect a device or provider.

The initial version is monitoring and reporting only. Do not remotely
control power, water, or grid equipment without a separately approved,
secure, tested hardware integration.
7. Module 4 - Emergency Response & Supply Chain
Purpose: Coordinate verified emergency reports and relief operations.

Citizen features: - Submit an emergency report with description,
category, location, time, and optional images. - View status of their
own reports. - Receive updates.

Emergency categories may include flood, storm, heat emergency,
infrastructure disruption, water shortage, and other.

Officer/admin features: - Review and verify reports. - Set severity and
status. - Record affected location and needs. - Create relief
operations. - Manage warehouses and inventory. - Register vehicles and
delivery teams. - Assign supplies and vehicles to relief orders. - View
routes using a configured routing provider. - Update dispatch and
delivery status. - Upload delivery evidence and record confirmation.

Workflow: 1. Emergency reported. 2. Report reviewed and verified. 3.
Relief needs recorded. 4. Inventory and vehicle availability checked. 5.
Relief order created and assigned. 6. Delivery dispatched. 7. Delivery
progress updated. 8. Delivery completed and recorded.

Do not claim live vehicle tracking unless authenticated GPS updates are
received. Do not claim a route is safe unless current reliable road and
hazard data supports that claim. Human officers approve operational
decisions.
8. Application Pages
  Page                    Function
  Landing Page            Platform overview
Register / Login        Authentication
Main Dashboard          Summary of available real data
Agriculture Dashboard   Farmer location, crops, and advisories
Weather Dashboard       Current conditions and forecasts
Mandi Prices            Market price search and source dates
AI Farming Assistant    Context-based farming questions
Climate Risk Map        Weather and available risk layers
Climate Alerts          Official and platform alerts
Resource Dashboard      Water and energy monitoring
Device Management       Registered sensor/device status
Emergency Dashboard     Emergency reports and operations
Emergency Details       Verification and status history
Relief Inventory        Warehouse stock management
Vehicle Management      Vehicle availability and assignments
Relief Orders           Dispatch and delivery tracking
Notifications           User alerts
Admin Dashboard         Administration and analytics
Profile                 User and location settings

Only show modules and actions permitted for the signed-in user's role.
9. Dashboard Requirements
Main Dashboard - Selected location and data timestamp. - Current
weather and forecast summary. - Active official weather warnings. -
Available climate indicators. - Latest verified emergency reports. -
Resource status only where connected data exists. - Recent
notifications.

Agriculture Dashboard - Selected location. - Current weather and
forecast. - Available mandi prices with market, date, and source. -
Saved crop and farm information. - AI advisory with source context and
limitations.

Admin Dashboard - Real registered user count. - Actual emergency
counts by status. - Active relief operations. - Actual inventory
totals. - Connected resource device count and health. - Recent
administrative activity.

Emergency Officer Dashboard - Assigned emergency reports. - Reports
awaiting verification. - Active relief operations. - Available inventory
and vehicles. - Dispatch and delivery status.

Resource Manager Dashboard - Registered devices. - Latest readings
and timestamps. - Offline devices. - Resource trends. - Threshold
alerts.

All statistics must come from MongoDB or explicitly identified external
provider responses. Never use hardcoded dashboard figures.
10. Database Collections
Use Mongoose models with timestamps, validation, indexes, and
references.
User
- name
- email (unique)
- passwordHash
- role: farmer, citizen, admin, emergency_officer, resource_manager
- phone (optional)
- preferredLanguage
- savedLocationIds
- createdAt, updatedAt
Location
- name
- state
- district
- village (optional)
- latitude
- longitude
- createdAt, updatedAt
FarmProfile
- userId
- locationId
- cropTypes
- soilType (optional)
- area (optional)
- irrigationType (optional)
- createdAt, updatedAt
ExternalDataRecord
- provider
- dataType
- locationId
- observedAt
- fetchedAt
- sourceUrl (optional)
- payload
- freshnessStatus
ClimateAlert
- locationId
- alertType
- severity
- title
- description
- source
- sourceUrl
- issuedAt
- expiresAt (optional)
- status
CropAdvisory
- userId
- locationId
- crop
- inputDataReferences
- advisoryText
- language
- limitations
- createdAt
ResourceDevice
- name
- deviceType
- locationId
- deviceIdentifier
- credentialHash
- status
- lastSeenAt
ResourceReading
- deviceId
- locationId
- resourceType
- value
- unit
- measuredAt
- receivedAt
- source
EmergencyReport
- userId
- locationId
- category
- description
- imageUrls
- severity
- verificationStatus
- status
- statusHistory
- assignedOfficerId
- createdAt, updatedAt
Warehouse
- name
- locationId
- managerId
- createdAt, updatedAt
InventoryItem
- warehouseId
- itemName
- quantity
- unit
- updatedAt
Vehicle
- vehicleIdentifier
- vehicleType
- locationId
- availability
- assignedOfficerId
- lastGpsUpdateAt (optional)
ReliefOrder
- emergencyReportId
- warehouseId
- inventoryItems
- vehicleId
- assignedTeam
- routeReference (optional)
- status
- dispatchAt
- deliveredAt
- deliveryEvidence
- createdAt, updatedAt
Notification
- userId
- title
- message
- type
- isRead
- createdAt
Store only necessary personal information. Validate quantities, units,
coordinates, timestamps, and references.
11. API Endpoints
Use /api prefix and consistent JSON responses. Protect endpoints with
authentication, role checks, ownership checks, and validation.

Authentication - POST /api/auth/register -
POST /api/auth/login - POST /api/auth/logout -
GET /api/auth/profile

Locations - GET /api/locations/search - GET /api/locations/:id

Weather and external data - GET /api/weather/current -
GET /api/weather/forecast - GET /api/weather/history -
GET /api/markets/prices - GET /api/climate/alerts -
GET /api/climate/risks - GET /api/climate/satellite

Agriculture - GET /api/farms/me - POST /api/farms -
PATCH /api/farms/:id - POST /api/agriculture/advisory -
POST /api/agriculture/chat

Resources - GET /api/resources - GET /api/resources/devices -
POST /api/resources/devices - POST /api/resources/readings -
GET /api/resources/analytics - PATCH /api/resources/devices/:id

Device-reading endpoints must use device authentication, not ordinary
citizen authentication.

Emergencies - POST /api/emergencies - GET /api/emergencies/my -
GET /api/emergencies/:id - GET /api/emergencies (authorized staff) -
PATCH /api/emergencies/:id/status -
PATCH /api/emergencies/:id/assign -
POST /api/emergencies/:id/evidence

Relief and inventory - GET /api/warehouses -
POST /api/warehouses - GET /api/inventory - POST /api/inventory -
PATCH /api/inventory/:id - GET /api/vehicles -
POST /api/vehicles - POST /api/relief/orders -
GET /api/relief/orders - PATCH /api/relief/orders/:id/status

Dashboards and notifications - GET /api/dashboard/summary -
GET /api/admin/dashboard - GET /api/officer/dashboard -
GET /api/notifications - PATCH /api/notifications/:id/read
12. External Data Integrations
Potential providers:

  Data                        Provider
  Weather and forecast        https://open-meteo.com/
Official weather warnings   https://mausam.imd.gov.in/
Mandi prices                https://agmarknet.gov.in/
Government datasets         https://data.gov.in/
Satellite data              https://dataspace.copernicus.eu/
Maps                        https://www.openstreetmap.org/
AI                          Gemini API

Before implementing each integration: - Confirm a usable API or
supported data access method exists. - Check authentication, rate
limits, terms, attribution, and licensing. - Record provider, source
URL, observation time, retrieval time, and units. - Cache responses
appropriately and respect provider limits. - Display last successful
update and data freshness. - Handle provider outages and invalid
responses honestly.

Do not scrape sites in violation of their terms. Do not assume a web
page is an API.
13. Real-Time Data and Socket.IO
Use Socket.IO for: - New verified emergency reports. - Emergency status
and assignment changes. - New climate alerts received from configured
providers. - New authenticated device readings. - Resource threshold
alerts. - Relief dispatch and delivery updates. - Notifications.

Requirements: - Authenticate socket connections. - Authorize rooms and
events by role and ownership. - Persist important events and
notifications in MongoDB. - Use provider polling, webhooks, or scheduled
ingestion where supported. - Do not label data live unless
provider/device update frequency supports it. - Display observed time,
fetched time, and last successful update. - Re-fetch authoritative
records after receiving an event.

Socket.IO does not create live weather, satellite, GPS, or sensor data.
Those require real provider or device integrations.
14. AI Integration
Use Gemini API from backend services only.

Use cases: - Farming guidance based on actual weather and
farmer-provided details. - Explain climate alerts in simple language. -
Summarize climate conditions using retrieved data. - Summarize verified
emergency needs. - Help officers organize relief requirements using
actual inventory and reports.

Requirements: - Never use model memory instead of current weather,
prices, alerts, or inventory. - Pass source data and timestamps into AI
requests. - Clearly label AI-generated advice. - Validate structured
model output. - Show uncertainty and limitations. - Handle missing keys,
timeouts, rate limits, and malformed responses. - Never return hardcoded
AI responses.

AI must not autonomously dispatch vehicles, change utility controls, or
make high-impact emergency decisions. Require authorized human approval.
15. Security and Privacy
- Hash passwords with bcrypt.
- Use secure JWT handling.
- Enforce backend role-based access control.
- Validate and sanitize input.
- Rate-limit authentication and AI endpoints.
- Validate upload types and sizes.
- Use persistent, access-controlled file storage.
- Authenticate IoT devices with unique credentials and support
  rotation.
- Reject invalid, duplicate, stale, or unauthorized readings.
- Protect personal location and contact information.
- Do not expose private emergency reporter information publicly.
- Audit inventory changes, emergency verification, assignments, and
  deliveries.
- Keep secrets out of frontend code and source control.
- Configure CORS for approved frontend origins.
16. UI/UX Requirements
Create a professional, accessible, responsive climate technology
interface: - Desktop, tablet, and mobile support. - Role-based
navigation. - Clear dashboards, maps, tables, and charts. - Accessible
form labels and keyboard navigation. - Loading, empty, error, and
success states. - Clear data source and last-updated labels. -
Distinguish official alerts from AI recommendations. - No non-functional
buttons or placeholder controls.

Suggested colors: - Primary: #123B35 - Secondary: #168A70 -
Background: #F7FAF8 - Warning: #F59E0B - Danger: #DC2626 -
Information: #2563EB
17. Suggested Folder Structure
climate-pulse-ai/
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── dashboards/
│       ├── maps/
│       ├── services/
│       ├── context/
│       ├── hooks/
│       └── assets/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   │   ├── weather/
│   │   ├── markets/
│   │   ├── satellite/
│   │   ├── ai/
│   │   └── notifications/
│   ├── sockets/
│   ├── jobs/
│   └── utils/
├── README.md
├── IMPLEMENTATION_STATUS.md
└── .gitignore
18. Development Phases
Phase 1 - Foundation - Inspect existing repository. - Set up
frontend, backend, and MongoDB. - Implement authentication and roles. -
Create shared layouts and role-based dashboards. - Add environment
validation and error handling.

Phase 2 - Weather and Agriculture - Integrate a real weather
provider. - Add location selection and forecasts. - Integrate a verified
mandi-price source. - Build farmer profiles and crop advisory. - Add AI
assistant with source data and timestamps.

Phase 3 - Climate Monitoring - Integrate supported official
warnings. - Add climate alert storage and history. - Add available
satellite data integration. - Build map layers and risk indicators. -
Label data sources and uncertainty.

Phase 4 - Resource Management - Implement device registration and
authentication. - Receive actual sensor readings. - Add resource history
and threshold alerts. - Build resource dashboards. - Do not create
simulated readings.

Phase 5 - Emergency and Relief Logistics - Implement emergency
reporting and verification. - Add warehouses and inventory. - Add
vehicle and team management. - Implement relief orders and delivery
status. - Integrate route planning where a supported provider is
configured.

Phase 6 - Real-Time and AI - Add authenticated Socket.IO events. -
Add persisted notifications. - Integrate Gemini for context-grounded
assistance. - Test provider failures and stale data handling.

Phase 7 - Testing and Deployment - Test APIs and role permissions. -
Test real provider integrations. - Test mobile responsiveness. -
Configure persistent storage and production secrets. - Document
deployment, backups, and monitoring.
19. Acceptance Criteria
The application is complete only when: 1. Users can register, log in,
and access permitted modules. 2. Weather data comes from a real
configured provider. 3. Weather observations and forecasts show source
and timestamps. 4. Mandi prices come from an actual configured source or
are shown as unavailable. 5. AI farming advice uses retrieved context
and farmer input. 6. Climate alerts are traceable to their sources. 7.
Satellite data appears only when a real integration is configured. 8.
Resource readings come from authenticated devices or verified APIs. 9.
Emergency reports are stored and tracked in MongoDB. 10. Officers can
manage verified emergencies and relief operations. 11. Inventory changes
and deliveries are recorded and auditable. 12. Real-time events are
authenticated and authorized. 13. Dashboards use actual records and
provider data. 14. Empty and unavailable states never contain fake
readings or records. 15. The application works on desktop and mobile.
20. Instructions for Codex
Build this specification as a working MERN application, not a static UI
prototype.
1. Read this complete spec.md before editing.
2. Inspect the existing repository and preserve working code.
3. Report current architecture, missing features, and implementation
   plan.
4. Create or update IMPLEMENTATION_STATUS.md.
5. Implement one phase at a time.
6. Connect features to real APIs, providers, devices, and MongoDB
   records.
7. Do not add demo users, demo emergencies, fake sensor readings,
   sample prices, static statistics, or mock provider responses to the
   running application.
8. Use fixtures only in isolated automated tests. Never seed them into
   the normal application database.
9. If credentials or an integration are missing, implement the
   integration boundary and show a clear not-configured state. Ask for
   required credentials or decisions; do not fabricate data.
10. After each phase, report changed files, APIs, workflows, tests
    actually run, environment variables, and remaining blockers.
11. Do not mark a feature complete until implemented and tested.
12. Update README with setup, environment variables, provider
    configuration, API details, and deployment instructions.


