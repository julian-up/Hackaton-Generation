
const SELECTORES = {
  contenedorCarrito: "#carrito-items",
  totalCarrito: "#carrito-total",
  contadorNavbar: "#contador-carrito",
  mensajeVacio: "#carrito-vacio",
  toastContainer: "#toast-container",
};

export const renderCarrito = (carrito) => {
  const contenedor = document.querySelector(SELECTORES.contenedorCarrito);
  const elementoTotal = document.querySelector(SELECTORES.totalCarrito);
  const mensajeVacio = document.querySelector(SELECTORES.mensajeVacio);

  if (!contenedor) {
    console.error(`[ui] No se encontró el contenedor ${SELECTORES.contenedorCarrito}`);
    return;
  }

  if (carrito.estaVacio()) {
    contenedor.innerHTML = "";
    if (mensajeVacio) mensajeVacio.hidden = false;
    if (elementoTotal) elementoTotal.textContent = formatearPrecio(0);
    actualizarContadorNavbar(0);
    return;
  }

  if (mensajeVacio) mensajeVacio.hidden = true;

  contenedor.innerHTML = carrito.items
    .map((item) => renderItemCarrito(item))
    .join("");

  if (elementoTotal) {
    elementoTotal.textContent = formatearPrecio(carrito.obtenerTotal());
  }

  actualizarContadorNavbar(carrito.obtenerCantidadTotal());
};


const renderItemCarrito = (item) => {
  const subtotal = item.precio * item.cantidad;

  return `
    <article class="carrito-item" data-id="${item.id}">
      <img class="carrito-item__imagen" src="${item.imagen}" alt="${item.nombre}" />
      <div class="carrito-item__info">
        <h3 class="carrito-item__nombre">${item.nombre}</h3>
        <p class="carrito-item__precio-unitario">${formatearPrecio(item.precio)} c/u</p>
      </div>
      <div class="carrito-item__cantidad">
        <button
          type="button"
          class="btn-decrementar"
          data-id="${item.id}"
          aria-label="Disminuir cantidad de ${item.nombre}"
        >−</button>
        <span class="carrito-item__cantidad-valor">${item.cantidad}</span>
        <button
          type="button"
          class="btn-incrementar"
          data-id="${item.id}"
          aria-label="Aumentar cantidad de ${item.nombre}"
        >+</button>
      </div>
      <p class="carrito-item__subtotal">${formatearPrecio(subtotal)}</p>
      <button
        type="button"
        class="btn-eliminar"
        data-id="${item.id}"
        aria-label="Eliminar ${item.nombre} del carrito"
      >Eliminar</button>
    </article>
  `;
};
export const actualizarContadorNavbar = (cantidad) => {
  const contador = document.querySelector(SELECTORES.contadorNavbar);
  if (!contador) return;

  contador.textContent = cantidad;
  contador.hidden = cantidad === 0;
};

export const mostrarToast = (mensaje, tipo = "info", duracionMs = 3000) => {
  const contenedor = document.querySelector(SELECTORES.toastContainer);

  if (!contenedor) {
    console.warn(`[ui] No se encontró ${SELECTORES.toastContainer}, se omite el toast.`);
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${tipo}`;
  toast.setAttribute("role", "status");
  toast.textContent = mensaje;

  contenedor.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, duracionMs);
};
export const mostrarError = (mensaje) => {
  const contenedor = document.querySelector(SELECTORES.contenedorCarrito);
  if (!contenedor) {
    console.error("[ui] No se pudo mostrar el error, falta el contenedor del carrito.");
    return;
  }

  contenedor.innerHTML = `
    <p class="carrito-error" role="alert">${mensaje}</p>
  `;
};

export const confirmarAccion = (mensaje) => window.confirm(mensaje);

const formatearPrecio = (valor) => {
  return `$${Number(valor).toFixed(2)}`;
};
