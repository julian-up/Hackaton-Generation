import { initReveal, initNavToggle } from "./ux.js";
import { PRODUCTS } from "./data.js";
import { addItem, updateBadges } from "./cart.js";

const grid = document.getElementById("productos");
const filtersEl = document.getElementById("filtros");

const modal = document.getElementById("cat-modal");
const cmImg = document.getElementById("cmImg");
const cmTag = document.getElementById("cmTag");
const cmName = document.getElementById("cmName");
const cmPrice = document.getElementById("cmPrice");
const cmDesc = document.getElementById("cmDesc");
const cmFabric = document.getElementById("cmFabric");
const cmSizes = document.getElementById("cmSizes");
const cmAddBtn = document.getElementById("cmAddBtn");
let currentProduct = null;

function render(category) {
  const list =
    category === "Todo"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  grid.innerHTML = list
    .map(
      (p) =>
        '<article class="cat-card" data-product-id="' + p.id + '">' +
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

filtersEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".cat-filter");
  if (!btn) return;
  filtersEl
    .querySelectorAll(".cat-filter")
    .forEach((b) => b.classList.remove("is-active"));
  btn.classList.add("is-active");
  render(btn.dataset.cat);
});

function openModal(p) {
  currentProduct = p;
  cmImg.src = "../img/" + p.image;
  cmImg.alt = p.name;
  cmTag.textContent = p.tag;
  cmName.textContent = p.name;
  cmPrice.textContent = p.price;
  cmDesc.textContent = p.desc;
  cmFabric.textContent = "Composición · " + p.fabric;

  cmSizes.innerHTML = p.sizes
    .map((s) => '<button class="size">' + s + "</button>")
    .join("");

  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
  currentProduct = null;
}

document.getElementById("catModalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
});

cmSizes.addEventListener("click", (e) => {
  if (!e.target.classList.contains("size")) return;
  cmSizes
    .querySelectorAll(".size")
    .forEach((s) => s.classList.remove("is-active"));
  e.target.classList.add("is-active");
});

cmAddBtn.addEventListener("click", () => {
  if (!currentProduct) return;
  const sizeBtn = cmSizes.querySelector(".size.is-active");
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
  showToast(currentProduct.name + " (talla " + size + ") añadido");
});

grid.addEventListener("click", (e) => {
  const addBtn = e.target.closest("[data-id]");
  if (addBtn) {
    const p = PRODUCTS.find((x) => x.id === +addBtn.dataset.id);
    if (!p) return;
    addItem({
      id: p.id,
      name: p.name,
      price: p.price,
      numPrice: p.numPrice,
      image: p.image,
      size: p.sizes[0],
    });
    addBtn.textContent = "✓ Añadido";
    setTimeout(() => (addBtn.textContent = "Añadir"), 1200);
    return;
  }

  const card = e.target.closest("[data-product-id]");
  if (card) {
    const p = PRODUCTS.find((x) => x.id === +card.dataset.productId);
    if (p) openModal(p);
  }
});

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

render("Todo");
updateBadges();
initReveal();
initNavToggle();
