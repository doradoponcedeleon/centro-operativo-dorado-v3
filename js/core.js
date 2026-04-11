const $ = (id) => document.getElementById(id);

const CONFIG = {
  APP_NAME: 'Centro Operativo Dorado v3',
  VERSION: '3.0.0',
  DEBUG: true
};

const KEYS = {
  STATE: 'cod-v3-state'
};

const ENUMS = {
  PROJECT_STATUS: ['activo','pausado','completo'],
  IDEA_PRIORITY: ['baja','media','alta'],
  RESULT_TYPES: ['app','documento','modulo','prototipo']
};

const state = {
  session: {
    currentView: 'inicio',
    syncStatus: 'local'
  },
  proyectos: [],
  ideas: [],
  bitacora: [],
  modulos: [],
  resultados: []
};

const views = {
  inicio: 'view-inicio',
  dashboard: 'view-dashboard',
  proyectos: 'view-proyectos',
  ideas: 'view-ideas',
  bitacora: 'view-bitacora',
  modulos: 'view-modulos',
  resultados: 'view-resultados',
  importexport: 'view-importexport',
  manual: 'view-manual'
};

function makeId(prefix='id'){
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
}

function nowText(){
  return new Date().toLocaleString();
}

function escapeHtml(str=''){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#39;");
}
