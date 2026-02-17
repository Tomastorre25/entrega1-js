// Datos de la barbería
const barberia = {
    profesionales: [
        { id: 1, nombre: "Tomas"},
        { id: 2, nombre: "Rodrigo"},
        { id: 3, nombre: "Matias"}
    ],
    servicios: {
        1: [
            { id: 1, nombre: "Corte", precio: "$15.000", duracion: "30 min" },
            { id: 2, nombre: "Corte y Barba", precio: "$19.000", duracion: "60 min" },
            { id: 3, nombre: "Barba", precio: "$15.000", duracion: "30 min" }
        ],
        2: [
             { id: 4, nombre: "Corte", precio: "$15.000", duracion: "30 min" },
            { id: 5, nombre: "Corte y Barba", precio: "$19.000", duracion: "60 min" },
            { id: 6, nombre: "Barba", precio: "$15.000", duracion: "30 min" }
        ],
        3: [
             { id: 7, nombre: "Corte", precio: "$15.000", duracion: "30 min" },
            { id: 8, nombre: "Corte y Barba", precio: "$19.000", duracion: "60 min" },
            { id: 9, nombre: "Barba", precio: "$15.000", duracion: "30 min" }
        ]
    },
    horarios: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"]};

// Variables para almacenar la reserva actual
let reservaActual = {
    profesional: null,
    servicio: null,
    fecha: null,
    horario: null
};

// Inicializar la página
mostrarProfesionales()
configurarFecha()
configurarHorario()
configurarBotonConfirmar()

// Mostrar profesionales
function mostrarProfesionales() {
    const container = document.getElementById('profesionalesContainer')
    container.innerHTML = ""
    
    barberia.profesionales.forEach(prof => {
        const contenedor = document.createElement('div')
        contenedor.className = 'profesional-item'
        contenedor.innerHTML = `
            <div class="profesional-card" onclick="seleccionarProfesional(${prof.id}, '${prof.nombre}')">
                <h5>${prof.nombre}</h5>`
        container.appendChild(contenedor)
    })
}

// Seleccionar profesional
function seleccionarProfesional(id, nombre) {
    reservaActual.profesional = { id, nombre }
    document.getElementById('profesionalSeleccionado').textContent = nombre
    document.getElementById('profesionalFinal').textContent = nombre
    mostrarPaso(2)
}

// Mostrar servicios
function mostrarServicios(profesionalId) {
    const container = document.getElementById('serviciosContainer')
    const servicios = barberia.servicios[profesionalId]
    container.innerHTML = ''
    
    servicios.forEach(servicio => {
        const contenedor = document.createElement('div')
        contenedor.className = 'servicio-item'
        contenedor.innerHTML = `
            <div class="servicio-card" onclick="seleccionarServicio(${servicio.id}, '${servicio.nombre}')">
                <div class="servicio-nombre">${servicio.nombre}</div>
                <p class="servicio-precio">Precio: ${servicio.precio}</p>
                <p class="servicio-duracion">Duración: ${servicio.duracion}</p>
            </div>`
        container.appendChild(contenedor)
    })
}

// Seleccionar servicio
function seleccionarServicio(id, nombre) {
    reservaActual.servicio = { id, nombre }
    document.getElementById('servicioFinal').textContent = nombre
    mostrarPaso(3)
}

// Configurar fecha
function configurarFecha() {
    const dia = document.getElementById('dia')
    const hoy = new Date()
    
    dia.min = hoy.toISOString().split('T')[0]
}

// Configurar evento para cuando se selecciona una fecha
function configurarHorario() {
    const dia = document.getElementById('dia')
    dia.addEventListener('change', (e) => {
        if (e.target.value) {
            mostrarHorarios(e.target.value)
        }
    })
}

// Mostrar horarios disponibles
function mostrarHorarios(fecha) {
    const container = document.getElementById('horariosDisponibles')
    container.innerHTML = '<h5>Horarios disponibles:</h5><div id="horariosBotones" class="horarios-container"></div>'
    
    const botonesContainer = document.getElementById('horariosBotones')
    
    barberia.horarios.forEach(horario => {
        const contenedor = document.createElement('div')
        contenedor.className = 'horario-item'
        contenedor.innerHTML = `
            <button class="horario-btn" onclick="seleccionarHorario('${fecha}', '${horario}')">
                ${horario}
            </button>
        `
        botonesContainer.appendChild(contenedor)
    })
}

// Seleccionar horario
function seleccionarHorario(fecha, horario) {
    reservaActual.fecha = fecha
    reservaActual.horario = horario
    
    // Cambiar estilo del botón seleccionado
    document.querySelectorAll('.horario-btn').forEach(btn => {
        btn.classList.remove('selected')
    })
    
    event.target.classList.add('selected')
    
    // Habilitar botón de confirmar
    document.getElementById('btnConfirmar').disabled = false
}

// Mostrar paso específico
function mostrarPaso(numero) {
    document.querySelectorAll('.paso-container').forEach(paso => {
        paso.style.display = 'none'
    })
    
    // Mostrar paso solicitado
    document.getElementById(`paso${numero}`).style.display = 'block'
    
    // Si es paso 2, mostrar servicios
    if (numero === 2) {
        mostrarServicios(reservaActual.profesional.id)
    }
}

// Volver a un paso anterior
function volverAPaso(numero) { 
    mostrarPaso(numero)
}

// Configurar botón de confirmación
function configurarBotonConfirmar() {
    const btnConfirmar = document.getElementById('btnConfirmar')
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', confirmarReserva)
    }
}

// Confirmar reserva
function confirmarReserva() {
    const [año, mes, dia] = reservaActual.fecha.split('-')
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const fechaFormato = new Date(reservaActual.fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones)
    
    // Mostrar resumen
    document.getElementById('resumenProfesional').textContent = reservaActual.profesional.nombre
    document.getElementById('resumenServicio').textContent = reservaActual.servicio.nombre
    document.getElementById('resumenFecha').textContent = fechaFormato
    document.getElementById('resumenHorario').textContent = reservaActual.horario
    
    // Guardar en localStorage
    const turnos = JSON.parse(localStorage.getItem('turnos')) || []
    const nuevoTurno = {
        profesional: reservaActual.profesional.nombre,
        servicio: reservaActual.servicio.nombre,
        fecha: reservaActual.fecha,
        fechaFormato: fechaFormato,
        horario: reservaActual.horario
    }
    turnos.push(nuevoTurno)
    localStorage.setItem('turnos', JSON.stringify(turnos))
    
    mostrarPaso(4)
}

// Nueva reserva
function nuevaReserva() {
    reservaActual = {
        profesional: null,
        servicio: null,
        fecha: null,
        horario: null
    }
    
    document.getElementById('dia').value = ''
    document.getElementById('horariosDisponibles').innerHTML = ''
    document.getElementById('btnConfirmar').disabled = true
    
    mostrarPaso(1)
}
