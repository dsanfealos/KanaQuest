let opciones = ["posesivos", "adjetivos", "verbos",
     "particulas", "pasado", "invitaciones", "preguntas", "aleatorio"];
let subOpciones = [
    "presente", "especiales", "pasado", "existencia","parte 1", 
    "parte 2", "parte 3", "afirmaciones", "adjetivos", 
    "aleatorio"
];

let opcionGramatica = "";
let subOpcionGramatica = "";
let outputGramatica = document.getElementById("output-gramatica");
let inputRespuestaGramatica = document.getElementById("respuesta-gramatica");

let rowGramatica, gramaticList;


function mostrarPreguntaGramatica(){
    inputRespuestaGramatica.value = "";
    gramaticList = escogerTemario();
    let random = Math.floor(Math.random() * gramaticList.length);
    if(gramaticList.length != 0){
        rowGramatica = gramaticList[random].split(" - ");
        document.getElementById("muestra-gramatica").innerHTML = rowGramatica[0];
    }
}

function responderGramatica(respuesta){
    if(outputGramatica.innerHTML === "¡Correcto!" && outputGramatica.style.display === "block"){
        mostrarPreguntaGramatica();
    }else{
        if(respuesta === rowGramatica[1].trim()){
            outputGramatica.innerHTML = "¡Correcto!";
            outputGramatica.style.borderColor = "lightgreen";
        }else{
            outputGramatica.innerHTML = "Incorrecto";
            outputGramatica.style.borderColor = "red";
        }
        outputGramatica.style.display = "block";
    }
}

document.getElementById("form-gramatica")
    .addEventListener("submit", (event) =>{
        event.preventDefault();
        let respuesta = inputRespuestaGramatica.value; 
        responderGramatica(respuesta);        
    });

function escogerTemario(){
    let gramaticaBBDD = [];
    let adjCompleto = adjetivoPresente.concat(adjetivoEspecial);
    let verbCompleto = verboPresente.concat(verboExistencia, verboPasado);
    let partCompleto = particula1.concat(particula2, particula3);
    let pasCompleto = pasadoAfirmacion.concat(pasadoAdjetivo);

    if(opcionGramatica === opciones[opciones.length-1]){
        //Aleatorio todo
        return adjCompleto.concat(verbCompleto, partCompleto, pasCompleto, invitacionesList, posesivosList, preguntasList);
    }

    switch(opcionGramatica){
        case opciones[0]:
            //Posesivos
            gramaticaBBDD = posesivosList;
            break;
        case opciones[1]:
            //Adjetivos
            if(subOpcionGramatica === subOpciones[subOpciones.length-1]){
                //Adj. Aleatorio
                return adjCompleto;
            }
            switch(subOpcionGramatica){
                case subOpciones[0]:
                    //Adj. Presente
                    gramaticaBBDD = adjetivoPresente;
                    break;
                case subOpciones[1]:
                    //Adj. Especiales
                    gramaticaBBDD = adjetivoEspecial;
                    break;
                default:
                    console.error(`La opción no se encuentra en ${opcionGramatica}.`);
                    break;
            }
            break;
        case opciones[2]:
            //Verbos
            if(subOpcionGramatica === subOpciones[subOpciones.length-1]){
                //Ver. Aleatorio
                return verbCompleto;
            }
            switch(subOpcionGramatica){
                case subOpciones[0]:
                    //Ver. Presente
                    gramaticaBBDD = verboPresente;
                    break;
                case subOpciones[2]:
                    //Ver. Pasado
                    gramaticaBBDD = verboPasado;
                    break;
                case subOpciones[3]:
                    //Ver. Existencia
                    gramaticaBBDD = verboExistencia;
                    break;
                default:
                    console.error(`La opción no se encuentra en ${opcionGramatica}.`);
                    break;
            }
            break;
        case opciones[3]:
            //Particulas
            if(subOpcionGramatica === subOpciones[subOpciones.length-1]){
                //Part. Aleatorio
                return partCompleto;
            }
            switch(subOpcionGramatica){
                case subOpciones[4]:
                    //Part. 1
                    gramaticaBBDD = particula1;
                    break;
                case subOpciones[5]:
                    //Part. 2
                    gramaticaBBDD = particula2;
                    break;
                case subOpciones[6]:
                    //Part. 3
                    gramaticaBBDD = particula3;
                    break;
                default:
                    console.error(`La opción no se encuentra en ${opcionGramatica}.`);
                    break;
            }
            break;
        case opciones[4]:
            //Pasado
            if(subOpcionGramatica === subOpciones[subOpciones.length-1]){
                //Pas. Aleatorio
                return pasCompleto;
            }
            switch(subOpcionGramatica){
                case subOpciones[7]:
                    //Pas. Afirmaciones
                    gramaticaBBDD = pasadoAfirmacion;
                    break;
                case subOpciones[8]:
                    //Pas. Adjetivos
                    gramaticaBBDD = pasadoAdjetivo;
                    break;
                default:
                    console.error(`La opción no se encuentra en ${opcionGramatica}.`);
                    break;
            }
            break;
        case opciones[5]:
            //Invitaciones
            gramaticaBBDD = invitacionesList;
            break;
        case opciones[6]:
            //Preguntas 
            gramaticaBBDD = preguntasList;
            break;
        default:
            console.error(`La opción no está disponible.`);
            break;
    }
    return gramaticaBBDD;
}