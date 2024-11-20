// // dentro del promise va un call back
// let promesa = new Promise((resolve,reject) => {                         
//    setTimeout(()=>{
//     resolve("darte dinero");
//     reject("Me han pillado robando");
//     },5000)

// })

// // si se ejecuta la promesa entonces ....
// // al then se le dara otro call back
// promesa.then(loPrometido => {
//     console.log(loPrometido)
// }).catch( error => console.log(error))





const datos = [
    {
        id:1,
        nombre:"redu"
    }
]

let leerDatos = new Promise ((resolve) => {
    setTimeout(()=>{
        resolve(datos);

    }, 2000);
})
leerDatos.then(respuesta => console.log(respuesta));


// let leerDatos = () =>{
//     setTimeout(()=>{
//         return datos;
//     }, 2000);
// }

// console.log(leerDatos());