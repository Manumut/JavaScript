

        // VARIABLES Y CONSTANTES
        let selectorCategorias = document.querySelector('#categorias select');
        let row = document.querySelector('#recetas .row' );
        
        let emerTit = document.querySelector('#emergenteLabel');
        let emerImg = document.querySelector("#emergente img");
        let emerLista = document.querySelector("#emergente ul");
        let emerText = document.querySelector("#emergente p");
        

        // funcion para obtener los datos de la api pasandole la url
        function obtenerDatos(url){
            return fetch(url)
            .then(respuesta => respuesta.json());
        };

        
        function cargarCategorias(){
            const url1 ="https://www.themealdb.com/api/json/v1/1/categories.php";

            obtenerDatos(url1)
            .then(datos => {
                datos.categories.forEach(dato => {
                    console.log(dato.strCategory)
                    selectorCategorias.innerHTML += `
                        <option value="${dato.strCategory}"> ${dato.strCategory} </option>
                    `; 
                });
            });
        };
        
        cargarCategorias();

        function mostrarRecetasDeCateg(cat){
            const url2 ="https://www.themealdb.com/api/json/v1/1/filter.php?c="+cat;
            row.innerHTML=``;
            obtenerDatos(url2)
            .then(recetas => {
                recetas.meals.forEach(dato =>{
                    row.innerHTML +=`
                        <div class="col-md-4">
                            <div class="card text-white bg-primary mb-3">
                                <div class="card-header">
                                    <img src="${dato.strMealThumb}" class="img-fluid" alt="">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">
                                    ${dato.strMeal}
                                    </h4>

                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#emergente" onclick="mostrarReceta(${dato.idMeal})">
                                    Ver Receta
                                </button> 
                                </div>
                            </div>
                        </div>
                    `;
                });
            });
        };


        // ABRIR MODAL CON LOS DATOS DE LA RECETA
        function mostrarReceta(idReceta) {
            const url3 = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + idReceta;
        
            obtenerDatos(url3)
            .then(receta => {
                // Mostrar los datos de la receta en el modal
                emerTit.textContent = receta.meals[0].strMeal;
                emerImg.src = receta.meals[0].strMealThumb;
                emerText.textContent = receta.meals[0].strInstructions;
    
                // Limpiar la lista de ingredientes antes de agregar nuevos elementos
                emerLista.innerHTML = "";
    
                // Recorrer hasta 20 ingredientes
                for (let index = 1; index <= 20; index++) {
                    // Obtener el ingrediente y la medida
                    const ingrediente = receta.meals[0]["strIngredient" + index];
                    const medida = receta.meals[0]["strMeasure" + index];
                    console.log(ingrediente);
                    console.log(medida);

    
                    // Verificar que tanto el ingrediente como la medida no estén vacíos
                    if (ingrediente && medida && ingrediente.trim() !== "" && medida.trim() !== "") {
                        const li = document.createElement("li");
                        li.textContent = `${ingrediente} - ${medida}`;
                        emerLista.append(li);
                    };
                };
                
                
                document.getElementById("gua").addEventListener("click", () => {
                    // guarda el array desde localStorage o crea uno vacío si no existe
                    let guardId = JSON.parse(localStorage.getItem("guardId")) || [];
        
                    // Obtiene el id actual
                    const guardVar = receta.meals[0].idMeal;
        
                    // comprueba si el id ya está en el array
                    if (!guardId.includes(guardVar)) {
        
                        // Si no existe, lo agrega
                        guardId.push(guardVar);
        
                        // Guarda el array de id actualizado en localStorage
                        localStorage.setItem("guardId", JSON.stringify(guardId));
                    } 
                });

            });
        };
        
        
        
document.addEventListener("DOMContentLoaded",()=>{
    cargarCategorias();
})










