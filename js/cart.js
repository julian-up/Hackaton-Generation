const KEY = "trendyshop_cart";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function save(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addItem(product) {
  const items = load();
  const match = items.find(
    (i) => i.id === product.id && i.size === product.size,
  );
  if (match) {
    match.quantity += 1;
  } else {
    items.push({ ...product, quantity: 1 });
  }
  save(items);
  updateBadges();
}

export function removeItem(index) {
  const items = load();
  items.splice(index, 1);
  save(items);
  updateBadges();
}

export function updateQuantity(index, qty) {
  const items = load();
  if (qty <= 0) {
    items.splice(index, 1);
  } else {
    items[index].quantity = qty;
  }
  save(items);
  updateBadges();
}

export function getItems() {
  return load();
}

export function getTotalItems() {
  return load().reduce((s, i) => s + i.quantity, 0);
}

export function getTotalPrice() {
  return load().reduce((s, i) => s + i.numPrice * i.quantity, 0);
}

export function formatPrice(n) {
  return "$" + n.toLocaleString("es-CO");
}

export function clearCart() {
  localStorage.removeItem(KEY);
  updateBadges();
}

export function updateBadges() {
  const count = getTotalItems();
  document
    .querySelectorAll(".bag__count, #contador-carrito, .navbar__contador")
    .forEach((el) => {
      el.textContent = count;
      if (el.hasAttribute("hidden")) el.hidden = count === 0;
    });
  renderMiniCart();
}

function renderMiniCart() {
  const container = document.getElementById("mini-cart-items");
  if (!container) return;

  const items = load();
  if (items.length === 0) {
    container.innerHTML = '<p class="mini-cart__empty">Tu bolsa está vacía</p>';
    return;
  }

  const depth = window.location.pathname.includes("/carrito/") ||
                window.location.pathname.includes("/catalogo/") ||
                window.location.pathname.includes("/quienes-somos/") ||
                window.location.pathname.includes("/contactanos/")
    ? "../img/"
    : "./img/";

  container.innerHTML = items
    .map(
      (item) =>
        '<div class="mini-cart__item">' +
          '<img src="' + depth + item.image + '" alt="' + item.name + '">' +
          '<div class="mini-cart__item-name">' + item.name + "</div>" +
          '<div class="mini-cart__item-size">' + (item.size || "") +
            (item.quantity > 1 ? " ×" + item.quantity : "") +
          "</div>" +
        "</div>",
    )
    .join("");
}
