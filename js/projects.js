function bindProjects(){
  $('btn-add-project').addEventListener('click', ()=>{
    const nombre = $('project-name').value.trim();
    const estado = $('project-status').value;
    const next = $('project-next').value.trim();

    if(!nombre) return;

    state.proyectos.push({
      id: makeId('proy'),
      nombre,
      estado,
      next
    });

    addBitacora(`Proyecto creado: ${nombre}`, { tipo: 'proyecto', accion: 'crear' });
    saveState();
    renderAll();

    $('project-name').value = '';
    $('project-next').value = '';
  });

  $('projects-list').addEventListener('click', (e)=>{
    const id = e.target.getAttribute('data-del-project');
    if(!id) return;
    const found = state.proyectos.find(p=>p.id===id);
    state.proyectos = state.proyectos.filter(p=>p.id!==id);
    addBitacora(`Proyecto eliminado: ${found?.nombre || id}`, { tipo: 'proyecto', accion: 'eliminar' });
    saveState();
    renderAll();
  });
}
