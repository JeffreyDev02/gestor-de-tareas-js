const tareas = [
  {
    id: 1,
    titulo: "Preparar reporte",
    estado: "Pendiente",
    fechaCreacion: "2025-09-01",
    fechaVencimiento: "2025-09-12",
    usuario: "Maria Lopez",
    rol: "administrador"
  },
  {
    id: 2,
    titulo: "Enviar facturas",
    estado: "Completada",
    fechaCreacion: "2025-08-15",
    fechaVencimiento: "2025-09-01",
    usuario: "Carlos Gómez",
    rol: "normal"
  },
  {
    id: 3,
    titulo: "Revisión de proyecto",
    estado: "Completada",
    fechaCreacion: "2025-09-05",
    fechaVencimiento: "2025-09-09",
    usuario: "Ana Torres",
    rol: "administrador"
  },
  {
    id: 4,
    titulo: "Revisión de boleto",
    estado: "Pendiente",
    fechaCreacion: "2025-09-05",
    fechaVencimiento: "2025-09-09",
    usuario: "Ana Garcia",
    rol: "normal"
  },
  {
    id: 5,
    titulo: "Enviar Facutra",
    estado: "Pendiente",
    fechaCreacion: "2025-09-10",
    fechaVencimiento: "2025-09-12",
    usuario: "Estaba cruz",
    rol: "normal"
  },
  {
    id: 6,
    titulo: "Creacion de usuario",
    estado: "Pendiente",
    fechaCreacion: "2025-09-10",
    fechaVencimiento: "2025-09-12",
    usuario: "Pedro Infante",
    rol: "normal"
  },
  {
    id: 7,
    titulo: "Supervisar area de marketing",
    estado: "Pendiente",
    fechaCreacion: "2025-09-13",
    fechaVencimiento: "2025-09-15",
    usuario: "Pedro Infante",
    rol: "normal"
  },
  {
    id: 8,
    titulo: "Hacer limpieza al cuarto",
    estado: "Completada",
    fechaCreacion: "2025-09-10",
    fechaVencimiento: "2025-09-12",
    usuario: "Carlos Gómez",
    rol: "normal"
  },
  {
    id: 9,
    titulo: "Creacion de roles",
    estado: "Pendiente",
    fechaCreacion: "2025-09-13",
    fechaVencimiento: "2025-09-16",
    usuario: "Ana Torres",
    rol: "administrador"
  },
  {
    id: 10,
    titulo: "Subir cambios",
    estado: "Pendiente",
    fechaCreacion: "2025-09-13",
    fechaVencimiento: "2025-09-20",
    usuario: "Jeoffrey Carino",
    rol: "normal"
  }

];

//Guardar la tareas en el localStorage
//localStorage.clear();
if (!localStorage.getItem("tareas")) {
  localStorage.setItem("tareas", JSON.stringify(tareas))
}

let usuarioActual = { usuario: "" };

function cargarTareas(filtro = "") {

  const tbody = document.getElementById('tablaTareas');
  tbody.innerHTML = "";

  const hoy = new Date().toLocaleDateString("en-CA");

  const tareasLocal = JSON.parse(localStorage.getItem("tareas"));

  const esAdmin = tareasLocal.some(
    tarea => tarea.usuario === usuarioActual.usuario && tarea.rol === "administrador"
  );

  tareasLocal.forEach(tarea => {

    if (!esAdmin) return;

    if (filtro && tarea.usuario != filtro) return
    const tr = document.createElement('tr');

    if (tarea.fechaVencimiento < hoy && tarea.estado === 'Pendiente') {
      tr.classList.add('tarea-vencida');
    }

    tr.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.titulo}</td>
            <td>
              <input type="checkbox" class="check-completada" data-id="${tarea.id}" ${tarea.estado === "Completada" ? "checked" : ""}/>
            </td>
            <td>${tarea.fechaCreacion}</td>
            <td>${tarea.fechaVencimiento}</td>
            <td>${tarea.usuario}</td>
        `

    tbody.appendChild(tr);
  });

  // Escuchar cambios en los checkboxes
  document.querySelectorAll('.check-completada').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      const tareasLocal = JSON.parse(localStorage.getItem("tareas"));

      const tarea = tareasLocal.find(t => t.id === id);
      if (tarea) {
        tarea.estado = e.target.checked ? "Completada" : "Pendiente";
        localStorage.setItem("tareas", JSON.stringify(tareasLocal));
        cargarTareas(filtroUsuario.value); 
      }
    });
  });


}

document.addEventListener("DOMContentLoaded", () => {
  const btnUsuario = document.getElementById("btnUsuario");
  const inputUsuario = document.getElementById("inputUsuario");

  btnUsuario.addEventListener("click", () => {
    usuarioActual.usuario = inputUsuario.value;
    cargarTareas();
  });
})

const filtroUsuario = document.getElementById("filtroUsuario");
filtroUsuario.addEventListener("change", () => {
  cargarTareas(filtroUsuario.value);
});


