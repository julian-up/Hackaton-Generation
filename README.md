# TrendyShop — Boutique Femenina

Tienda en línea de moda femenina desarrollada como proyecto de hackathon. Sitio estático multi-página con HTML5, CSS3 vanilla y JavaScript ES6+ (módulos nativos), sin frameworks ni herramientas de build.

## Equipo de Desarrollo

| Integrante | Rol |
|---|---|
| María Góngora | Desarrolladora Frontend |
| Carol Sepúlveda | Desarrolladora Backend |
| Andrés Escobar | Desarrollador Full Stack |
| Yosed Sánchez | Desarrollador Full Stack |
| Julián Malpica | SCRUM Master |

## Cómo Ejecutar

Servir los archivos con cualquier servidor estático:

```bash
npx serve .
# o
python -m http.server 8080
```

Abrir `http://localhost:3000` (o el puerto correspondiente) en el navegador.

> **Nota:** Los archivos JS usan `import`/`export` (ES modules), por lo que es necesario servir los archivos por HTTP. Abrir `index.html` directamente con `file://` no funciona por restricciones CORS de los módulos.

## Estructura del Proyecto

```
TrendyShop/
├── index.html                    → Página principal (hero, carrusel, equipo)
├── catalogo/index.html           → Catálogo con filtros y modal de detalle
├── carrito/index.html            → Bolsa de compras (lectura de localStorage)
├── quienes-somos/index.html      → Historia, valores y equipo
├── contactanos/index.html        → Formulario de contacto (Formspree)
│
├── css/
│   └── style.css                 → Estilos globales (tokens, componentes, responsive)
│
├── js/
│   ├── data.js                   → Catálogo unificado de productos (fuente de verdad)
│   ├── cart.js                   → Carrito con persistencia en localStorage
│   ├── ux.js                     → Efectos compartidos (tilt 3D, reveal al scroll)
│   ├── main.js                   → Lógica de index.html (carrusel, modal, toast)
│   ├── catalogo.js               → Lógica de catálogo (filtros, modal detalle, añadir)
│   ├── carrito-page.js           → Lógica de carrito (render ítems, cantidad, compra)
│   ├── about.js                  → Inicialización de quienes-somos
│   └── contactanos.js            → Envío del formulario de contacto (Formspree)
│
├── img/
│   ├── modelo.jpg                → Imagen hero
│   ├── prenda1.png – prenda6.png → Fotografías de productos
│   └── carrito-de-compras.png    → Icono de carrito
│
└── README.md                     → Este archivo
```

## Arquitectura JavaScript (Módulos ES6)

El proyecto usa módulos nativos del navegador (`<script type="module">`). Cada página importa solo lo que necesita:

```
data.js ← Catálogo de productos (exporta PRODUCTS)
cart.js ← Carrito unificado (exporta addItem, getItems, clearCart, etc.)
ux.js   ← Efectos visuales (exporta initTilt, initReveal)

main.js ─────────┐
catalogo.js ─────┤ Importan de data.js, cart.js y ux.js
carrito-page.js ─┤
about.js ────────┘
```

## Funcionalidades Implementadas

### Página Principal (`index.html`)
- Hero con tarjeta flotante 3D (efecto tilt con el cursor)
- Carrusel horizontal de productos con scroll-snap y imágenes reales
- Modal de producto con selección de talla y botón "Añadir a la bolsa"
- Toast de confirmación al agregar un producto
- Sección editorial con estadísticas (piezas únicas, tejidos, envío)
- Sección del equipo con tarjetas tilt 3D
- Efectos de aparición progresiva al hacer scroll (IntersectionObserver)

### Catálogo (`catalogo/index.html`)
- Hero con título y descripción
- Filtros por categoría: Todo, Vestidos, Blusas, Abrigos, Faldas, Pantalones
- Grid responsivo de tarjetas con imagen, categoría, nombre, descripción y precio
- **Clic en tarjeta** → abre modal con detalle completo (imagen, composición, tallas)
- **Clic en "Añadir"** → agrega rápido al carrito con feedback visual ("✓ Añadido")
- Modal con selección de talla y confirmación toast

### Carrito (`carrito/index.html`)
- Lista de productos añadidos con imagen, nombre, talla seleccionada y precio
- Controles de cantidad por ítem (+/−) y botón de eliminar (✕)
- Total calculado dinámicamente
- Botón "Vaciar bolsa" y "Confirmar compra"
- Mensaje de éxito al confirmar la compra
- Estado vacío con enlace al catálogo

### Quiénes Somos (`quienes-somos/index.html`)
- Hero con blobs decorativos animados
- Timeline de historia: El Comienzo (2018), La Crisis (2025), Recuperación (2026)
- 6 tarjetas de valores con efecto tilt 3D
- Sección del equipo (5 miembros)
- Estadísticas animadas (productos, clientes, envíos, satisfacción)
- CTA final hacia el catálogo

### Contacto (`contactanos/index.html`)
- Formulario funcional con envío real vía Formspree
- Campos: nombre, email y mensaje con validación HTML5
- Panel lateral con información de contacto (email, teléfono, ubicación, horario)
- Feedback de estado del envío

### Carrito con localStorage (persistencia)
- **Clave:** `trendyshop_cart` en `localStorage`
- **Estructura:** `[{ id, name, price, numPrice, image, size, quantity }]`
- Persiste entre recargas de página y navegación entre secciones
- Badge del carrito (`bag__count`) sincronizado en todas las páginas
- La talla seleccionada en el modal se guarda con el ítem del carrito

## Sistema de Diseño (CSS)

### Paleta de Colores
| Token | Color | Uso |
|---|---|---|
| `--rojo` | `#4d0f14` | Acento principal, fondos dramáticos |
| `--rozy` | `#c7a49e` | Acento suave, eyebrows, avatares |
| `--pale-oak` | `#d9c3ac` | Placeholders de imagen |
| `--linen` | `#eee4da` | Fondo base |
| `--cream` | `#f7f2eb` | Fondos de tarjetas |
| `--ink` | `#2a1316` | Texto principal |

### Tipografía
- **Titulares:** Noto Serif Display (serif editorial)
- **Cuerpo:** Quicksand (sans-serif amable)
- Escala fluida con `clamp()` — sin breakpoints para tamaño de texto

### Efectos y Animaciones
- **Tilt 3D:** Inclinación de tarjetas al mover el cursor (deshabilitado si `prefers-reduced-motion`)
- **Reveal:** Aparición progresiva al scroll con IntersectionObserver
- **Blobs:** Formas difuminadas flotantes en los heros
- **Toast:** Notificación temporal con transición suave
- Todas las animaciones respetan `prefers-reduced-motion: reduce`

## Tecnologías

- HTML5 semántico
- CSS3 (custom properties, clamp, grid, flexbox, scroll-snap, backdrop-filter)
- JavaScript ES6+ (módulos nativos, IntersectionObserver, localStorage)
- Google Fonts (Quicksand + Noto Serif Display)
- Formspree (envío de formulario de contacto)
- Sin frameworks, sin bundlers, sin dependencias npm
