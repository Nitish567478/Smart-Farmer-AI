# Climate Pulse AI • Kisan Agro Command
### 🌾 स्मार्ट कृषि, जलवायु बुद्धिमत्ता एवं किसान सशक्तिकरण मंच
> **Predict Risks. Protect Harvests. Empower Farmers.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-In--Memory%20Fallback-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?logo=google&logoColor=white)](https://aistudio.google.com/)

---

## 📌 Overview

**Climate Pulse AI** is an advanced smart agricultural intelligence and climate resilience platform designed exclusively for Indian farmers. It bridges meteorological science, multimodal generative AI, and real-time market economics into a unified, responsive command center.

From **real-time live camera crop disease scanning** to **daily APMC wholesale mandi rates**, **government MSP benchmarks**, and **satellite-grounded weather advisories**, Climate Pulse AI puts actionable, localized agronomic power directly in the hands of the farmer.

---

## 🚀 Key Modules & Capabilities

### 1. 🩺 AI Kisan Doctor & Multimodal Agronomist (एआई किसान डॉक्टर)
- **Real-Time Live Camera Scanner:** Integrated live webcam/phone camera scanner (`navigator.mediaDevices.getUserMedia`) featuring live targeting reticle, animated laser sweep, and instant snapshot capture.
- **Multimodal AI Vision Diagnosis:** Powered by Google Gemini 2.5. Identifies plant leaf blights, fungal infections, pest infestations, and nutrient deficiencies.
- **Actionable Remediation Protocol:** Step-by-step chemical dosages, organic/biological alternatives, irrigation timing, and preventive cultural practices.
- **Audio TTS Read-Aloud:** Native browser SpeechSynthesis speaks back diagnosis and prescriptions in clear Hindi and English.
- **Kisan Call Center Direct Access:** 1-tap dial button linking directly to Government Kisan Call Center **1551**.

### 2. 📊 National Mandi Rates & Govt MSP Barometer (राष्ट्रीय मंडी भाव)
- **Live APMC Market Integration:** Query real-time daily wholesale prices across Indian state mandis (Punjab, Haryana, Uttar Pradesh, Bihar, Maharashtra, Madhya Pradesh, Jharkhand, etc.).
- **Govt MSP Comparison Engine:** Automatic price-spread calculation comparing local market modal prices against official Government Minimum Support Price (MSP) benchmarks (Paddy, Wheat, Mustard, Maize, Cotton, Soybean).
- **Interactive Commodity Filtering:** Quick-filter chips for staple grains, pulses, oilseeds, and vegetables.

### 3. 📅 Crop Sowing Matrix & Calendar (फसल बुवाई कैलेंडर)
- **Seasonal Crop Roadmap:** Comprehensive guide for Kharif, Rabi, and Zaid cultivation cycles.
- **Agronomic Parameters:** Soil temperature ranges, optimal seed rates per acre, spacing recommendations, water consumption metrics, and maturity harvest windows.

### 4. 🧪 Soil Health Card & NPK Laboratory (मृदा स्वास्थ्य कार्ड)
- **Digital Soil Health Card:** Calibrate Nitrogen (N), Phosphorus (P), and Potassium (K) levels, soil pH balance, and organic carbon percentage.
- **Crop-Specific Soil Suitability:** Grounded recommendations based on soil types (Alluvial, Black, Clay, Loam, Sandy Loam).

### 5. ⚖️ Fertilizer & NPK Calculator (खाद व उर्वरक गणक)
- **Accurate Dosage Estimator:** Calculates exact commercial fertilizer requirements (Urea, DAP, MOP, SSP) based on target crop and land acreage.
- **Cost & Waste Optimization:** Prevents over-fertilization, soil degradation, and unnecessary farmer expenditure.

### 6. 🏛️ Government Kisan Schemes & Subsidies (सरकारी योजनाएं)
- **Official Welfare Schemes Directory:** Step-by-step guides, eligibility criteria, and application links for:
  - PM-Kisan Samman Nidhi (₹6,000/year direct DBT)
  - Pradhan Mantri Fasal Bima Yojana (PMFBY Crop Insurance)
  - Kisan Credit Card (KCC Low-Interest Loans)
  - Soil Health Card Scheme & Solar Pump PM-KUSUM Subsidy

### 7. 🌦️ Weather & Climate Risk Radar (कृषि मौसम व जोखिम)
- **Hyper-Local Meteorological Telemetry:** Powered by the Open-Meteo API (temperature, feels-like, humidity, wind velocity, precipitation probability, surface pressure).
- **NOAA & IMD Scientific Hazard Formulations:**
  - **Heat Hazard Index:** NOAA apparent temperature equation.
  - **Heavy Rainfall & Flood Threat:** Calibrated against IMD precipitation intensity thresholds.
  - **Drought Stress:** Evaluates consecutive dry days and sustained high-temperature anomalies.
- **Interactive Geospatial Risk Map:** Built on Leaflet and OpenStreetMap with toggleable overlays.

### 8. 🔐 Modern Authentication & Split-Screen UX (लॉगिन व पंजीकरण)
- **Visual Split-Screen Layout:** High-resolution agriculture imagery with deep emerald glassmorphism showcase panel.
- **1-Click Demo Fill:** Instant test account auto-fill (`farmer@kisan.in` / `farmer123`) for hackathon evaluators and judges.
- **Password Visibility Toggles:** Clean eye icon toggle for seamless mobile typing.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose & Details |
|---|---|---|
| **Frontend** | React 18 + Vite | Single Page Application with fast HMR |
| **Styling** | Tailwind CSS | Luxury emerald/forest theme (`#0c2420`, `#123B35`, `#168A70`) |
| **Backend** | Node.js + Express.js | Modular REST API controllers and security middleware |
| **Database** | MongoDB + Mongoose | Schema validation and persistence |
| **In-Memory DB** | MongoMemoryServer | Automatic embedded zero-config database fallback |
| **Real-Time** | Socket.IO | Real-time WebSocket events and mandi price ticks |
| **AI Vision & LLM**| Google Gemini API | Multimodal leaf vision diagnosis and bilingual agronomic reasoning |
| **Weather** | Open-Meteo API | Free, open-access global meteorological telemetry |
| **Mandi Dataset** | Agmarknet / data.gov.in | Official APMC agricultural market data |
| **Camera & Audio** | WebRTC & Web Speech | Live device webcam camera scanner and TTS read-aloud |
| **Mapping** | Leaflet + OpenStreetMap | Interactive geospatial risk map |

---

## 📋 Prerequisites

- **Node.js**: `v18.0.0` or higher (tested on Node.js v22+)
- **npm**: `v9.0.0` or higher
- **MongoDB** *(Optional)*: If a local MongoDB instance is not detected, the backend **automatically boots an embedded in-memory database (`MongoMemoryServer`)**, ensuring the platform runs immediately with zero external dependencies!

---

## ⚡ Quick Start & Local Setup

### 1. Clone or Open Workspace
```bash
cd "c:\Users\HP\OneDrive\Desktop\Online Hackathon"
```

### 2. Install Dependencies
Install dependencies for both the backend server and frontend client:
```bash
npm run install-all
```
*(Or manually: `cd server && npm install && cd ../client && npm install`)*

---

## ⚙️ Environment Variables

### Server Configuration (`server/.env`)
The backend comes pre-configured with a ready-to-use `.env` file:

```ini
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Connection (Auto falls back to in-memory DB if unavailable)
MONGODB_URI=mongodb://127.0.0.1:27017/climate_pulse_ai

# JWT Authentication Secret
JWT_SECRET=climate_pulse_super_secret_jwt_key_2026_change_in_production
JWT_EXPIRES_IN=7d

# Google Gemini API Key (Required for AI Kisan Doctor & Vision Diagnosis)
# Get a free key at: https://aistudio.google.com/
GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Official Mandi & Copernicus Credentials
DATA_GOV_IN_API_KEY=
COPERNICUS_CLIENT_ID=
COPERNICUS_CLIENT_SECRET=
```

---

## 🏃 Running the Application

### Method 1: Concurrent Development (Recommended)

1. **Start the Backend Server (Terminal 1):**
   ```bash
   cd server
   npm run dev
   ```
   *The Express API and WebSocket server starts on `http://localhost:5000`.*

2. **Start the Frontend Client (Terminal 2):**
   ```bash
   cd client
   npm run dev
   ```
   *The Vite frontend starts on `http://localhost:5173`.*

3. Open your browser and navigate to:
   👉 **`http://localhost:5173`**

---

### Method 2: Single-Server Production Build

```bash
# 1. Build the React client
cd client
npm run build

# 2. Run the Express production server
cd ../server
npm start
```
*Access the unified application at **`http://localhost:5000`**.*

---

## 🧪 Automated Testing

A comprehensive integration test suite verifies:
- User registration, login, and JWT issuance
- Open-Meteo meteorological API integration and caching
- NOAA Heat Index and IMD rainfall hazard calculations
- Gemini AI prompt grounding and crop advisory endpoints

Run tests from the `server` directory:
```bash
cd server
npm test
```

---

## 🔑 Demo Access for Evaluators

For fast evaluation during hackathon judging, click the **"ऑटो भरें (Fill)"** button on the Login page or use:

| Field | Demo Value |
|---|---|
| **Role** | Farmer (किसान) |
| **Email** | `farmer@kisan.in` |
| **Password** | `farmer123` |

---

## 📄 Key REST API Endpoints

All backend endpoints are prefixed with `/api`:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new farmer account |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT token |
| `GET` | `/api/auth/profile` | Retrieve authenticated farmer profile |
| `GET` | `/api/weather/current?lat=...&lon=...` | Live Open-Meteo observations |
| `GET` | `/api/weather/forecast?lat=...&lon=...` | 7-day daily and 24h hourly forecast |
| `GET` | `/api/climate/risks?lat=...&lon=...` | Calculated Heat, Flood & Drought hazard indices |
| `GET` | `/api/climate/alerts` | Active meteorological warnings |
| `GET` | `/api/markets/prices` | APMC wholesale mandi rates & MSP |
| `POST` | `/api/agriculture/chat` | AI Kisan Doctor multimodal diagnosis & advice |
| `GET` | `/api/agriculture/chat/history` | Retrieve past AI Doctor consultations |

---

## 🛡️ Design Principles

- **100% Dedicated to Farmers:** Streamlined navigation with zero unrelated clutter or bloated enterprise workflows.
- **Zero Mock Data in Production:** Live weather is retrieved directly from Open-Meteo; mandi rates reflect official APMC benchmarks.
- **Multilingual First-Class Citizen:** Complete Hindi (हिन्दी) and English support with native voice recognition and speech synthesis.
- **Embedded Database Fallback:** Automatic in-memory database prevents broken builds or database connection roadblocks.

---

## 📜 License
MIT License. Built with passion for **Hackathon 2026**.
