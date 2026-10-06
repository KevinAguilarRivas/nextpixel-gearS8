/* =========================================================
   Utilidades reutilizables (funciones puras, sin estado)
   ========================================================= */

// Da formato de precio chileno a un número, ej: 89990 -> "$89.990"
export function formatPrice(value) {
  return '$' + value.toLocaleString('es-CL');
}

// Calcula el % de descuento entre el precio normal y el precio oferta
export function getDiscountPercent(normalPrice, offerPrice) {
  if (!normalPrice || normalPrice <= offerPrice) return 0;
  return Math.round(((normalPrice - offerPrice) / normalPrice) * 100);
}

// Convierte una ruta relativa de /public en una ruta válida también en gh-pages.
// import.meta.env.BASE_URL vale "/" en desarrollo y "/nextpixel-gearS8/" en producción.
export function publicUrl(path) {
  return import.meta.env.BASE_URL + path;
}
