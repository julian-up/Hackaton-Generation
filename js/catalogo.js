// Lógica de la página de catálogo.
// Renderiza productos con filtro por categoría y conecta con el carrito.
import { initReveal } from "./ux.js";
import { PRODUCTS } from "./data.js";
import { addItem, updateBadges } from "./cart.js";

const grid = document.getElementById("productos");
const filtersEl = document.getElementById("filtros");

// Renderiza las tarjetas de producto filtradas por categoría.
function render(category) {
  const list =
    category === "Todo"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  grid.innerHTML = list
    .map(
      (p) =>
        '<article class="cat-card">' +
          '<div class="cat-card__img">' +
            '<img src="../img/' + p.image + '" alt="' + p.name + '">' +
            '<span class="cat-card__tag">' + p.tag + "</span>" +
          "</div>" +
          '<div class="cat-card__body">' +
            '<span class="cat-card__cat">' + p.category.toUpperCase() + "</span>" +
            '<h3 class="cat-card__name">' + p.name + "</h3>" +
            '<p class="cat-card__desc">' + p.desc + "</p>" +
            '<div class="cat-card__foot">' +
              '<span class="cat-card__price">' + p.price + "</span>" +
              '<button class="btn btn--solid cat-card__btn" data-id="' + p.id + '">Añadir</button>' +
            "</div>" +
          "</div>" +
        "</article>",
    )
    .join("");
}

// Filtros: al hacer clic en un botón, resalta el activo y re-renderiza.
filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".cat-filter");
  if (!btn) return;
  filtersEl
    .querySelectorAll(".cat-filter")
    .forEach((b) => b.classList.remove("is-active"));
  btn.classList.add("is-active");
  render(btn.dataset.cat);
});

// Delegación: clic en "Añadir" dentro del grid agrega al carrito.
grid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-id]");
  if (!btn) return;
  const p = PRODUCTS.find((x) => x.id === +btn.dataset.id);
  if (!p) return;

  addItem({
    id: p.id,
    name: p.name,
    price: p.price,
    numPrice: p.numPrice,
    image: p.image,
    size: p.sizes[0],
  });

  // Feedback visual en el botón.
  btn.textContent = "✓ Añadido";
  setTimeout(() => (btn.textContent = "Añadir"), 1200);
});

// Inicialización.
render("Todo");
updateBadges();
initReveal();
