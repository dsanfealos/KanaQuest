
let file;
let row;
let output = document.getElementById("output");
let btnRomaji = document.getElementById("btn-romaji");
let btnKana = document.getElementById("btn-kana");
let romaji = false;
let kana = false;
let tempLetra;
let tempStr = "";
let vocales = ["a","i","u","e","o"];
let aplh = ["b","c", "d", "f", "g", "h", "j", "k", "l", "m", "n"
    , "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]
let inputRespuesta = document.getElementById("respuesta");



let hiraganaList;
fetch(`../hiragana.txt`)
    .then(res => res.text())
    .then(silabarioHiragana => {
        hiraganaList = silabarioHiragana.split("\n");
    });

let katakanaList;
fetch(`../katakana.txt`)
    .then(res => res.text())
    .then(silabarioKatakana => {
        katakanaList = silabarioKatakana.split("\n");
    });

fetch(`../vocabulario_lista.txt`)
    .then(res => res.text())
    .then(text => {
        file = text.split("\n");
    });

function mostrarPregunta(){   
    inputRespuesta.value = "";
    if(romaji || kana) {
        let random = Math.floor(Math.random() * file.length);
        row = file[random].split(" - "); 
        document.getElementById("muestra").innerHTML = row[2];
    }
    output.style.display = "none";
}

function preguntarRomaji(){
    romaji = true;
    btnRomaji.style.borderColor = "red";
    kana = false;
    btnKana.style.borderColor = "transparent";
    mostrarPregunta()

}

function preguntarKana(){
    romaji = false;
    btnRomaji.style.borderColor = "transparent";
    kana = true;
    btnKana.style.borderColor = "red";
    mostrarPregunta()
}

function responder(respuesta){
    if(romaji){
        if(respuesta === row[1]){
            output.innerHTML = "¡Correcto!";
            output.style.borderColor = "lightgreen";
        }else{
            output.innerHTML = "Incorrecto";
            output.style.borderColor = "red";
        }
        output.style.display = "block";        
    }
    if(kana){
        if(respuesta === row[0]){
            output.innerHTML = "¡Correcto!";
            output.style.borderColor = "green";
        }else{
            output.innerHTML = "Incorrecto";
            output.style.borderColor = "red";
        }
        output.style.display = "block";
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

    if(kana){
        if(row[3].trim() === "hiragana"){
            traducir(str, hiraganaList);
        }
        if(row[3].trim() === "katakana"){
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
            && !aplh.includes(preLastChar) && row[3].trim() === "katakana") {

            str = str.slice(0, -1) + bonpu;
        }else{

            if(preLastChar === "ん" || preLastChar === "ン"){
                str = controlN(str, lastChar, preLastChar)
            }else{
                if(antepenultimo === preLastChar){
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