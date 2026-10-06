import { useEffect, useState } from 'react';
import { publicUrl } from '../utils/format.js';

const RUTA_PRODUCTOS = publicUrl('data/products.json');

// Retardo artificial para simular la latencia de una API externa
// y que el estado "Cargando…" alcance a verse en pantalla.
const RETARDO_SIMULADO_MS = 800;

/* =========================================================
   Hook personalizado: carga el catálogo desde el JSON local.
   - useState guarda la lista de productos, el estado de carga y el error.
   - useEffect ejecuta la petición una sola vez, al montar el componente.
   ========================================================= */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Cambiar este número vuelve a disparar el efecto (botón "Reintentar")
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // AbortController permite cancelar la petición si el componente se desmonta
    const controller = new AbortController();
    let timeoutId;

    setIsLoading(true);
    setError(null);

    timeoutId = setTimeout(() => {
      fetch(RUTA_PRODUCTOS, { signal: controller.signal })
        .then((response) => {
          // Si el servidor responde con un error HTTP, lo transformamos en excepción
          if (!response.ok) {
            throw new Error('No se pudo obtener el catálogo (HTTP ' + response.status + ')');
          }
          return response.json();
        })
        .then((data) => {
          // Actualiza el estado de la aplicación con los datos cargados
          setProducts(data);
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.name === 'AbortError') return; // el componente se desmontó, no hacemos nada
          console.error('Error al cargar el catálogo:', err);
          setError('No pudimos cargar los productos en este momento. Por favor, inténtalo nuevamente.');
          setIsLoading(false);
        });
    }, RETARDO_SIMULADO_MS);

    // Función de limpieza: se ejecuta al desmontar o antes de repetir el efecto
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [reloadKey]);

  const reload = () => setReloadKey((key) => key + 1);

  return { products, isLoading, error, reload };
}
