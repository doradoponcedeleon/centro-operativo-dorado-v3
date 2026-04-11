function registerModule(moduleData){
  state.modulos.push({
    id: makeId('mod'),
    name: moduleData.name,
    path: moduleData.path || '',
    url: moduleData.url || '',
    created_at: nowText()
  });
}

function bindModules(){
  $('btn-add-module').addEventListener('click', ()=>{
    const name = $('module-name').value.trim();
    const path = $('module-path').value.trim();
    const url = $('module-url').value.trim();

    if(!name) return;

    registerModule({ name, path, url });
    addBitacora(`Módulo registrado: ${name}`);
    saveState();
    renderAll();

    $('module-name').value = '';
    $('module-path').value = '';
    $('module-url').value = '';
  });

  $('modules-list').addEventListener('click', (e)=>{
    const id = e.target.getAttribute('data-del-module');
    if(!id) return;
    const found = state.modulos.find(m=>m.id===id);
    state.modulos = state.modulos.filter(m=>m.id!==id);
    addBitacora(`Módulo eliminado: ${found?.name || id}`);
    saveState();
    renderAll();
  });
}
