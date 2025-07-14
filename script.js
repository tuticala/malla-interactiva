async function cargarMalla() {
  const res = await fetch('data.json');
  const materias = await res.json();

  const container = document.getElementById('malla-container');
  const periodos = [...new Set(materias.map(m => m.periodo))].sort((a, b) => a - b);

  for (let periodo of periodos) {
    const div = document.createElement('div');
    div.className = 'periodo';
    div.innerHTML = `<h3>Período ${periodo}</h3>`;
    
    const materiasPeriodo = materias.filter(m => m.periodo === periodo);
    for (let m of materiasPeriodo) {
      const matDiv = document.createElement('div');
      matDiv.className = `materia ${m.tipologia}`;
      matDiv.innerText = m.nombre;
      if (m.correlativas.length > 0) {
        matDiv.setAttribute('data-correlativas', 'Correlativas: ' + m.correlativas.join(', '));
      }
      div.appendChild(matDiv);
    }

    container.appendChild(div);
  }
}

cargarMalla();
