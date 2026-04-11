function bindNavigation(){
  document.querySelectorAll('.navbtn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      setView(btn.dataset.view);
    });
  });
}

function bindImportExport(){
  $('btn-export-json').addEventListener('click', exportLocalBundle);
  $('file-import-json').addEventListener('change', (e)=>{
    const file = e.target.files?.[0];
    if(file) importLocalBundle(file);
  });
}

function bindSync(){
  const btnSync = document.getElementById('btn-sync');
  if(btnSync){
    btnSync.addEventListener('click', async ()=>{
      await syncToBackend();
    });
  }
}

async function syncToBackend(){
  try{
    const payload = {
      proyectos: state.proyectos,
      ideas: state.ideas,
      bitacora: state.bitacora,
      resultados: state.resultados
    };

    const res = await fetch('http://127.0.0.1:9301/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('SYNC OK:', data);

    $('sync-status').textContent = 'Sincronización: OK backend';

    addBitacora('Sincronización ejecutada', { type: 'sync_backend' });
    saveState();
    renderAll();

  }catch(e){
    console.error(e);
    $('sync-status').textContent = 'Error sync backend';
  }
}

async function boot(){
  loadState();
  bindNavigation();
  bindProjects();
  bindIdeas();
  bindBitacora();
  bindModules();
  bindResults();
  bindImportExport();
  bindSync();
  renderAll();
  setView('inicio');
  renderClock();
  setInterval(renderClock, 1000);
}

boot();
