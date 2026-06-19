// Importamos nuestras herramientas (funciones) del archivo ux.js
import { $, $$, initTilt, initReveal } from "./ux.js";

// Un arreglo de objetos que funciona como nuestra base de datos local (inventario).
const PRODUCTS = [
  {
    name: "Vestido Toscana",
    price: "$289.000",
    tag: "Nuevo",
    cap: "foto · vestido lino",
    fabric: "100% lino europeo",
    sizes: ["XS", "S", "M", "L"],
    desc: "Vestido midi en lino lavado, caída fluida y cintura marcada. Frescura natural para el día a día.",
  },
  // ... (los demás productos siguen la misma estructura) ...
  {
    name: "Pantalón Oak",
    price: "$239.000",
    tag: "Sastre",
    cap: "foto · pantalón sastre",
    fabric: "Crepé reciclado",
    sizes: ["XS", "S", "M", "L", "XL"],
    desc: "Pantalón de sastre de pierna recta y tiro alto. Estiliza y combina con todo el armario.",
  },
];

// Función para crear el código HTML de una sola tarjeta de producto.
// Recibe 'p' (el producto) e 'i' (el índice o posición del producto en el arreglo).
function renderCard(p, i) {
  // Construye y retorna un bloque de texto HTML concatenando las propiedades del producto.
  // Nota el atributo 'data-i="' + i + '"', que guarda el número de índice para usarlo después.
  return (
    '<article class="card" data-tilt data-i="' +
    i +
    '">' +
    '<div class="card__img ph ph--oak"><span class="ph__cap">' +
    p.cap +
    "</span>" +
    '<span class="card__tag">' +
    p.tag +
    "</span></div>" +
    '<div class="card__body"><h3 class="card__name">' +
    p.name +
    "</h3>" +
    '<div class="card__row"><span class="card__price">' +
    p.price +
    "</span>" +
    '<span class="card__add">Añadir +</span></div></div></article>'
  );
}

// 1. PRODUCTS.map(renderCard): Transforma cada producto del arreglo en un texto HTML.
// 2. .join(""): Une todos esos textos en uno solo, sin comas.
// 3. $("#rail").innerHTML: Inyecta todo ese HTML dentro del contenedor con el id "rail".
$("#rail").innerHTML = PRODUCTS.map(renderCard).join("");

// Activamos los efectos visuales que importamos arriba para estos nuevos elementos.
initTilt();
initReveal();

// ── Modal ─────────────────────────────────────────────────────────────────
const modal = $("#modal"); // Seleccionamos la ventana emergente (modal).

// Función para abrir el modal y llenarlo con la información de un producto específico (p).
function openModal(p) {
  // Rellenamos cada parte del modal con los datos del producto seleccionado.
  $("#mCap").textContent = p.cap;
  $("#mTag").textContent = p.tag;
  $("#mName").textContent = p.name;
  $("#mPrice").textContent = p.price;
  $("#mDesc").textContent = p.desc;
  $("#mFabric").textContent = "Composición · " + p.fabric;

  // Transformamos el arreglo de tallas en botones HTML.
  $("#mSizes").innerHTML = p.sizes
    .map((s) => '<button class="size">' + s + "</button>")
    .join("");

  // Mostramos el modal quitando su estado oculto.
  modal.hidden = false;
}

// Función para cerrar el modal.
function closeModal() {
  modal.hidden = true;
}

// Función para escuchar los clics en el contenedor principal de las tarjetas (el "rail").
// Esto se llama "Delegación de Eventos".
function wireRail(railId) {
  $(railId).addEventListener("click", (e) => {
    // Busca si lo que se hizo clic está dentro de una tarjeta con el atributo 'data-i'.
    const card = e.target.closest("[data-i]");
    // Si se hizo clic en una tarjeta, obtenemos su índice (+card.getAttribute) y abrimos el modal con ese producto.
    if (card) openModal(PRODUCTS[+card.getAttribute("data-i")]);
  });
}
// Ejecutamos la función para el contenedor de productos.
wireRail("#rail");

// Escucha clics en la sección de tallas dentro del modal.
$("#mSizes").addEventListener("click", (e) => {
  // Si no hicimos clic en un botón de talla, ignoramos la acción.
  if (!e.target.classList.contains("size")) return;
  // Le quitamos la clase 'is-active' a TODAS las tallas...
  $$(".size", modal).forEach((s) => s.classList.remove("is-active"));
  // ...y se la agregamos SOLO a la talla en la que acabamos de hacer clic.
  e.target.classList.add("is-active");
});

// Cierra el modal si hacemos clic en el botón de cerrar.
$("#modalClose").addEventListener("click", closeModal);

// Cierra el modal si hacemos clic fuera de la tarjeta (en el fondo oscuro).
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Evita que un clic DENTRO de la tarjeta del modal se propague hacia el fondo y lo cierre por accidente.
$(".modal__card").addEventListener("click", (e) => e.stopPropagation());

// Cierra el modal si el usuario presiona la tecla "Escape" en su teclado.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Acción para el botón de ir al catálogo: Cierra el modal y navega a la sección #coleccion.
$("#goCatalogo").addEventListener("click", () => {
  closeModal();
  window.location.hash = "#coleccion";
});
