const STORAGE_KEY = "trendyshop_carrito";

export function guardarCarritoEnLocalStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("[cartService] Error al guardar en localStorage:", e);
  }
}

export function cargarCarritoDesdeLocalStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("[cartService] Error al cargar desde localStorage:", e);
    return [];
  }
}

export function limpiarCarritoEnLocalStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("[cartService] Error al limpiar localStorage:", e);
  }
}
