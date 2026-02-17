// Inicializar la página
    mostrarTurnos()

// Mostrar los turnos reservados
function mostrarTurnos() {
    const container = document.getElementById('turnosContainer')
    const mensajeVacio = document.getElementById('mensajeVacio')
    const turnos = JSON.parse(localStorage.getItem('turnos')) || []

    container.innerHTML = ""

    if (turnos.length === 0) {
        container.style.display = 'none'
        mensajeVacio.style.display = 'block'
        return
    }

    mensajeVacio.style.display = 'none'
    container.style.display = 'block'

    turnos.forEach((turno, index) => {
        const tarjeta = document.createElement('div')
        tarjeta.className = 'turno-card'
        tarjeta.innerHTML = `
            <div class="turno-info">
                <div class="turno-field">
                    <span class="turno-label">Profesional:</span>
                    <span class="turno-value">${turno.profesional}</span>
                </div>
                <div class="turno-field">
                    <span class="turno-label">Servicio:</span>
                    <span class="turno-value">${turno.servicio}</span>
                </div>
                <div class="turno-field">
                    <span class="turno-label">Fecha:</span>
                    <span class="turno-value">${turno.fechaFormato}</span>
                </div>
                <div class="turno-field">
                    <span class="turno-label">Horario:</span>
                    <span class="turno-value">${turno.horario}</span>
                </div>
            </div>
            <div class="turno-actions">
                <button class="btn btn-secondary" onclick="eliminarTurno(${index})">Eliminar</button>
            </div>
        `
        container.appendChild(tarjeta)
    })
}

// Eliminar un turno
function eliminarTurno(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este turno?')) {
        const turnos = JSON.parse(localStorage.getItem('turnos')) || []
        turnos.splice(index, 1)
        localStorage.setItem('turnos', JSON.stringify(turnos))
        mostrarTurnos()
    }
}
