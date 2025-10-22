let opciones = ["posesivos", "adjetivos", "verbos",
     "particulas", "pasado", "invitaciones", "preguntas", "aleatorio"];
let subOpciones = [
    "presente", "especiales", "pasado", "existencia","parte 1", 
    "parte 2", "parte 3", "afirmaciones", "adjetivos", 
    "aleatorio"
];

let opcionGramatica = "";
let subOpcionGramatica = "";




let rowGramatica, gramaticList;

let posesivosList;

let adjetivoPresente, adjetivoEspecial;
fetch(`../bbdd/gramatica/adjetivos/adjetivos-presente.txt`)
    .then(res=>res.text())
    .then(data => {
        adjetivoPresente = data.split("\n");
    })
fetch(`../bbdd/gramatica/adjetivos/adjetivos-especiales.txt`)
    .then(res=>res.text())
    .then(data => {
        adjetivoEspecial = data.split("\n");
    })

let verboPresente, verboExistencia, verboPasado;

let particula1, particula2, particula3;

let pasadoAfirmacion, pasadoAdjetivo;

let invitacionesList;
let preguntasList;

function cambiaInputGramatica(){

}

function mostrarPreguntaGramatica(){
    gramaticList = escogerTemario();
    let random = Math.floor(Math.random() * gramaticList.length);
    if(gramaticList.length != 0){
        rowGramatica = gramaticList[random].split(" - ");
        document.getElementById("muestra-gramatica").innerHTML = rowGramatica[0];
    }
}

function escogerTemario(){
    let gramaticaBBDD = [];
    let adjCompleto = adjetivoPresente.concat(adjetivoEspecial);
    /*let verbCompleto = verboPresente.concat(verboExistencia, verboPasado);
    let partCompleto = particula1.concat(particula2, particula3);
    let pasCompleto = pasadoAfirmacion.concat(pasadoAdjetivo);*/

    if(opcionGramatica === opciones[opciones.length-1]){
        //Aleatorio todo
        return adjCompleto.concat(verbCompleto, partCompleto, pasCompleto, invitacionesList, posesivosList, preguntasList);
    }

    switch(opcionGramatica){
        case opciones[0]:
            //Posesivos
            gramaticList = posesivosList;
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
                    break;
                case subOpciones[2]:
                    //Ver. Pasado
                    break;
                case subOpciones[3]:
                    //Ver. Existencia
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
                    break;
                case subOpciones[5]:
                    //Part. 2
                    break;
                case subOpciones[6]:
                    //Part. 3
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
                    break;
                case subOpciones[8]:
                    //Pas. Adjetivos
                    break;
                default:
                    console.error(`La opción no se encuentra en ${opcionGramatica}.`);
                    break;
            }
            break;
        case opciones[5]:
            //Invitaciones
            gramaticList = invitacionesList;
            break;
        case opciones[6]:
            //Preguntas 
            gramaticList = preguntasList;
        default:
            console.error(`La opción no está disponible.`);
            break;
    }
    return gramaticaBBDD;
}