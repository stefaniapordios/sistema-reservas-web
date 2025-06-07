const form = document.getElementById('formulario');
const tipo = document.getElementById('tipo');
const fecha = document.getElementById('fechaClase');
const horarioSelect = document.getElementById('horario');
const respuesta = document.getElementById('respuesta');

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz5ZcOfe3FiDtMzohhweD1JPrD0jfBw8qmV9bnq2Tb8SyL1Fxpcif5iJHnHqjoQge4/exec";

async function cargarHorarios() {
  if (!tipo.value || !fecha.value) return;

  const res = await fetch(`${SCRIPT_URL}?tipo=${tipo.value}&fecha=${fecha.value}`);
  const horariosDisponibles = await res.json();

  horarioSelect.innerHTML = '<option value="">Selecciona un horario</option>';
  horariosDisponibles.forEach(h => {
    const option = document.createElement('option');
    option.value = h;
    option.textContent = h;
    horarioSelect.appendChild(option);
  });
}

tipo.addEventListener('change', cargarHorarios);
fecha.addEventListener('change', cargarHorarios);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body: formData
  });
  const texto = await res.text();
  respuesta.textContent = texto;
});
