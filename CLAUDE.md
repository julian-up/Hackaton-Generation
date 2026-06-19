# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

Vanilla HTML/CSS/JavaScript e-commerce site — no build tools, no framework, no bundler. Open `index.html` directly in a browser or serve with any static file server.

To run locally:
```
npx serve .
# or
python -m http.server 8080
```

## Architecture

This is a multi-page application (MPA) where each page is a separate `index.html`:

| Route | Directory |
|---|---|
| Home / landing | `index.html` |
| Product catalog | `catalogo/index.html` |
| Shopping cart | `carrito/index.html` |
| Contact | `contactanos/index.html` |
| About us | `quienes-somos/index.html` |

### JS Layer Responsibilities

- `js/app.js` — entry point, bootstraps the page on `DOMContentLoaded`
- `js/productos.js` — product data / product-related logic
- `js/carrito.js` — cart state management (add, remove, update quantities)
- `js/ui.js` — DOM rendering helpers (renders product cards, cart rows, etc.)

### Services Layer (`services/`)

Separation between business logic and external calls:

- `services/apiService.js` — HTTP calls to any external API (fetch wrappers)
- `services/productService.js` — product retrieval / filtering, delegates to `apiService`
- `services/cartService.js` — cart persistence (localStorage) and cart operations

### Styling

Single global stylesheet at `css/style.css`. No preprocessor.

## Conventions to Follow

- All pages share `css/style.css` — link it with a root-relative or relative path consistent with the page's directory depth.
- Scripts are loaded at the bottom of `<body>` without a bundler, so load order matters: `apiService` → `productService`/`cartService` → `productos`/`carrito` → `ui` → `app`.
- Cart state is persisted in `localStorage` via `services/cartService.js`.
