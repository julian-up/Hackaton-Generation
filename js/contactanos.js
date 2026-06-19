const formulario = document.getElementById("form-contacto");
const status = document.getElementById("form-status");

formulario.addEventListener("submit", async function (e) {
  e.preventDefault();

  status.textContent = "Enviando...";

  const datos = new FormData(formulario);

  try {
    const respuesta = await fetch(formulario.action, {
      method: "POST",
      body: datos,
      headers: {
        Accept: "application/json",
      },
    });

    if (respuesta.ok) {
      status.textContent = "¡Mensaje enviado con éxito!";
      formulario.reset();
    } else {
      const data = await respuesta.json();
      if (data.errors) {
        status.textContent =
          "Error: " + data.errors.map((e) => e.message).join(", ");
      } else {
        status.textContent = "Hubo un error al enviar el formulario.";
      }
    }
  } catch (error) {
    status.textContent = "Error de conexión. Intenta de nuevo.";
  }
});
