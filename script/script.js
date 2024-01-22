
import { mapFunction } from "./map.js";
import { comparaisonPannel } from "./map.js";
import { chargerVilles } from "./map.js";



mapFunction(true);
let btn = document.getElementById('btn_accueil');
btn.addEventListener('click', () => mapFunction(false));


let enter = (e) =>{
    if(e.key==="Enter"){
        mapFunction(false);
    }
}
document.addEventListener('keyup', enter);

let btn2 = document.getElementById('btn__comparaison');
btn2.addEventListener('click', comparaisonPannel);

const inputVille = document.getElementById('ville');

inputVille.addEventListener('input', function () {
    chargerVilles(inputVille.value);
});


