// ════════════════════════════════════════════════════════════════════════
// contactanos.js — Envío del formulario de contacto
// ────────────────────────────────────────────────────────────────────────
// Captura el evento submit del formulario, envía los datos a Formspree
// usando fetch (sin recargar la página) y muestra el estado al usuario.
// ════════════════════════════════════════════════════════════════════════

// Referencia al formulario y al párrafo donde mostramos el estado.
const formulario = document.getElementById("form-contacto");
const status = document.getElementById("form-status");

// Escucha el envío del formulario.
formulario.addEventListener("submit", async function (e) {
  // Previene que el navegador recargue la página (comportamiento por defecto).
  e.preventDefault();

  // Muestra un mensaje de carga mientras se envía.
  status.textContent = "Enviando...";

  // FormData recoge automáticamente los valores de los campos del formulario.
  const datos = new FormData(formulario);

  try {
    // Envía los datos al endpoint de Formspree configurado en el atributo action.
    const respuesta = await fetch(formulario.action, {
      method: "POST",
      body: datos,
      headers: {
        Accept: "application/json",
      },
    });

    if (respuesta.ok) {
      // Envío exitoso: muestra confirmación y limpia los campos.
      status.textContent = "¡Mensaje enviado con éxito!";
      formulario.reset();
    } else {
      // Error del servidor: intenta mostrar el mensaje de error de Formspree.
      const data = await respuesta.json();
      if (data.errors) {
        status.textContent =
          "Error: " + data.errors.map((e) => e.message).join(", ");
      } else {
        status.textContent = "Hubo un error al enviar el formulario.";
      }
    }
  } catch (error) {
    // Error de red: no se pudo conectar al servidor.
    status.textContent = "Error de conexión. Intenta de nuevo.";
  }
});
