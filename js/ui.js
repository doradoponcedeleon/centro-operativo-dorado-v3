function setView(name){
  Object.entries(views).forEach(([key,id])=>{
    const el = $(id);
    if(el) el.classList.toggle('hidden', key !== name);
  });

  document.querySelectorAll('.navbtn').forEach(btn=>{
    btn.classList.toggle('active', btn.dataset.view === name);
  });

  state.session.currentView = name;
}

function renderDashboard(){
  $('kpi-proyectos').textContent = state.proyectos.length;
  $('kpi-ideas').textContent = state.ideas.length;
  $('kpi-bitacora').textContent = state.bitacora.length;
  $('kpi-resultados').textContent = state.resultados.length;

  const host = $('dash-next');
  host.innerHTML = '';

  const nexts = state.proyectos.filter(p=>p.next);
  if(!nexts.length){
    host.innerHTML = '<li class="small">Sin próximos pasos.</li>';
    return;
  }

  nexts.slice(0,8).forEach(p=>{
    const li = document.createElement('li');
    li.textContent = `${p.nombre} — ${p.next}`;
    host.appendChild(li);
  });
}

function renderProjects(){
  const host = $('projects-list');
  host.innerHTML = '';

  if(!state.proyectos.length){
    host.innerHTML = '<div class="card small">Sin proyectos.</div>';
    return;
  }

  state.proyectos.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(p.nombre)}</h3>
      <div class="small">Estado: ${escapeHtml(p.estado)}</div>
      <div class="small">Próximo: ${escapeHtml(p.next || '—')}</div>
      <div class="item-actions">
        <button class="btn" data-del-project="${p.id}">Eliminar</button>
      </div>
    `;
    host.appendChild(card);
  });
}

function renderIdeas(){
  const host = $('ideas-list');
  host.innerHTML = '';

  if(!state.ideas.length){
    host.innerHTML = '<div class="card small">Sin ideas.</div>';
    return;
  }

  state.ideas.forEach(i=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(i.titulo)}</h3>
      <div><span class="tag">${escapeHtml(i.prioridad)}</span></div>
      <p>${escapeHtml(i.descripcion || '')}</p>
      <div class="item-actions">
        <button class="btn" data-del-idea="${i.id}">Eliminar</button>
      </div>
    `;
    host.appendChild(card);
  });
}

function renderBitacora(){
  const host = $('bitacora-list');
  host.innerHTML = '';

  if(!state.bitacora.length){
    host.innerHTML = '<div class="card small">Sin registros.</div>';
    return;
  }

  state.bitacora.slice().reverse().forEach(b=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="small">${escapeHtml(b.ts)}</div>
      <div>${escapeHtml(b.texto)}</div>
    `;
    host.appendChild(card);
  });
}

function renderModules(){
  const host = $('modules-list');
  host.innerHTML = '';

  if(!state.modulos.length){
    host.innerHTML = '<div class="card small">Sin módulos.</div>';
    return;
  }

  state.modulos.forEach(m=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(m.name)}</h3>
      <div class="small">Ruta: ${escapeHtml(m.path || '—')}</div>
      <div class="small">URL: ${escapeHtml(m.url || '—')}</div>
      <div class="item-actions">
        <button class="btn" data-del-module="${m.id}">Eliminar</button>
      </div>
    `;
    host.appendChild(card);
  });
}

function renderResults(){
  const host = $('results-list');
  host.innerHTML = '';

  if(!state.resultados.length){
    host.innerHTML = '<div class="card small">Sin resultados.</div>';
    return;
  }

  state.resultados.forEach(r=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${escapeHtml(r.titulo)}</h3>
      <div><span class="tag">${escapeHtml(r.tipo)}</span></div>
      <div class="small">Estado: ${escapeHtml(r.estado || 'interno')}</div>
      <div class="item-actions">
        <button class="btn" data-del-result="${r.id}">Eliminar</button>
      </div>
    `;
    host.appendChild(card);
  });
}

function renderAll(){
  renderDashboard();
  renderProjects();
  renderIdeas();
  renderBitacora();
  renderModules();
  renderResults();
}

function renderClock(){
  $('clock').textContent = nowText();
}

function setSyncStatus(text){
  state.session.syncStatus = text;
  $('sync-status').textContent = `Estado: ${text}`;
}
