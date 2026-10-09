import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import https from 'https';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'serpapi-dev-middleware',
        configureServer(server) {
          server.middlewares.use('/api/search', (req, res) => {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const query = url.searchParams.get('q') || 'freelance trends';
            const apiKey = env.SERPAPI_KEY || env.VITE_SERPAPI_KEY || process.env.SERPAPI_KEY || '';

            if (!apiKey || apiKey === 'your_serpapi_key_here') {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 400;
              res.end(JSON.stringify({ 
                error: 'SERPAPI_KEY is not configured in .env',
                message: 'Please add your SERPAPI_KEY in .env file.' 
              }));
              return;
            }

            const serpUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${apiKey}`;
            https.get(serpUrl, (serpRes) => {
              let data = '';
              serpRes.on('data', chunk => data += chunk);
              serpRes.on('end', () => {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = serpRes.statusCode || 200;
                res.end(data);
              });
            }).on('error', (err) => {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to contact SerpApi', details: err.message }));
            });
          });

          server.middlewares.use('/api/health', (req, res) => {
            const apiKey = env.SERPAPI_KEY || env.VITE_SERPAPI_KEY || process.env.SERPAPI_KEY || '';
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'ok',
              hasSerpApiKey: Boolean(apiKey && apiKey !== 'your_serpapi_key_here')
            }));
          });
        }
      }
    ],
    server: {
      port: 5173
    }
  };
});
