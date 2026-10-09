import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually if dotenv is not installed
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...values] = trimmed.split('=');
      if (key && values.length > 0) {
        process.env[key.trim()] = values.join('=').trim();
      }
    }
  }
}

loadEnv();

const PORT = process.env.PORT || 5000;
const SERPAPI_KEY = process.env.SERPAPI_KEY || process.env.VITE_SERPAPI_KEY || '';

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

  if (reqUrl.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      hasSerpApiKey: Boolean(SERPAPI_KEY && SERPAPI_KEY !== 'your_serpapi_key_here') 
    }));
    return;
  }

  if (reqUrl.pathname === '/api/search') {
    const query = reqUrl.searchParams.get('q') || 'freelance software engineering';
    
    if (!SERPAPI_KEY || SERPAPI_KEY === 'your_serpapi_key_here') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'SERPAPI_KEY is not configured in .env', 
        message: 'Please add your SERPAPI_KEY in the .env file in the project root.' 
      }));
      return;
    }

    const serpUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`;
    
    https.get(serpUrl, (serpRes) => {
      let data = '';
      serpRes.on('data', chunk => data += chunk);
      serpRes.on('end', () => {
        res.writeHead(serpRes.statusCode || 200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
    }).on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to contact SerpApi', details: err.message }));
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`SkillMatch API & SerpApi proxy running at http://localhost:${PORT}`);
  if (SERPAPI_KEY && SERPAPI_KEY !== 'your_serpapi_key_here') {
    console.log(`SerpApi key loaded successfully.`);
  } else {
    console.log(`Warning: SERPAPI_KEY not found or using default placeholder in .env.`);
  }
});
