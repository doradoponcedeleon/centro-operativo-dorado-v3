const DB_NAME = 'cod_v3_db';
const DB_VERSION = 1;
const DB_STORES = ['ideas','bitacora','resultados'];

function saveState(){
  localStorage.setItem(KEYS.STATE, JSON.stringify({
    proyectos: state.proyectos,
    modulos: state.modulos,
    session: state.session
  }));

  writeStore('ideas', state.ideas);
  writeStore('bitacora', state.bitacora);
  writeStore('resultados', state.resultados);
}

function loadState(){
  try{
    const raw = localStorage.getItem(KEYS.STATE);
    if(raw){
      const data = JSON.parse(raw);
      state.proyectos = data.proyectos || [];
      state.modulos = data.modulos || [];
      state.session = data.session || state.session;
    }
  }catch(e){
    console.error('Error loadState', e);
  }

  loadIndexedData();
}

function openDB(){
  return new Promise((resolve,reject)=>{
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = ()=>{
      const db = req.result;
      DB_STORES.forEach(name=>{
        if(!db.objectStoreNames.contains(name)){
          db.createObjectStore(name, { keyPath:'id' });
        }
      });
    };

    req.onsuccess = ()=>resolve(req.result);
    req.onerror = ()=>reject(req.error);
  });
}

async function writeStore(storeName, list){
  const db = await openDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  store.clear();
  (list || []).forEach(item=>store.put(item));
}

async function readStore(storeName){
  const db = await openDB();
  const tx = db.transaction(storeName, 'readonly');
  const store = tx.objectStore(storeName);
  const req = store.getAll();

  return await new Promise(resolve=>{
    req.onsuccess = ()=>resolve(req.result || []);
    req.onerror = ()=>resolve([]);
  });
}

async function loadIndexedData(){
  state.ideas = await readStore('ideas');
  state.bitacora = await readStore('bitacora');
  state.resultados = await readStore('resultados');
  renderAll();
}

function exportLocalBundle(){
  const payload = {
    proyectos: state.proyectos,
    ideas: state.ideas,
    bitacora: state.bitacora,
    modulos: state.modulos,
    resultados: state.resultados,
    exported_at: nowText(),
    version: CONFIG.VERSION
  };

  const blob = new Blob([JSON.stringify(payload,null,2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'centro-operativo-dorado-v3.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function importLocalBundle(file){
  const reader = new FileReader();

  reader.onload = async ()=>{
    try{
      const data = JSON.parse(reader.result);
      state.proyectos = data.proyectos || [];
      state.ideas = data.ideas || [];
      state.bitacora = data.bitacora || [];
      state.modulos = data.modulos || [];
      state.resultados = data.resultados || [];

      saveState();
      renderAll();
      addBitacora('Importación local ejecutada');
      saveState();
    }catch(err){
      console.error(err);
      alert('JSON inválido');
    }
  };

  reader.readAsText(file);
}
