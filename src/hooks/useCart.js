import { useEffect, useState } from 'react';

const CLAVE_STORAGE = 'nextpixel-cart';

// Lee el carrito guardado en localStorage (si existe) para el estado inicial
function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

/* =========================================================
   Hook personalizado: lógica del carrito de compras.
   El estado "cart" es un arreglo de { id, quantity }.
   Los datos del producto (nombre, precio) se buscan en el catálogo,
   así no duplicamos información.
   ========================================================= */
export function useCart(products) {
  // Inicialización perezosa: leerCarritoGuardado solo se ejecuta en el primer render
  const [cart, setCart] = useState(leerCarritoGuardado);

  // Efecto: cada vez que cambia el carrito, se guarda en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(cart));
    } catch {
      // Si el navegador bloquea el almacenamiento, el carrito sigue funcionando en memoria
    }
  }, [cart]);

  // Agrega una unidad del producto (o lo crea en el carrito si no estaba)
  const addToCart = (productId) => {
    setCart((prev) => {
      const existe = prev.some((item) => item.id === productId);
      if (existe) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  // Resta una unidad; si llega a 0 el producto sale del carrito
  const decreaseQuantity = (productId) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  // Elimina el producto completo del carrito
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // ---- Valores derivados (se calculan a partir del estado, no se guardan aparte) ----
  // Une cada ítem del carrito con los datos de su producto
  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity, subtotal: product.price * item.quantity } : null;
    })
    .filter(Boolean);

  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0);

  // Devuelve cuántas unidades de un producto hay en el carrito (0 si no está)
  const getQuantity = (productId) => cart.find((item) => item.id === productId)?.quantity ?? 0;

  return {
    cartItems,
    totalUnits,
    totalPrice,
    getQuantity,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  };
}
