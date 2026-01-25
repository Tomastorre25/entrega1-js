const items = []

const cantidades =[]

function verLista(){

    let cantidad = items.length
    if (cantidad > 0){
        let elemento = ""
        for(let i = 0; i < items.length; i++){
            elemento += cantidades[i] + " x " + items[i] + "\n"
        }
        alert("LISTA DE COMPRAS:\n\n" + elemento)
    }
    else{
        alert("No hay elementos en la lista.")
    }
    
}

function agregarItem(){

    let nuevoItem = prompt("Intraduzca el nuevo item.")
    
    if(nuevoItem!== null && nuevoItem !== ""){

        let nuevaCantidad = prompt("introduzca la cantidad")        
        if(nuevaCantidad !== null && nuevaCantidad !== ""){
            items.push(nuevoItem)
            cantidades.push(nuevaCantidad)
            alert("Item agregado con exito.")
        }
        else{
            alert("Cantidad no valida, intente nuevamente.")
        }
    }
    else{
        alert("Item no valido, intente nuevamente.")
    }
}

function eliminarItem(){

    let itemEliminado = prompt("Introduzca el item que desea eliminar.")
    itemBuscado = items.indexOf(itemEliminado)
    if (itemBuscado !== -1){
        items.splice(itemBuscado,1)
        cantidades.splice(itemBuscado,1)
        alert("Item eliminado con exito.")
    }
    else{
        alert("El item ingresado no forma parte de la lista.")
    }

}

let accion = parseInt(prompt("Elija la opcion deseada: \n 1: Ver lista de compras \n 2: Agregar item a la lista \n 3: Eliminar item de la lista \n 4: Salir"))

while(accion !==4){

    
    switch(accion){
        case 1:
            verLista()
            break
        case 2:
            agregarItem()
            break
        case 3:
            eliminarItem()
            break
        case 4:
            alert("Gracias por usar nuetro sistema.")
            break
        default:
            alert("Opcion incorrecta")
    }
    accion = parseInt(prompt("Elija la opcion deseada: \n 1: Ver lista de compras \n 2: Agregar item a la lista \n 3: Eliminar item de la lista \n 4: Salir"))
}

