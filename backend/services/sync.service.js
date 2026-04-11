const supabaseAdapter = require('../adapters/supabase.adapter');

async function syncPush(payload){
  return await supabaseAdapter.saveData(payload);
}

async function syncPull(){
  return await supabaseAdapter.loadData();
}

module.exports = { syncPush, syncPull };
