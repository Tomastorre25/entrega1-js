// Inicializar la página
    mostrarTurnos()

// Mostrar los turnos reservados
function mostrarTurnos() {
    const container = document.getElementById('turnosContainer')
    const mensajeVacio = document.getElementById('mensajeVacio')
    const turnos = JSON.parse(localStorage.getItem('turnos')) || []

    container.innerHTML = ""

    if (turnos.length === 0) {
        container.classList.add('ocultar')
        mensajeVacio.classList.remove('ocultar')
        return
    }

    mensajeVacio.classList.add('ocultar')
    container.classList.remove('ocultar')

    turnos.forEach((turno, index) => {
        const tarjeta = document.createElement('div')
        tarjeta.className = 'turno-card'
        const info = document.createElement('div')
        info.className = 'turno-info'

        const campos = [
            ['Profesional', turno.profesional],
            ['Servicio', turno.servicio],
            ['Fecha', turno.fechaFormato],
            ['Horario', turno.horario]
        ]

        campos.forEach(([label, value]) => {
            const field = document.createElement('div')
            field.className = 'turno-field'
            field.innerHTML = `<span class="turno-label">${label}:</span> <span class="turno-value">${value}</span>`
            info.appendChild(field)
        })

        const actions = document.createElement('div')
        actions.className = 'turno-actions'
        const btn = document.createElement('button')
        btn.className = 'btn btn-secondary'
        btn.textContent = 'Eliminar'
        btn.addEventListener('click', () => eliminarTurno(index))
        actions.appendChild(btn)

        tarjeta.appendChild(info)
        tarjeta.appendChild(actions)
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
