(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=l(e);fetch(e.href,i)}})();let g=async t=>{try{let l=await(await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${t}&appid=b092dfbd427eeed434ba45afb8508f0a`)).json(),n=l[0].lat,e=l[0].lon;return{latitude:n,longitude:e}}catch(a){console.log(a)}},f=async t=>{let a=t.longitude,l=t.latitude;return await(await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${l}&lon=${a}&appid=b092dfbd427eeed434ba45afb8508f0a&units=metric`)).json()},h=(t,a,l)=>{let n=document.getElementById("main__icon"+l),e=t.list[a].weather[0].icon;n.src="assets/image/"+e+".png";let i=document.getElementById("main__temp"+l),o=Math.floor(t.list[a].main.temp)+"°C";i.innerHTML=o},b=async t=>{document.getElementById("0").addEventListener("click",()=>o("0")),document.getElementById("1").addEventListener("click",()=>o("8")),document.getElementById("2").addEventListener("click",()=>o("16")),document.getElementById("3").addEventListener("click",()=>o("24")),document.getElementById("4").addEventListener("click",()=>o("32"));let o=d=>{let s=[],m=[],_,u,v=parseInt(d)+8;console.log(t);for(let r=d;r<v;r++)_=t.list[r].dt_txt.substring(11,13),s.push(_),u=t.list[r].main.temp,m.push(u);let E=document.getElementById("tempCanva");new Chart(E,{type:"line",data:{labels:s,datasets:[{label:"Temperature",data:m,fill:!0,backgroundColor:"#EC6E4C50",tension:.5}]}})}},c=async t=>{let a;t==!0?(a=localStorage.getItem("Ville"),a==null&&(a="Charleroi")):t==!1&&(a=document.getElementById("ville").value,localStorage.setItem("Ville",a)),await w(a);let l=await g(a),n=await f(l);b(n);let e=document.querySelector(".box__city");e.innerHTML=n.city.name;let i=document.querySelector(".box__temp");i.innerHTML=Math.floor(n.list[0].main.temp)+"°C";let o=document.querySelector(".box__icon");o.src="assets/image/"+n.list[0].weather[0].icon+".png";let d=0;for(let s=0;s<40;s+=8)h(n,s,d),d++},L=async()=>{let t=document.getElementById("ville").value,a=await g(t),l=await f(a),n=document.getElementById("main__comparaison");n.innerHTML=`<div class="main__days__day" id="5">
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
            </div>`;let e=5;for(let i=0;i<40;i+=8)h(l,i,e),e++};const p=document.getElementById("Ville__datalist");async function I(t){try{const l=await(await fetch(`https://nominatim.openstreetmap.org/search?city=${t}&format=json`)).json();p.innerHTML="",l.forEach(n=>{const e=document.createElement("option");e.value=n.display_name,p.appendChild(e)})}catch(a){console.error("Erreur lors du chargement des villes :",a)}}const j=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];for(let t=0;t<5;t++){let a=document.getElementById("main__jour"+t),l=Date.now(),n=(new Date(l).getDay()+t)%7,e=j[n];a.innerHTML=e}let w=async t=>{let l=await(await fetch(`https://api.unsplash.com/search/photos?client_id=AmF10nKuZ5tbJB9EDt4PYS0HMIFZKnsfuBeu_67fT6Y&page=1&query=${t}`)).json(),n=document.querySelector(".box");n.style.backgroundImage=`url("${l.results[0].urls.regular}")`};c(!0);let B=document.getElementById("btn_accueil");B.addEventListener("click",()=>c(!1));let T=t=>{t.key==="Enter"&&c(!1)};document.addEventListener("keyup",T);let M=document.getElementById("btn__comparaison");M.addEventListener("click",L);const y=document.getElementById("ville");y.addEventListener("input",function(){I(y.value)});