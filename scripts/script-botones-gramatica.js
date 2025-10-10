

function elegirSubOpcion(event){
    subOpcionGramatica = event.target.innerHTML
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g,"");
    mostrarPreguntaGramatica()
    cambiaBordeSubBoton(event);
}

function elegirOpcion(event){
    opcionGramatica = event.target.innerHTML
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g,"");
    ocultarTodo();
    cambiaBordeBoton(event)
    let elementos = document.getElementsByClassName(`${opcionGramatica}`);
    for (let i = 0; i < elementos.length; i++){
        elementos[i].style.display = "inline";
    }
}

function ocultarTodo(){
    let ocultos = document.getElementsByClassName("oculto");
    for (let i = 0; i<ocultos.length; i++){
        ocultos[i].style.display = "none";
    }
}

function cambiaBordeBoton(event){
    let redButtons = document.getElementsByClassName("btn");
    for(let index = 0; index<redButtons.length; index++){
        redButtons[index].style.borderColor = "transparent";
    }
    event.target.style.borderColor = "red"
}
function cambiaBordeSubBoton(event){
    let redButtons = document.getElementsByClassName("btn-secondary");
    for(let index = 0; index<redButtons.length; index++){
        redButtons[index].style.borderColor = "transparent";
    }
    event.target.style.borderColor = "red"
}