/*import {banana, pina, guinda, melon, Persona} from "./sandia.js"
console.log(pina);
console.log(banana);
guinda();
melon();

const fruta = new Persona("Omar",7);
console.log(fruta);*/

//localstorage
//guardar
/*localStorage.setItem("fruta", "🍌");
localStorage.setItem("deporte", "⚽");
localStorage.setItem("tren", "🚝");

//obtener 
//el getItem recibe la key, en este caso fruta
const fruta = localStorage.getItem("fruta");
//console.log(fruta);

//eliminar
localStorage.removeItem("fruta");

//eliminar todos los elementos
localStorage.clear();*/

//JSON.stringify() & JSON.parse()

const frutas = [
    {
        nombre: "🍌",
        color: "amarillo",
    },

    {
        nombre: "🍒",
        color: "rojo",
    },

    {
        nombre: "🍏",
        color: "verde"
    },
];

localStorage.setItem("frutas", JSON.stringify(frutas));

if(localStorage.getItem("frutas")){
    const frutas = JSON.parse(localStorage.getItem("frutas"));
    console.log(frutas);
}

