function bindIdeas(){
  $('btn-add-idea').addEventListener('click', ()=>{
    const titulo = $('idea-title').value.trim();
    const prioridad = $('idea-priority').value;
    const descripcion = $('idea-description').value.trim();

    if(!titulo) return;

    state.ideas.push({
      id: makeId('idea'),
      titulo,
      prioridad,
      descripcion
    });

    addBitacora(`Idea registrada: ${titulo}`, { tipo: 'idea', accion: 'crear' });
    saveState();
    renderAll();

    $('idea-title').value = '';
    $('idea-description').value = '';
  });

  $('ideas-list').addEventListener('click', (e)=>{
    const id = e.target.getAttribute('data-del-idea');
    if(!id) return;
    const found = state.ideas.find(i=>i.id===id);
    state.ideas = state.ideas.filter(i=>i.id!==id);
    addBitacora(`Idea eliminada: ${found?.titulo || id}`, { tipo: 'idea', accion: 'eliminar' });
    saveState();
    renderAll();
  });
}
