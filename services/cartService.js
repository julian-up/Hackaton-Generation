const CART_STORAGE_KEY = "carrito";

export const guardarCarritoEnStorage = (items) => {
  try {
    const data = JSON.stringify(items);
    localStorage.setItem(CART_STORAGE_KEY, data);
    return true;
  } catch (error) {
    console.error("[cartService] Error al guardar el carrito en localStorage:", error);
    return false;
  }
};

export const cargarCarritoDesdeStorage = () => {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      console.warn("[cartService] Datos de carrito corruptos (no es un array). Se ignoran.");
      return [];
    }
    return parsed;
  } catch (error) {
    console.error("[cartService] Error al leer el carrito de localStorage:", error);
    return [];
  }
};

export const limpiarCarritoEnStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("[cartService] Error al limpiar el carrito en localStorage:", error);
    return false;
  }
};

export const storageDisponible = () => {
  try {
    const testKey = "__trendyshop_test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};
