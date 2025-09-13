const tareas = [
    {
      id: 1,
      titulo: "Preparar reporte",
      estado: "Pendiente",
      fechaCreacion: "2025-09-01",
      fechaVencimiento: "2025-09-12",
      usuario: "María López",
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
      rol: "administrador"
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
      fechaCreacion : "2025-09-10",
      fechaVencimiento : "2025-09-12",
      usuario : "Pedro Infante",
      rol: "normal"
    }

  ];

  //Guardar la tareas en el localStorage
  localStorage.clear();
  if(!localStorage.getItem("tareas")){
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

        if(filtro && tarea.usuario != filtro) return
        const tr = document.createElement('tr');

        if(tarea.fechaVencimiento < hoy && tarea.estado === 'Pendiente'){
            tr.classList.add('tarea-vencida');
        }

        tr.innerHTML = `
            <td>${tarea.id}</td>
            <td>${tarea.titulo}</td>
            <td> ${tarea.estado}</td>
            <td>${tarea.fechaCreacion}</td>
            <td>${tarea.fechaVencimiento}</td>
            <td>${tarea.usuario}</td>
        `

        tbody.appendChild(tr);
    });

  }

  document.addEventListener("DOMContentLoaded", ()=>{
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


  