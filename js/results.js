function bindResults(){
  $('btn-add-result').addEventListener('click', ()=>{
    const titulo = $('result-title').value.trim();
    const tipo = $('result-type').value;

    if(!titulo) return;

    state.resultados.push({
      id: makeId('res'),
      titulo,
      tipo,
      estado: 'interno'
    });

    addBitacora(`Resultado agregado: ${titulo}`, { tipo: 'resultado', accion: 'crear' });
    saveState();
    renderAll();

    $('result-title').value = '';
  });

  $('results-list').addEventListener('click', (e)=>{
    const id = e.target.getAttribute('data-del-result');
    if(!id) return;
    const found = state.resultados.find(r=>r.id===id);
    state.resultados = state.resultados.filter(r=>r.id!==id);
    addBitacora(`Resultado eliminado: ${found?.titulo || id}`, { tipo: 'resultado', accion: 'eliminar' });
    saveState();
    renderAll();
  });
}
