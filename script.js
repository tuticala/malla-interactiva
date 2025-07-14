let materias = [];
let materiasMap = {};
let materiasAprobadas = new Set();

async function cargarMalla() {
  const res = await fetch('data.json');
  materias = await res.json();
  materiasMap = Object.fromEntries(materias.map(m => [m.id, m]));

  renderizarMalla();
}

function renderizarMalla() {
  const container = document.getElementById('malla-container');
  container.innerHTML = "";

  const periodos = [...new Set(materias.map(m => m.periodo))].sort((a, b) => a - b);

  for (let periodo of periodos) {
    const div = document.createElement('div');
    div.className = 'periodo';
    div
