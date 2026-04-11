const http = require('http');
const syncRoute = require('./routes/sync.routes');

const PORT = 9301;

function sendJson(res, code, data){
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if(req.method === 'OPTIONS'){
    res.writeHead(204);
    return res.end();
  }

  try {
    if(syncRoute(req, res)) return;

    return sendJson(res, 404, {
      ok: false,
      error: 'Ruta no encontrada'
    });

  } catch (e) {
    console.error('ERROR SERVER:', e);

    return sendJson(res, 500, {
      ok: false,
      error: e.message
    });
  }

});

server.listen(PORT, () => {
  console.log('Servidor en http://127.0.0.1:' + PORT);
});
