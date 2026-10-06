# NextPixel Gear — eCommerce de periféricos gaming en React

Actividad Sumativa Semana 8 — **Mejorando funcionalidades clave en el eCommerce con React**
Desarrollo Frontend I (PFY2201) · Duoc UC · Kevin Aguilar

- **Sitio en línea (gh-pages):** https://kevinaguilarrivas.github.io/nextpixel-gearS8/
- **Versión anterior (S6, HTML + JS):** https://kevinaguilarrivas.github.io/nextpixel-gearS6/

Este proyecto es la continuación de la tienda **NextPixel Gear** de la semana 6. Se migró de HTML + JavaScript
(con manipulación directa del DOM) a **React + Vite**, con componentes funcionales, Hooks (`useState`, `useEffect`)
y renderizado condicional.

---

## Tecnologías

- React 19 + Vite 7
- CSS propio (el mismo diseño de la semana 6, ampliado con los nuevos estados)
- `gh-pages` para el despliegue en GitHub Pages

## Cómo ejecutar el proyecto

Requisito: Node.js (versión LTS).

```bash
npm install       # instala las dependencias
npm run dev       # servidor de desarrollo en http://localhost:5173/nextpixel-gearS8/
npm run build     # genera la versión de producción en /dist
npm run deploy    # compila y publica /dist en la rama gh-pages
```

## Estructura de carpetas

```
nextpixel-gearS8/
├── public/
│   ├── data/products.json      # "fuente externa" de productos (se carga con fetch)
│   └── img/                    # logo e imágenes de productos
├── src/
│   ├── components/             # componentes funcionales reutilizables
│   │   ├── Header.jsx          # logo, menú (móvil) y contador del carrito
│   │   ├── Logo.jsx            # logo (reutilizado en Header y Footer)
│   │   ├── Hero.jsx            # portada + botón "Ver ofertas"
│   │   ├── CategoryChips.jsx   # filtros por categoría
│   │   ├── SearchBar.jsx       # buscador en tiempo real
│   │   ├── ProductList.jsx     # grilla + estados de carga / error / sin resultados
│   │   ├── ProductCard.jsx     # tarjeta de producto
│   │   ├── Cart.jsx            # resumen del carrito
│   │   ├── CartItem.jsx        # fila del carrito con control de cantidad
│   │   ├── Newsletter.jsx      # formulario de suscripción
│   │   └── Footer.jsx
│   ├── hooks/
│   │   ├── useProducts.js      # useState + useEffect: carga del catálogo
│   │   └── useCart.js          # useState + useEffect: lógica del carrito y localStorage
│   ├── utils/
│   │   ├── format.js           # formatPrice, getDiscountPercent, publicUrl
│   │   └── constants.js        # constantes compartidas
│   ├── styles/styles.css
│   ├── App.jsx                 # componente raíz: estado compartido y composición
│   └── main.jsx                # punto de entrada
├── index.html
├── vite.config.js              # base: '/nextpixel-gearS8/' para gh-pages
└── package.json
```

## Funcionalidades implementadas

### 1. Gestión de estados con `useState`

| Estado | Dónde | Para qué |
|---|---|---|
| `products`, `isLoading`, `error` | `hooks/useProducts.js` | Lista del catálogo y estado de la carga |
| `cart` | `hooks/useCart.js` | Productos seleccionados en el carrito (`{ id, quantity }`) |
| `activeCategory`, `searchTerm` | `App.jsx` | Filtros del catálogo |
| `isNavOpen` | `Header.jsx` | Abre/cierra el menú en móvil |
| `email`, `isSubscribed` | `Newsletter.jsx` | Formulario de suscripción |

Los valores que se pueden calcular a partir del estado (lista filtrada, total de unidades, total en pesos)
**no se guardan en otro estado**: se derivan en cada render para evitar datos duplicados o desincronizados.

### 2. Efectos secundarios con `useEffect`

- **Carga del catálogo** (`useProducts.js`): al montar la app se hace `fetch` a `data/products.json` con un pequeño
  retardo que simula la latencia de una API externa. Al recibir los datos se actualiza el estado
  (`setProducts`). Se manejan errores HTTP y de red, y una función de limpieza cancela la petición con
  `AbortController` si el componente se desmonta. El botón **Reintentar** vuelve a ejecutar el efecto.
- **Persistencia del carrito** (`useCart.js`): cada vez que cambia el carrito se guarda en `localStorage`,
  así no se pierde al recargar la página.

### 3. Renderizado condicional

- Mensaje **"Aún no has agregado productos al carrito"** cuando el carrito está vacío.
- El botón **"Añadir"** cambia a **"En el carrito ✓"** (y cambia de color) cuando el producto ya está en el carrito.
- Estados del catálogo: **"Cargando productos…"** (con spinner), **mensaje de error + Reintentar**,
  **"No encontramos productos…"** cuando la búsqueda no tiene resultados.
- Precio: si el producto tiene oferta se muestra el **precio normal tachado + precio oferta** y un badge con el % de descuento.
- El botón **"Limpiar"** del buscador y **"Vaciar carrito"** solo aparecen cuando tienen sentido.
- El newsletter reemplaza el formulario por un mensaje de confirmación tras suscribirse.
- Clases dinámicas: chip de categoría activo, menú móvil abierto, contador del carrito resaltado.

### 4. Eventos

`onClick` (agregar, sumar/restar, eliminar, filtros, menú), `onChange` (buscador y correo) y `onSubmit` (formularios con `preventDefault`).

## Capturas de pantalla

Las capturas que evidencian las funcionalidades están en la carpeta [`capturas/`](capturas/):

1. Datos cargados dinámicamente (estado "Cargando…" y catálogo cargado).
2. Carrito de compras con productos agregados y eliminados.
3. Renderizado condicional: carrito vacío, botón "En el carrito ✓", búsqueda sin resultados, filtro de ofertas.
4. Vista móvil.
