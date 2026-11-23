const axios = require('axios');
const ExternalDataRecord = require('../../models/ExternalDataRecord');


const getSatelliteProducts = async ({ latitude, longitude, maxCloudCover = 20 }) => {
  const clientId = process.env.COPERNICUS_CLIENT_ID;
  const clientSecret = process.env.COPERNICUS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return {
      configured: false,
      provider: 'Copernicus Data Space Ecosystem (European Space Agency)',
      sourceUrl: 'https://dataspace.copernicus.eu/',
      message: 'Copernicus Data Space credentials are not configured. To query real Sentinel-1/2 products, configure COPERNICUS_CLIENT_ID and COPERNICUS_CLIENT_SECRET in server/.env.',
      products: []
    };
  }

  try {
    const tokenUrl = 'https://identity.dataspace.copernicus.eu/auth/realms/CDSE/protocol/openid-connect/token';
    const authParams = new URLSearchParams();
    authParams.append('client_id', clientId);
    authParams.append('client_secret', clientSecret);
    authParams.append('grant_type', 'client_credentials');

    const authRes = await axios.post(tokenUrl, authParams.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 8000
    });
    const accessToken = authRes.data.access_token;

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const delta = 0.1;
    const polygon = `POLYGON((${lon - delta} ${lat - delta}, ${lon + delta} ${lat - delta}, ${lon + delta} ${lat + delta}, ${lon - delta} ${lat + delta}, ${lon - delta} ${lat - delta}))`;

    const catalogUrl = `https://catalogue.dataspace.copernicus.eu/odata/v1/Products?$filter=Collection/Name eq 'SENTINEL-2' and OData.CSC.Intersects(area=geography'SRID=4326;${polygon}') and Attributes/OData.CSC.DoubleAttribute/any(att:att/Name eq 'cloudCover' and att/OData.CSC.DoubleAttribute/Value le ${maxCloudCover})&$orderby=ContentDate/Start desc&$top=5`;

    const catalogRes = await axios.get(catalogUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
      timeout: 10000
    });

    const products = (catalogRes.data.value || []).map((prod) => ({
      id: prod.Id,
      name: prod.Name,
      contentDate: prod.ContentDate?.Start,
      footprint: prod.Footprint,
      contentLength: prod.ContentLength,
      downloadUrl: `https://zipper.dataspace.copernicus.eu/odata/v1/Products(${prod.Id})/$value`
    }));

    return {
      configured: true,
      provider: 'Copernicus Data Space',
      sourceUrl: 'https://dataspace.copernicus.eu/',
      coordinates: { latitude: lat, longitude: lon },
      products
    };
  } catch (error) {
    console.error('[Copernicus Service Error]', error.message);
    return {
      configured: true,
      provider: 'Copernicus Data Space',
      error: `Copernicus API error: ${error.message}`,
      products: []
    };
  }
};

module.exports = { getSatelliteProducts };
