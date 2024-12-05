// VARIABLES Y CONSTANTES
let selectorCategorias = document.querySelector('#categorias select');
let row = document.querySelector('#recetas .row');

let emerTit = document.querySelector('#emergenteLabel');
let emerImg = document.querySelector("#emergente img");
let emerLista = document.querySelector("#emergente ul");
let emerText = document.querySelector("#emergente p");

// FUNCION PARA OBTENER LOS DATOS DE LA API PASÁNDOLE LA URL
function obtenerDatos(url) {
    return fetch(url).then(respuesta => respuesta.json());
}

// FUNCION PARA CARGAR LAS CATEGORÍAS DE LA API
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

cargarCategorias();

// FUNCION PARA MOSTRAR LAS RECETAS DE UNA CATEGORÍA SELECCIONADA
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

            // Limpiar la lista de ingredientes antes de agregar nuevos elementos
            emerLista.innerHTML = "";

            // Recorrer hasta 20 ingredientes
            for (let index = 1; index <= 20; index++) {
                const ingrediente = receta.meals[0]["strIngredient" + index];
                const medida = receta.meals[0]["strMeasure" + index];

                if (ingrediente && medida && ingrediente.trim() !== "" && medida.trim() !== "") {
                    const li = document.createElement("li");
                    li.textContent = `${ingrediente} - ${medida}`;
                    emerLista.append(li);
                }
            }

            // Crear el botón de eliminar si es necesario
            const eliminarBtn = document.getElementById("eliminarBtn");
            if (!eliminarBtn) {
                const btn = document.createElement("button");
                btn.id = "eliminarBtn";
                btn.classList.add("btn", "btn-danger");
                btn.textContent = "Eliminar de favoritos";
                btn.addEventListener("click", () => {
                    eliminarDeFavoritos(receta.meals[0].idMeal);
                    const modalElement = bootstrap.Modal.getInstance(document.getElementById("emergente"));
                    modalElement.hide();
                });
                document.querySelector(".modal-footer").appendChild(btn);
            }

            // Guardar receta como favorita
            document.getElementById("gua").addEventListener("click", () => {
                const recetaFavorita = {
                    idMeal: receta.meals[0].idMeal,
                    strMeal: receta.meals[0].strMeal,
                    strMealThumb: receta.meals[0].strMealThumb
                };

                guardarEnFavoritos(recetaFavorita);
            });
        });
}

// FUNCION PARA ELIMINAR UNA RECETA DE FAVORITOS
function eliminarDeFavoritos(idReceta) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(receta => receta.idMeal !== idReceta);

    // Guardar los favoritos actualizados
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Actualizar la vista de favoritos
    mostrarFavoritos();
    alert("Receta eliminada de favoritos.");
}


// FUNCION PARA GUARDAR UNA RECETA EN FAVORITOS
function guardarEnFavoritos(receta) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (!favoritos.some(fav => fav.idMeal === receta.idMeal)) {
        favoritos.push(receta);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        alert("Receta guardada en favoritos!");
    } else {
        alert("Esta receta ya está en favoritos.");
    }
}

// FUNCION PARA MOSTRAR LAS RECETAS GUARDADAS EN FAVORITOS
function mostrarFavoritos() {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    row.innerHTML = "";

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

// FUNCION PARA ELIMINAR UNA RECETA DE FAVORITOS
function eliminarDeFavoritos(idReceta) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(receta => receta.idMeal !== idReceta);

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    mostrarFavoritos();
    alert("Receta eliminada de favoritos.");
}

document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
});
