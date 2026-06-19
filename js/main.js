import { $, $$, initTilt, initReveal, initNavToggle } from "./ux.js";
import { PRODUCTS } from "./data.js";
import { addItem, updateBadges } from "./cart.js";

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

$("#rail").innerHTML = PRODUCTS.map(renderCard).join("");

initTilt();
initReveal();
initNavToggle();

updateBadges();

const modal = $("#modal");
let currentProduct = null;

function openModal(p) {
  currentProduct = p;
  $("#mImg").src = "./img/" + p.image;
  $("#mImg").alt = p.name;
  $("#mTag").textContent = p.tag;
  $("#mName").textContent = p.name;
  $("#mPrice").textContent = p.price;
  $("#mDesc").textContent = p.desc;
  $("#mFabric").textContent = "Composición · " + p.fabric;

  $("#mSizes").innerHTML = p.sizes
    .map((s) => '<button class="size">' + s + "</button>")
    .join("");

  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
  currentProduct = null;
}

$("#rail").addEventListener("click", (e) => {
  const card = e.target.closest("[data-i]");
  if (card) openModal(PRODUCTS[+card.getAttribute("data-i")]);
});

$("#mSizes").addEventListener("click", (e) => {
  if (!e.target.classList.contains("size")) return;
  $$(".size", modal).forEach((s) => s.classList.remove("is-active"));
  e.target.classList.add("is-active");
});

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

$("#modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
$(".modal__card").addEventListener("click", (e) => e.stopPropagation());
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

$("#goCatalogo").addEventListener("click", () => {
  closeModal();
  window.location.href = "./catalogo/index.html";
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
