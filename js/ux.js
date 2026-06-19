// Busca el primer elemento que coincida con un selector CSS (como document.querySelector).
// 's' es el selector (ej. '.clase'), 'c' es el contexto (opcional, por defecto es todo el documento).
export const $ = (s, c) => (c || document).querySelector(s);

// Busca TODOS los elementos que coincidan y los devuelve como un Array normal (no un NodeList).
export const $$ = (s, c) => [...(c || document).querySelectorAll(s)];

// Verifica si el usuario tiene activada la opción de "reducir movimiento" en su sistema operativo.
// Es una buena práctica de accesibilidad para personas que sufren de mareos.
export const reduceMotion =
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Función para inicializar un efecto de inclinación 3D al pasar el ratón.
export function initTilt() {
  // Si el usuario prefiere no ver animaciones, salimos de la función sin hacer nada.
  if (reduceMotion) return;

  // Seleccionamos todos los elementos que tengan el atributo 'data-tilt'.
  $$("[data-tilt]").forEach((el) => {
    // Escuchamos el movimiento del ratón DENTRO del elemento.
    el.addEventListener("mousemove", (e) => {
      // Obtenemos las medidas y posición actual del elemento en la pantalla.
      const r = el.getBoundingClientRect();

      // Calculamos la posición del ratón en un rango de -0.5 a 0.5 (donde 0 es el centro exacto).
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;

      // Aplicamos transformaciones CSS en 3D (rotación en X e Y basándonos en la posición del ratón).
      // El translateZ(24px) hace que el elemento parezca flotar hacia el usuario.
      el.style.transform =
        "perspective(1000px) rotateY(" +
        x * 12 +
        "deg) rotateX(" +
        -y * 12 +
        "deg) translateZ(24px)";
    });

    // Cuando el ratón SALE del elemento, eliminamos el estilo para que vuelva a su estado original (plano).
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

// Función para hacer que los elementos aparezcan progresivamente mientras el usuario hace scroll.
export function initReveal() {
  // Seleccionamos todos los elementos con la clase '.reveal'.
  const reveals = $$(".reveal");

  // Si el usuario prefiere no ver animaciones, o si el navegador es muy antiguo y no soporta IntersectionObserver...
  if (reduceMotion || !("IntersectionObserver" in window)) {
    // ...hacemos que todos los elementos sean visibles de inmediato y terminamos.
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Creamos un "vigilante" (Observer) que avisará cuando los elementos entren a la pantalla.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        // Si el elemento ya es visible en la pantalla (isIntersecting)...
        if (en.isIntersecting) {
          // Le añadimos la clase que lo hace visible (usualmente esto tiene una transición CSS).
          en.target.classList.add("is-visible");
          // Dejamos de vigilar este elemento porque ya apareció (mejora el rendimiento).
          io.unobserve(en.target);
        }
      });
    },
    // Configuración: El elemento debe estar 12% visible (0.12), y empezamos a calcularlo un poquito antes de que llegue abajo (-8%).
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  // Le decimos al vigilante que comience a observar todos los elementos seleccionados al principio.
  reveals.forEach((el) => io.observe(el));
}
