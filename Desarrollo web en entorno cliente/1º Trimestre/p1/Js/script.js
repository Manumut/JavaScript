alert("Hola soy js");
document.write("Hola soy js"); 

// Formas de crear una variable en js
// var y let, son variables q cambian, mientras q const es constante y no cambia;

var nombre = "manu";   //variable global
let edad = 25;   //busca en su propio contexto y ocupa menos
const sexo = "Masculino";


// Esto sirve para ver en la consola q funciona la variable x ejemplo.
console.log(nombre);


// VARIABLES TIPO PRIMITIVO
let nombre = "antonio"; //lo q lleva comillas es un string
let eda = 30; //es un number
let soyMayor = true;  //es un boolean y q solo puede ser true o false
let algo; //es una variable q no ha sido declarada
let mensaje = null;  //es una variable sin valor

console.log(typeof nombre); //te devuelve el tipo de variable q es


// VARIABLES TIPO COMPUESTOS
// Arrays
let dias = ["Lunes", "Martes", "Miercoles"];
console.log(typeof dias[2]); //me dice q tipo de variable es segun su puesto en el array

/*if(dias [6] == undefined){
    console.log("indefinido")
};*/

/*let contactos = [
    ["Redu", 20, 80],
    ["Juan", 20, 80]
];
console.log(contactos[1][2]);*/

/*let contactos = {
    nombre: "Manuel", edad:60, peso:70
}
console.log(contacto.nombre);*/

/*let contactos ={
    redu:{
        peso:60, edad:40
    },
    manu:{
        peso:80,
        edad:30
    }
}
console.log(contacto.manu.peso);*/



// FUNCTION
function saludar(){
    return "hola friend" 
}

console.log(typeof saludar())
