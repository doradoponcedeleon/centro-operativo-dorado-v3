function addBitacora(texto, meta = {}){
  state.bitacora.push({
    id: makeId('bit'),
    ts: nowText(),
    texto,
    meta
  });
}

function bindBitacora(){
  $('btn-add-bitacora').addEventListener('click', ()=>{
    const texto = $('bitacora-text').value.trim();
    if(!texto) return;
    addBitacora(texto);
    saveState();
    renderAll();
    $('bitacora-text').value = '';
  });
}
