function exportExchangeBundle(){
  const payload = {
    version: CONFIG.VERSION,
    exported_at: nowText(),
    proyectos: state.proyectos,
    ideas: state.ideas,
    bitacora: state.bitacora,
    modulos: state.modulos,
    resultados: state.resultados
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'cod-v3-exchange.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function importExchangeBundle(file){
  const reader = new FileReader();

  reader.onload = ()=>{
    try{
      const data = JSON.parse(reader.result);
      state.proyectos = data.proyectos || [];
      state.ideas = data.ideas || [];
      state.bitacora = data.bitacora || [];
      state.modulos = data.modulos || [];
      state.resultados = data.resultados || [];

      saveState();
      renderAll();
      addBitacora('Importación exchange ejecutada', { tipo: 'exchange', accion: 'import' });
      saveState();
    }catch(err){
      console.error(err);
      alert('JSON inválido');
    }
  };

  reader.readAsText(file);
}
