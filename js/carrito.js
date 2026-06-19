import {
    guardarCarritoEnLocalStorage,
    cargarCarritoDesdeLocalStorage,
    limpiarCarritoEnLocalStorage,
} from "../services/cartServices.js";

export class Carrito {
    

    constructor(itemsIniciales = []) {

        this.items = Array.isArray(itemsIniciales) ? itemsIniciales : [];
    }

    agregarProducto(producto, cantidad = 1) {
        if (!this._esProductoValido(producto)) {
            console.error("[Carrito] Producto inválido, no se pudo agregar:", producto);
            return false;
        }

       if (cantidadSegura <= 0) {
      console.warn("[Carrito] Cantidad inválida, no se agregó el producto.");
      return false;
    }
 
    const itemExistente = this.items.find((item) => item.id === producto.id);
 
    if (itemExistente) {
      itemExistente.cantidad += cantidadSegura;
    } else {
      this.items.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: Number(producto.precio),
        imagen: producto.imagen ?? "",
        cantidad: cantidadSegura,
      });
    }
 
    this.guardarCarrito();
    return true;
  }



  EliminarProducto(id) {
    const existiaAntes = this.items.some((item) => item.id === id);
    this.items = this.items.filter((item) => item.id !== id);

    if (existiaAntes) {
        this.guardarCarrito();
    }

    return existiaAntes;

    }

   incrementarCantidad(id) {
    const item = this.items.find((item) => item.id === id);
 
    if (!item) {
      console.warn(`[Carrito] No se encontró el producto con id ${id} para incrementar.`);
      return false;
    }
 
    item.cantidad += 1;
    this.guardarCarrito();
    return true;
  }



  decrementarCantidad(id) {
    const item = this.items.find((item) => item.id === id);
 
    if (!item) {
      console.warn(`[Carrito] No se encontró el producto con id ${id} para decrementar.`);
      return false;
    }
 
    item.cantidad -= 1;
 
    if (item.cantidad <= 0) {
      this.eliminarProducto(id);
      return true;
    }
 
    this.guardarCarrito();
    return true;
  }


  vaciarCarrito() {
    this.items = [];
    this.guardarCarrito();
  }
 


  obtenerTotal() {
    return this.items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  obtenerSubtotal(id) {
    const item = this.items.find((item) => item.id === id);
    return item ? item.precio * item.cantidad : 0;
  }

  obtenerCantidadTotal() {
    return this.items.reduce((total, item) => total + item.cantidad, 0);
  }

  estaVacio() {
    return this.items.length === 0;
  }

  guardarCarrito() {
    return guardarCarritoEnStorage(this.items);
  }

  cargarCarrito() {
    this.items = cargarCarritoDesdeStorage();
    return this.items;
  }

  resetCarrito() {
    this.items = [];
    limpiarCarritoEnStorage();
  }

   _esProductoValido(producto) {
    return (
      producto &&
      typeof producto.id === "number" &&
      typeof producto.nombre === "string" &&
      producto.nombre.trim().length > 0 &&
      typeof producto.precio === "number" &&
      !Number.isNaN(producto.precio) &&
      producto.precio >= 0
    );
  }

   _sanearCantidad(cantidad) {
    const valor = Number(cantidad);
    if (Number.isNaN(valor) || valor <= 0) return 0;
    return Math.floor(valor);
  }
}