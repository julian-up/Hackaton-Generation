import { Carrito } from "./carrito.js";
import{
    renderCarrito,
    mostrarToast,
    mostrarError,
    confirmarAccion,
}from "./ui.js";

let carrito = null;

export const inicializarCarrito = () => {
    try{
        carrito = new Carrito();
        carrito.cargarCarrito();
        renderCarrito(carrito);
        registrarEventosCarrito();
    }catch(error){
        console.error("[app] error al iniciar el carrito:", error);
        mostrarError("no se pudo cargar tu carrito. Intenta recargar la pagina.");
    
    }
    return carrito;
};

export const agregarAlCarrito = (producto, cantidad = 1) => {
    if (!carrito) {
        carrito = new Carrito();
        carrito.cargarCarrito();
    }

    const exito = carrito.agregarProducto(producto, cantidad);

    if (exito) {
        mostrarToast(`${producto.nombre} se agregó al carrito.`, "exito");
    } else {
        mostrarToast("No se pudo agregar el producto al carrito", "error");
    }

    if (document.querySelector("#carrito-items")) {
        renderCarrito(carrito);
    }

    return exito;
};

const registrarEventosCarrito = () => {
  const contenedor = document.querySelector("#carrito-items");
  const botonVaciar = document.querySelector("#btn-vaciar-carrito");
 
  if (contenedor) {
    contenedor.addEventListener("click", manejarClicEnCarrito);
  } else {
    console.warn("[app] No se encontró #carrito-items para delegar eventos.");
  }
 
  if (botonVaciar) {
    botonVaciar.addEventListener("click", manejarVaciarCarrito);
    } 

};

const manejarClicEnCarrito = (evento) => {
  const boton = evento.target.closest("button[data-id]");
  if (!boton) return;
 
  const id = Number(boton.dataset.id);
 
  if (Number.isNaN(id)) {
    console.error("[app] data-id inválido en el botón:", boton);
    return;
  }
 
  try {
    if (boton.classList.contains("btn-incrementar")) {
      carrito.incrementarCantidad(id);
    } else if (boton.classList.contains("btn-decrementar")) {
      carrito.decrementarCantidad(id);
    } else if (boton.classList.contains("btn-eliminar")) {
      carrito.eliminarProducto(id);
      mostrarToast("Producto eliminado del carrito", "info");
    } else {
      return; // Clic en un botón no reconocido; no hacer nada.
    }
 
    renderCarrito(carrito);
  } catch (error) {
    console.error("[app] Error al procesar la acción del carrito:", error);
    mostrarToast("Ocurrió un error al actualizar el carrito", "error");
  }
};




const manejarVaciarCarrito = () => {
  if (carrito.estaVacio()) {
    mostrarToast("El carrito ya está vacío", "info");
    return;
  }
 
  const confirmado = confirmarAccion(
    "¿Seguro que deseas vaciar el carrito? Esta acción no se puede deshacer."
  );
 
  if (!confirmado) return;
 
  try {
    carrito.vaciarCarrito();
    renderCarrito(carrito);
    mostrarToast("Carrito vaciado correctamente", "exito");
  } catch (error) {
    console.error("[app] Error al vaciar el carrito:", error);
    mostrarToast("No se pudo vaciar el carrito", "error");
  }
};



export const obtenerInstanciaCarrito = () => carrito;


