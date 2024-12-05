// VARIABLES Y CONSTANTES
let selectorCategorias = document.querySelector('#categorias select'); 
let row = document.querySelector('#recetas .row'); 

let emerTit = document.querySelector('#emergenteLabel');
let emerImg = document.querySelector("#emergente img");
let emerLista = document.querySelector("#emergente ul");
let emerText = document.querySelector("#emergente p");

// FUNCION PARA OBTENER LOS DATOS DE LA API PASANDOLE LA URL
function obtenerDatos(url) {
    return fetch(url).then(respuesta => respuesta.json()); 
}

// FUNCION PARA CARGAR LAS CATEGORIAS DE LA API
function cargarCategorias() {
    const url1 = "https://www.themealdb.com/api/json/v1/1/categories.php";

    obtenerDatos(url1)
        .then(datos => {
            datos.categories.forEach(dato => {
                selectorCategorias.innerHTML += `
                    <option value="${dato.strCategory}">${dato.strCategory}</option>
                `;
            });
        });
}

cargarCategorias(); // Se llama a la función para cargar las categorías al inicio

// FUNCION PARA MOSTRAR LAS RECETAS DE UNA CATEGORIA SELECCIONADA
function mostrarRecetasDeCateg(cat) {
    const url2 = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + cat;
    row.innerHTML = "";

    obtenerDatos(url2)
        .then(recetas => {
            recetas.meals.forEach(dato => {
                row.innerHTML += `
                    <div class="col-md-4">
                        <div class="card text-white bg-primary mb-3">
                            <div class="card-header">
                                <img src="${dato.strMealThumb}" class="img-fluid" alt="">
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">${dato.strMeal}</h4>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emergente" onclick="mostrarReceta(${dato.idMeal})">
                                    Ver Receta
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
        });
}

// ABRIR MODAL CON LOS DATOS DE LA RECETA
function mostrarReceta(idReceta) {
    const url3 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idReceta; 

    obtenerDatos(url3) 
        .then(receta => {

            emerTit.textContent = receta.meals[0].strMeal; 
            emerImg.src = receta.meals[0].strMealThumb; 
            emerText.textContent = receta.meals[0].strInstructions; 

            emerLista.innerHTML = "";

            for (let index = 1; index <= 20; index++) {
                const ingrediente = receta.meals[0]["strIngredient" + index];
                const medida = receta.meals[0]["strMeasure" + index];

                if (ingrediente && medida && ingrediente.trim() !== "" && medida.trim() !== "") {
                    const li = document.createElement("li");
                    li.textContent = `${ingrediente} - ${medida}`; 
                    emerLista.append(li); 
                }
            }

            // Crear el boton para eliminar de favoritos si no existe
            const eliminarBtn = document.getElementById("eliminarBtn");
            if (!eliminarBtn) {
                const btn = document.createElement("button");
                btn.id = "eliminarBtn";
                btn.classList.add("btn", "btn-danger");
                btn.textContent = "Eliminar de favoritos";
                btn.addEventListener("click", () => {
                    eliminarDeFavoritos(receta.meals[0].idMeal); // Elimina la receta de favoritos
                });
                document.querySelector(".modal-footer").appendChild(btn); // Añado el boton al modal
            }

            // Guardar receta como favorita
            document.getElementById("gua").addEventListener("click", () => {
                const recetaFavorita = {
                    idMeal: receta.meals[0].idMeal,
                    strMeal: receta.meals[0].strMeal,
                    strMealThumb: receta.meals[0].strMealThumb
                };

                guardarEnFavoritos(recetaFavorita); // Llama a la funcion para guardar en favoritos
            });
        });
}

// FUNCION PARA ELIMINAR UNA RECETA DE FAVORITOS
// Elimino una receta de los favoritos guardados en el localStorage
function eliminarDeFavoritos(idReceta) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Obtiene los favoritos desde el localStorage
    favoritos = favoritos.filter(receta => receta.idMeal !== idReceta); // Filtra la receta eliminada

    localStorage.setItem("favoritos", JSON.stringify(favoritos)); // Guarda los favoritos actualizados

    mostrarFavoritos(); // Actualiza la vista de favoritos
    alert("Receta eliminada de favoritos."); // Muestra un mensaje al usuario
}

// FUNCION PARA GUARDAR UNA RECETA EN FAVORITOS
// Guarda una receta en los favoritos si no esta antes guardada
function guardarEnFavoritos(receta) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Saca los favoritos desde el localStorage

    if (!favoritos.some(fav => fav.idMeal === receta.idMeal)) {
        favoritos.push(receta); // Agrega la receta a los favoritos
        localStorage.setItem("favoritos", JSON.stringify(favoritos)); // Guarda los favoritos en el localStorage
        alert("Receta guardada en favoritos"); // Muestra un mensaje de exito
    } else {
        alert("Esta receta ya esta en favoritos."); // Si ya esta guardada, muestra un mensaje
    }
}

// FUNCION PARA MOSTRAR LAS RECETAS GUARDADAS EN FAVORITOS
// Muestra todas las recetas guardadas en los favoritos en la interfaz
function mostrarFavoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Obtiene los favoritos del localStorage
    row.innerHTML = ""; // Limpia la vista de recetas

    // Recorre las recetas favoritas y las muestra en la interfaz
    favoritos.forEach(receta => {
        row.innerHTML += `
            <div class="col-md-4">
                <div class="card text-white bg-info mb-3">
                    <div class="card-header">
                        <img src="${receta.strMealThumb}" class="img-fluid" alt="Imagen de ${receta.strMeal}">
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${receta.strMeal}</h4>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emergente" onclick="mostrarReceta(${receta.idMeal})">
                            Ver Receta
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Cargar las categorias al inicio cuando se cargue el documento
document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias(); // Llama a la función para cargar las categorias al inicio
});
