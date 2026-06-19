// Importamos las funciones de UX compartidas desde el módulo ux.js.
// initTilt: activa el efecto 3D al pasar el ratón sobre elementos con [data-tilt].
// initReveal: activa la aparición progresiva al hacer scroll en elementos con .reveal.
import { initTilt, initReveal } from "./ux.js";

// Inicializamos ambos efectos para la página de Quiénes Somos.
// Las tarjetas de valores y miembros del equipo usan data-tilt (efecto 3D).
// Las secciones de historia, valores y cifras usan .reveal (aparición al scroll).
initTilt();
initReveal();
