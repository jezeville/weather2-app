let latLong = async (inputValue) => {
    try{
        let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&appid=b092dfbd427eeed434ba45afb8508f0a`);
        let tableau = await response.json();
        let lat = tableau[0].lat;
        let long = tableau[0].lon;
        let object = {latitude : lat, longitude : long};
        return object;
    }
    catch (error){
        console.log(error);
    }
}
let meteo = async (object) =>{
    let lon = object.longitude;
    let lat = object.latitude;
    let response = await fetch (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b092dfbd427eeed434ba45afb8508f0a&units=metric`)
    let tableau = await response.json();
    return tableau;
}
let divDay = (tableau , number, day) =>{
    // Choix de l'image
    let img = document.getElementById('main__icon'+day);
    let imgIcon = tableau.list[number].weather[0].icon;
    img.src= "assets/image/"+ imgIcon +".png";

    //Choix de la température
    let tempHtml = document.getElementById('main__temp'+day);
    let temp = Math.floor(tableau.list[number].main.temp)+ "°C";
    tempHtml.innerHTML = temp;
}

// graphique linéaire utilisant chart.js

export let tempCanva = async (tableau) =>{
    let j1 = document.getElementById('0');
    j1.addEventListener('click', () => tempLine("0"));

    let j2 = document.getElementById('1');
    j2.addEventListener('click', () => tempLine("8"));

    let j3 = document.getElementById('2');
    j3.addEventListener('click', () => tempLine("16"));

    let j4 = document.getElementById('3');
    j4.addEventListener('click', () => tempLine("24"));

    let j5 = document.getElementById('4');
    j5.addEventListener('click', () => tempLine("32"));

    let tempLine = (days) =>{
        let tabHours = [];
        let tabTemp = [];
        let valeurHour ;
        let valeurTemp;
        let limite = parseInt(days) + 8;
        console.log(tableau);
        for (let i = days; i < limite; i++ ){
            valeurHour  = tableau.list[i].dt_txt.substring(11,13);
            tabHours.push(valeurHour);
            valeurTemp = tableau.list[i].main.temp;
            tabTemp.push(valeurTemp);
        }
    
        let Canva = document.getElementById('tempCanva');
        const lineChart = new Chart(Canva, {
            type : 'line',
            data : {
                labels : tabHours,
                datasets : [{
                    label : 'Temperature',
                    data : tabTemp,
                    fill : true,
                    backgroundColor : "#EC6E4C50",
                    tension : 0.5
                }]
            }
        })
    }
}

export let mapFunction = async (valeur) =>{
    let inputValue;
    if(valeur == true){
        inputValue = localStorage.getItem('Ville');
        if(inputValue == null){
            inputValue = "Charleroi";
        }
    }
    else if (valeur == false){
        inputValue = document.getElementById('ville').value;
        localStorage.setItem('Ville', inputValue);
    }
    await image(inputValue);
    let objectLatlong = await latLong(inputValue);
    let tabData = await meteo(objectLatlong);
    tempCanva(tabData);
    let cityTitle = document.querySelector('.box__city');
    cityTitle.innerHTML = tabData.city.name;
    let tempTitle = document.querySelector('.box__temp');
    tempTitle.innerHTML = Math.floor(tabData.list[0].main.temp) + "°C";
    let imgTitle = document.querySelector('.box__icon');
    imgTitle.src = "assets/image/"+ tabData.list[0].weather[0].icon +".png";
    let day = 0;
     for (let i = 0; i < 40 ; i+=8){
         divDay(tabData , i, day);
         day++;
     }
}


export let comparaisonPannel = async () =>{
    let inputValue = document.getElementById('ville').value;
    let objectLatlong = await latLong(inputValue);
    let tabData = await meteo(objectLatlong);
    let section = document.getElementById('main__comparaison');
    section.innerHTML = 
            `<div class="main__days__day" id="5">
                <img class="main__days__day__icon" id="main__icon5">
                <p class="main__days__day__temp" id="main__temp5"></p>
            </div>
            <div class="main__days__day" id="6">
                <img class="main__days__day__icon" id="main__icon6">
                <p class="main__days__day__temp" id="main__temp6"></p>
            </div>
            <div class="main__days__day" id="7">
                <img class="main__days__day__icon" id="main__icon7">
                <p class="main__days__day__temp" id="main__temp7"></p>
            </div>
            <div class="main__days__day" id="8">
                <img class="main__days__day__icon" id="main__icon8">
                <p class="main__days__day__temp" id="main__temp8"></p>
            </div>
            <div class="main__days__day" id="9">
                <img class="main__days__day__icon" id="main__icon9">
                <p class="main__days__day__temp" id="main__temp9"></p>
            </div>`;
    let day = 5;
     for (let i = 0; i < 40 ; i+=8){
         divDay(tabData , i, day);
         day++;
     }
}
 //autocompletion

        const datalistVille = document.getElementById('Ville__datalist');
        export async function chargerVilles(saisie) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${saisie}&format=json`);
                const data = await response.json();
                datalistVille.innerHTML = '';
                data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city.display_name;
                    datalistVille.appendChild(option);
                });
            } catch (error) {
                console.error('Erreur lors du chargement des villes :', error);
            }
        }
        


        const joursDeLaSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

        for (let i = 0; i < 5; i++) {
            let jour = document.getElementById('main__jour' + i);
            let currentDate = Date.now();
            let dayOfWeek = (new Date(currentDate).getDay() + i) % 7;
            let nomDuJour = joursDeLaSemaine[dayOfWeek];
            jour.innerHTML = nomDuJour;
        }


// Affichage de l'image en utilisant l'api unsplash
export let image = async (valeur) =>{
    let response = await fetch(`https://api.unsplash.com/search/photos?client_id=AmF10nKuZ5tbJB9EDt4PYS0HMIFZKnsfuBeu_67fT6Y&page=1&query=${valeur}`);
    let tableau = await response.json();
    let img__ville = document.querySelector('.box');
    img__ville.style.backgroundImage = `url("${tableau.results[0].urls.regular}")`;
}



