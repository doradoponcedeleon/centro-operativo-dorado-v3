const fetch = require('node-fetch');

const SUPABASE_URL = 'https://htyhdphejfqnenijqmzx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_40umu31NsJhUaSPFuUSsNQ_j25MgkLK';

async function saveData(payload){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/datos`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({
      contenido: payload
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`saveData error: ${res.status} ${text}`);
  }

  return await res.json();
}

async function loadData(){
  const res = await fetch(`${SUPABASE_URL}/rest/v1/datos?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`loadData error: ${res.status} ${text}`);
  }

  return await res.json();
}

module.exports = { saveData, loadData };
