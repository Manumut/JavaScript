const URL = "https://dummyjson.com/products";
let row = document.querySelector("section#productos .row");
let compras = document.querySelector(".compras");
let carritoCompras = document.querySelector(".carritoCompras");
let carrito = [];
let numProductosCarrito = document.createElement("span");
let contador = 0;
numProductosCarrito.classList.add("badge", "bg-primary", "rounded-pill");
carritoCompras.append(numProductosCarrito);

document.addEventListener("DOMContentLoaded", () => {
	async function cargarProductos() {
		let datos = await fetch(URL);
		let resultados = await datos.json();
		resultados.products.forEach((producto) => {
			row.innerHTML += ` 
                    
                <div class="col-md-4">
					<div class="card border-primary mb-3">
						<div class="card-header">
							<img
								src="${producto.thumbnail}"
								alt=""
								class="img-fluid"
							/>
						</div>
						<div class="card-body d-flex flex-column">
							<h4 class="card-title">${producto.title}</h4>
							<p class="card-text">${producto.description}</p>
							
                            <p><span>${producto.price}</span> €</p>
							<button class="btn btn-danger mt-auto py-3" onClick="agregarAlCarrito(this,${producto.id})" >Añadir al carrito</button>
						</div>
					</div>
				</div>
                
                `;
		});
	}

	cargarProductos();

	// AGREGAR PRDOCUTOS AL CARRITO
});

function agregarAlCarrito(elemento, id) {
	let padre = elemento.parentElement.parentElement;
	// console.log(padre);
	let elementoActual = {
		id,
		titulo: padre.querySelector("h4").textContent,
		img: padre.querySelector("img").src,
		cantidad: 1,
		precio: padre.querySelector("p span").textContent,
	};
	let existeProducto = carrito.some((producto) => producto.id == id);
	if (!existeProducto) {
		carrito = [...carrito, elementoActual];
		console.log(carrito);
	} else {
		carrito.map((producto) => {
			if (producto.id == id) {
				producto.cantidad++;
			}
		});
	}
	// let existeProducto = carrito.some((producto) => producto.id);

	// if (!existeProducto) {
	// 	carrito.push(elementoActual);
	// }

	// if (!existeProducto) {
	// 	carrito.push(elementoActual);
	// }

	// console.log(carrito);
	cargarCarrito();
}


function cargarCarrito() {
	limpiar();

	// numProductosCarrito.textContent

	let cantidadTotal = carrito.reduce((acum, objeto) => {
		return acum + objeto.cantidad;
	}, 0);
	numProductosCarrito.textContent = cantidadTotal;

	carrito.forEach((producto) => {
		compras.innerHTML += `
        	<div class="row my-3 py-3 align-items-center border-bottom">
						<div class="col-md-3">
							<img
								src="${producto.img}"
								alt=""
								class="img-fluid"
							/>
						</div>

						<div class="col-md-3">
							<p>${producto.titulo}</p>
						</div>

						<div class="col-md-3">
							<p>${producto.precio}€ x ${producto.cantidad}</p>
						</div>

						<div class="col-md-3">
							<button class="btn-close" onClick="borrarProductoCarrito(this, ${producto.id})"></button>
						</div>
					</div>
        
        `;
	});
}

function borrarProductoCarrito(elemento, id) {
	let cantidadTotal = carrito.reduce((acum, objeto) => {
		return acum + objeto.cantidad;
	}, 0);
	cantidadTotal--;
	numProductosCarrito.textContent = cantidadTotal;

	elemento.parentElement.parentElement.remove();
	// carrito.splice(carrito.indexOf(id), 1);

	// carrito = carrito.filter((producto) => producto.id != id);
	carrito = carrito.filter((producto) => producto.id !== id);
}
function limpiar() {
	compras.innerHTML = "";
}
