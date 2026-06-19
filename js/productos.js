const productosPrendas = document.getElementById("productos");
const vestidos = document.getElementById("vestidos");
const blusas = document.getElementById("blusas");
const abrigos = document.getElementById("abrigos");
const faldas = document.getElementById("faldas");
const pantalones = document.getElementById("pantalones");

let cantidadCarrito = 0;
let carrito = [];
document.addEventListener("DOMContentLoaded", () => {
  console.log("La página ya cargó");
  const productos = document.getElementById("productos");
  if (!productos) {
    console.warn(
      'Elemento con id "productos" no encontrado. No se cargarán los productos.',
    );
    return;
  }
  cargarProductos();
});
const productos = {
  prendas: [
    {
      id: 1,
      imagen: "prenda1.png",
      categoria: "Vestidos",
      descripcion: "Vestido midi Aurora",
      precio: "89.900",
    },
    {
      id: 2,
      imagen: "prenda2.png",
      categoria: "Blusas",
      descripcion: "Blusa de seda Elise",
      precio: "54.500",
    },
    {
      id: 3,
      imagen: "prenda3.png",
      categoria: "Abrigos",
      descripcion: "Abrigo largo Dune",
      precio: "139.000",
    },
    {
      id: 4,
      imagen: "prenda4.png",
      categoria: "Faldas",
      descripcion: "Falda plisada Coco",
      precio: "62.000",
    },
    {
      id: 5,
      imagen: "prenda5.png",
      categoria: "Blusas",
      descripcion: "Suéter de punto Rosa",
      precio: "49.900",
    },
    {
      id: 6,
      imagen: "prenda6.png",
      categoria: "Pantalones",
      descripcion: "Pantalón sastre Vino",
      precio: "78.000",
    },
  ],
};
function cargarProductos(categoria = "Todo") {
  productosPrendas.innerHTML = "";

  const lista =
    categoria === "Todo"
      ? productos.prendas
      : productos.prendas.filter((p) => p.categoria === categoria);

  lista.forEach((prenda) => {
    productosPrendas.innerHTML += `
            <article class="producto">
                <img src="../img/${prenda.imagen}" alt="${prenda.descripcion}">

                <div class="producto-info">
                    <div>
                        <span class="categoria">${prenda.categoria.toUpperCase()}</span>
                        <h3>${prenda.descripcion}</h3>
                        <p class="precio">$${prenda.precio}</p>
                    </div>

                    <button class="btn-add" onclick="agregarAlCarrito(${prenda.id})">+</button>
                    <button class="btn-remove" onclick="sacarDelCarrito(${prenda.id})">-</button>
                </div>
            </article>
        `;
  });
}
function sacarDelCarrito(idProducto) {
  const indice = carrito.findIndex((producto) => producto.id === idProducto);
  if (indice !== -1) {
    carrito.splice(indice, 1);

    cantidadCarrito = carrito.length;

    document.getElementById("contador-carrito").textContent = cantidadCarrito;

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}
export function agregarAlCarrito(idProducto) {
  const producto = productos.prendas.find((p) => p.id === idProducto);
  carrito.push(producto);
  cantidadCarrito = carrito.length;
  document.getElementById("contador-carrito").textContent = cantidadCarrito;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
vestidos.addEventListener("click", () => cargarProductos("Vestidos"));
blusas.addEventListener("click", () => cargarProductos("Blusas"));
abrigos.addEventListener("click", () => cargarProductos("Abrigos"));
faldas.addEventListener("click", () => cargarProductos("Faldas"));
pantalones.addEventListener("click", () => cargarProductos("Pantalones"));
document
  .getElementById("activo")
  .addEventListener("click", () => cargarProductos("Todo"));
