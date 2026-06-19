// Lógica de la página principal (index.html).
// Renderiza las tarjetas del carrusel, maneja el modal y conecta con el carrito.
import { $, $$, initTilt, initReveal } from "./ux.js";
import { PRODUCTS } from "./data.js";
import { addItem, updateBadges } from "./cart.js";

// ── Carrusel de productos ────────────────────────────────────────────────
// Genera el HTML de cada tarjeta con su imagen real.
function renderCard(p, i) {
  return (
    '<article class="card" data-tilt data-i="' + i + '">' +
      '<div class="card__img">' +
        '<img src="./img/' + p.image + '" alt="' + p.name + '">' +
        '<span class="card__tag">' + p.tag + '</span>' +
      '</div>' +
      '<div class="card__body">' +
        '<h3 class="card__name">' + p.name + '</h3>' +
        '<div class="card__row">' +
          '<span class="card__price">' + p.price + '</span>' +
          '<span class="card__add">Añadir +</span>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

// Inyecta las tarjetas en el riel del carrusel.
$("#rail").innerHTML = PRODUCTS.map(renderCard).join("");

// Inicializa los efectos de tilt 3D y aparición al scroll.
initTilt();
initReveal();

// Actualiza los badges del carrito al cargar la página.
updateBadges();

// ── Modal de producto ────────────────────────────────────────────────────
const modal = $("#modal");
let currentProduct = null;

// Abre el modal con la info y la imagen del producto seleccionado.
function openModal(p) {
  currentProduct = p;
  $("#mImg").src = "./img/" + p.image;
  $("#mImg").alt = p.name;
  $("#mTag").textContent = p.tag;
  $("#mName").textContent = p.name;
  $("#mPrice").textContent = p.price;
  $("#mDesc").textContent = p.desc;
  $("#mFabric").textContent = "Composición · " + p.fabric;

  // Genera botones de talla y los inyecta.
  $("#mSizes").innerHTML = p.sizes
    .map((s) => '<button class="size">' + s + "</button>")
    .join("");

  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
  currentProduct = null;
}

// Delegación de eventos: un clic en cualquier tarjeta del riel abre su modal.
$("#rail").addEventListener("click", (e) => {
  const card = e.target.closest("[data-i]");
  if (card) openModal(PRODUCTS[+card.getAttribute("data-i")]);
});

// Selección de talla: resalta la talla elegida.
$("#mSizes").addEventListener("click", (e) => {
  if (!e.target.classList.contains("size")) return;
  $$(".size", modal).forEach((s) => s.classList.remove("is-active"));
  e.target.classList.add("is-active");
});

// Botón "Añadir a la bolsa": agrega al carrito con la talla seleccionada.
$("#btnAddToBag").addEventListener("click", () => {
  if (!currentProduct) return;
  const sizeBtn = $(".size.is-active", modal);
  const size = sizeBtn ? sizeBtn.textContent : currentProduct.sizes[0];

  addItem({
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    numPrice: currentProduct.numPrice,
    image: currentProduct.image,
    size: size,
  });

  closeModal();
  showToast(currentProduct.name + " (talla " + size + ") añadido a la bolsa");
});

// Cerrar modal: botón X, clic en fondo, tecla Escape.
$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
$(".modal__card").addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// "Ver en el catálogo" cierra el modal y navega a la página del catálogo.
$("#goCatalogo").addEventListener("click", () => {
  closeModal();
  window.location.href = "./catalogo/index.html";
});

// ── Toast de notificación ────────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement("div");
  t.className = "toast-msg";
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add("is-visible"));
  setTimeout(() => {
    t.classList.remove("is-visible");
    setTimeout(() => t.remove(), 300);
  }, 2200);
}
