const { saveData, loadData } = require('../adapters/supabase.adapter');

function syncRoute(req, res) {

  // POST
  if (req.url === '/api/sync' && req.method === 'POST') {
    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        await saveData(data);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));

      } catch (e) {
        console.error('ERROR SYNC:', e);

        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: false,
          error: e.message
        }));
      }
    });

    return true;
  }

  // GET
  if (req.url === '/api/sync' && req.method === 'GET') {
    (async () => {
      try {
        const data = await loadData();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));

      } catch (e) {
        console.error('ERROR LOAD:', e);

        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: false,
          error: e.message
        }));
      }
    })();

    return true;
  }

  return false;
}

module.exports = syncRoute;
