
let fileVocabulario, rowVocabulario, hiraganaList, katakanaList;

let output = document.getElementById("output");
let btnEspanolARomaji = document.getElementById("btn-romaji");
let btnRomajiAKana = document.getElementById("btn-kana");
let btnKanaARomaji = document.getElementById("btn-kana-a-romaji");
let inputRespuesta = document.getElementById("respuesta");

let espanolARomaji = false;
let romajiAKana = false;
let kanaARomaji = false;

let tempLetra;
let tempStr = "";

let vocales = ["a","i","u","e","o"];
let aplh = ["b","c", "d", "f", "g", "h", "j", "k", "l", "m", "n"
    , "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]



fetch(`../bbdd/silabario/hiragana.txt`)
    .then(res => res.text())
    .then(silabarioHiragana => {
        hiraganaList = silabarioHiragana.split("\n");
    });

fetch(`../bbdd/silabario/katakana.txt`)
    .then(res => res.text())
    .then(silabarioKatakana => {
        katakanaList = silabarioKatakana.split("\n");
    });

fetch(`../bbdd/vocabulario/vocabulario_lista.txt`)
    .then(res => res.text())
    .then(text => {
        fileVocabulario = text.split("\n");
    });

function mostrarPregunta(){   
    inputRespuesta.value = "";
    let random = Math.floor(Math.random() * fileVocabulario.length);
    rowVocabulario = fileVocabulario[random].split(" - "); 
    if(espanolARomaji || romajiAKana) {
        document.getElementById("muestra").innerHTML = rowVocabulario[2];
    }
    if(kanaARomaji){
        document.getElementById("muestra").innerHTML = rowVocabulario[0];
    }
    output.style.display = "none";
}

function preguntarEspañolARomaji(event){
    espanolARomaji = true;
    kanaARomaji = false;
    romajiAKana = false;
    cambiaBordeBoton(event)
    mostrarPregunta()

}

function preguntarRomajiAKana(event){
    espanolARomaji = false;
    kanaARomaji = false;
    romajiAKana = true;
    cambiaBordeBoton(event)
    mostrarPregunta()
}

function preguntarKanaARomaji(event){
    espanolARomaji = false;
    kanaARomaji = true;
    romajiAKana = false;
    cambiaBordeBoton(event)
    mostrarPregunta()
}

function responder(respuesta){
    if(output.innerHTML === "¡Correcto!" && output.style.display === "block"){
        mostrarPregunta();
    }else{
        if(espanolARomaji || kanaARomaji){
            if(respuesta === rowVocabulario[1]){
                output.innerHTML = "¡Correcto!";
                output.style.borderColor = "lightgreen";
            }else{
                output.innerHTML = "Incorrecto";
                output.style.borderColor = "red";
            }
            output.style.display = "block";        
        }
        if(romajiAKana){
            if(respuesta === rowVocabulario[0]){
                output.innerHTML = "¡Correcto!";
                output.style.borderColor = "green";
            }else{
                output.innerHTML = "Incorrecto";
                output.style.borderColor = "red";
            }
            output.style.display = "block";
        }
    }
    
    
}

document.getElementById("form-respuesta")
    .addEventListener("submit", (event) =>{
        event.preventDefault();
        let respuesta = inputRespuesta.value; 
        responder(respuesta);        
    });

function cambiaInput(){        
    let str = inputRespuesta.value;

    if(romajiAKana){
        if(rowVocabulario[3].trim() === "hiragana"){
            traducir(str, hiraganaList);
        }
        if(rowVocabulario[3].trim() === "katakana"){
            traducir(str, katakanaList);
        }
    }
    

}


function traducir(str, list){
    if (str.length >= 2) {
        let lastIndex = str.length - 1;
        let lastChar = str.charAt(lastIndex); 
        let preLastChar = str.charAt(lastIndex - 1);
        let antepenultimo = str.charAt(lastIndex - 2);
        let bonpu = "ー";
        let tsuMini = "っ";       


        if (lastChar === tempLetra && vocales.includes(lastChar) 
            && !aplh.includes(preLastChar) && rowVocabulario[3].trim() === "katakana") {

            str = str.slice(0, -1) + bonpu;
        }else{

            if(preLastChar === "ん" || preLastChar === "ン"){
                str = controlN(str, lastChar, preLastChar)
            }else{
                if(antepenultimo === preLastChar && aplh.includes(antepenultimo)){
                    str = str = str.slice(0, -3) + tsuMini + preLastChar + lastChar;
                }
                for (let i = 0; i < list.length; i++) {
                    let [romaji, kana] = list[i].split(" - ");
                    let regex = new RegExp(romaji, "g");
                    if(str.match(new RegExp(romaji, "g"))){
                        tempStr += romaji;
                    }
                    str = str.replace(regex, kana);
                }
            }            
        }    
        tempLetra = tempStr.charAt(tempStr.length-1);
    }
    inputRespuesta.value = str 
}


function controlN(str, lastChar, n){
    if(n === "ん"){
        switch(lastChar){
            case "a":
                str = str.replace(new RegExp("んa", "g"), "な");
                break;
            case "i":
                str = str.replace(new RegExp("んi", "g"), "に");
                break;
            case "u":
                str = str.replace(new RegExp("んu", "g"), "ぬ");
                break;
            case "e":
                str = str.replace(new RegExp("んe", "g"), "ね");
                break;
            case "o":
                str = str.replace(new RegExp("んo", "g"), "の");
                break;
            default:
                break;
        }
    }
    if(n === "ン"){
        switch(lastChar){
            case "a":
                str = str.replace(new RegExp("ンa", "g"), "ナ");
                break;
            case "i":
                str = str.replace(new RegExp("ンi", "g"), "ニ");
                break;
            case "u":
                str = str.replace(new RegExp("ンu", "g"), "ヌ");
                break;
            case "e":
                str = str.replace(new RegExp("ンe", "g"), "ネ");
                break;
            case "o":
                str = str.replace(new RegExp("ンo", "g"), "ノ");
                break;
            default:
                break;
        }
    }
    
    return str;
}