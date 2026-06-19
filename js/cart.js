// Módulo de carrito unificado con persistencia en localStorage.
// Todas las páginas importan de aquí para mantener un carrito consistente.
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

// Agrega un producto al carrito. Si ya existe con la misma talla, incrementa cantidad.
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

// Elimina un ítem del carrito por su posición en el arreglo.
export function removeItem(index) {
  const items = load();
  items.splice(index, 1);
  save(items);
  updateBadges();
}

// Cambia la cantidad de un ítem. Si llega a 0, lo elimina.
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

// Formatea un número como precio colombiano: $89.900
export function formatPrice(n) {
  return "$" + n.toLocaleString("es-CO");
}

export function clearCart() {
  localStorage.removeItem(KEY);
  updateBadges();
}

// Actualiza todos los badges de carrito visibles en la página actual.
export function updateBadges() {
  const count = getTotalItems();
  document
    .querySelectorAll(".bag__count, #contador-carrito, .navbar__contador")
    .forEach((el) => {
      el.textContent = count;
      if (el.hasAttribute("hidden")) el.hidden = count === 0;
    });
}
