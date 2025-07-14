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
    div.innerHTML = `<h3>Período ${periodo}</h3>`;

    const materiasPeriodo = materias.filter(m => m.periodo === periodo);
    for (let m of materiasPeriodo) {
      const matDiv = document.createElement('div');
      matDiv.className = `materia ${m.tipologia}`;
      matDiv.innerText = m.nombre;

      const aprobada = materiasAprobadas.has(m.id);
      const correlativasAprobadas = m.correlativas.every(cid => materiasAprobadas.has(cid));

      if (!aprobada && !correlativasAprobadas) {
        matDiv.classList.add("bloqueada");
        matDiv.setAttribute("data-correlativas", `Faltan: ${m.correlativas.filter(cid => !materiasAprobadas.has(cid)).join(', ')}`);
      }

      if (aprobada) {
        matDiv.classList.add("aprobada");
      }

      matDiv.addEventListener("click", () => {
        if (aprobada) {
          materiasAprobadas.delete(m.id);
        } else if (correlativasAprobadas || m.correlativas.length === 0) {
          materiasAprobadas.add(m.id);
        }
        renderizarMalla(); // Redibujar todo
      });

      div.appendChild(matDiv);
    }

    container.appendChild(div);
  }
}

cargarMalla();
