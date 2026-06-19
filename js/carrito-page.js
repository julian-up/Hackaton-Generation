import {
  getItems,
  removeItem,
  updateQuantity,
  clearCart,
  getTotalPrice,
  formatPrice,
  updateBadges,
} from "./cart.js";

const container = document.getElementById("cart-items");
const emptyMsg = document.getElementById("cart-empty");
const summary = document.getElementById("cart-summary");
const totalEl = document.getElementById("cart-total");

function render() {
  const items = getItems();

  if (items.length === 0) {
    container.innerHTML = "";
    emptyMsg.hidden = false;
    summary.hidden = true;
    return;
  }

  emptyMsg.hidden = true;
  summary.hidden = false;
  totalEl.textContent = formatPrice(getTotalPrice());

  container.innerHTML = items
    .map(
      (item, i) =>
        '<div class="cart-item">' +
          '<div class="cart-item__img">' +
            '<img src="../img/' + item.image + '" alt="' + item.name + '">' +
          "</div>" +
          '<div class="cart-item__info">' +
            '<h3 class="cart-item__name">' + item.name + "</h3>" +
            '<span class="cart-item__meta">Talla: ' + (item.size || "—") + "</span>" +
            '<span class="cart-item__price">' + item.price + "</span>" +
          "</div>" +
          '<div class="cart-item__actions">' +
            '<button class="cart-item__qty-btn" data-action="dec" data-i="' + i + '">−</button>' +
            '<span class="cart-item__qty">' + item.quantity + "</span>" +
            '<button class="cart-item__qty-btn" data-action="inc" data-i="' + i + '">+</button>' +
            '<button class="cart-item__remove" data-action="remove" data-i="' + i + '">✕</button>' +
          "</div>" +
        "</div>",
    )
    .join("");
}

container.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;
  const idx = +btn.dataset.i;
  const action = btn.dataset.action;
  const items = getItems();

  if (action === "inc") updateQuantity(idx, items[idx].quantity + 1);
  else if (action === "dec") updateQuantity(idx, items[idx].quantity - 1);
  else if (action === "remove") removeItem(idx);

  render();
});

document.getElementById("btn-clear").addEventListener("click", () => {
  clearCart();
  render();
});

document.getElementById("btn-buy").addEventListener("click", () => {
  const total = formatPrice(getTotalPrice());
  clearCart();
  render();
  container.innerHTML =
    '<div class="cart-success">' +
      '<h2>¡Compra confirmada!</h2>' +
      "<p>Total pagado: " + total + "</p>" +
      "<p>Gracias por tu compra. Recibirás un correo de confirmación.</p>" +
      '<a href="../catalogo/index.html" class="btn btn--solid" style="margin-top:var(--s4)">Seguir comprando</a>' +
    "</div>";
  summary.hidden = true;
  emptyMsg.hidden = true;
});

import { initNavToggle } from "./ux.js";
render();
updateBadges();
initNavToggle();
