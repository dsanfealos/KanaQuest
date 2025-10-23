

var posesivosList;
fetch(`../bbdd/gramatica/posesivos/posesivos.txt`)
    .then(res=>res.text())
    .then(data => {
        posesivosList = data.split("\n");
    })

var adjetivoPresente, adjetivoEspecial;
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

var verboPresente, verboExistencia, verboPasado;
fetch(`../bbdd/gramatica/verbos/verbos-presente.txt`)
    .then(res=>res.text())
    .then(data => {
        verboPresente = data.split("\n");
    })
fetch(`../bbdd/gramatica/verbos/verbos-existencia.txt`)
    .then(res=>res.text())
    .then(data => {
        verboExistencia = data.split("\n");
    })
fetch(`../bbdd/gramatica/verbos/verbos-pasado.txt`)
    .then(res=>res.text())
    .then(data => {
        verboPasado = data.split("\n");
    })

var particula1, particula2, particula3;
fetch(`../bbdd/gramatica/particulas/particulas-1.txt`)
    .then(res=>res.text())
    .then(data => {
        particula1 = data.split("\n");
    })
fetch(`../bbdd/gramatica/particulas/particulas-2.txt`)
    .then(res=>res.text())
    .then(data => {
        particula2 = data.split("\n");
    })
fetch(`../bbdd/gramatica/particulas/particulas-3.txt`)
    .then(res=>res.text())
    .then(data => {
        particula3 = data.split("\n");
    })

var pasadoAfirmacion, pasadoAdjetivo;
fetch(`../bbdd/gramatica/pasado/pasado-afirmaciones.txt`)
    .then(res=>res.text())
    .then(data => {
        pasadoAfirmacion = data.split("\n");
    })
fetch(`../bbdd/gramatica/pasado/pasado-adjetivos.txt`)
    .then(res=>res.text())
    .then(data => {
        pasadoAdjetivo = data.split("\n");
    })

var invitacionesList;
fetch(`../bbdd/gramatica/invitaciones/invitaciones.txt`)
    .then(res=>res.text())
    .then(data => {
        invitacionesList = data.split("\n");
    })

let preguntasList;
fetch(`../bbdd/gramatica/preguntas/preguntas.txt`)
    .then(res=>res.text())
    .then(data => {
        preguntasList = data.split("\n");
    })