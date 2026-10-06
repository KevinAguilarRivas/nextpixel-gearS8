import { CATEGORIA_OFERTAS, CATEGORIA_TODOS } from '../utils/constants.js';

/* =========================================================
   CategoryChips: botones para filtrar el catálogo por categoría.
   Las categorías se generan a partir de los productos cargados.
   Props:
   - products: catálogo completo
   - activeCategory: categoría seleccionada (se marca con "is-active")
   - onSelect: cambia la categoría activa (evento onClick)
   ========================================================= */
function CategoryChips({ products, activeCategory, onSelect }) {
  // Arma la lista de categorías únicas presentes en el catálogo
  const categories = [
    { id: CATEGORIA_TODOS, label: 'Todos' },
    { id: CATEGORIA_OFERTAS, label: '🔥 Ofertas' },
  ];
  products.forEach((product) => {
    if (!categories.some((cat) => cat.id === product.category)) {
      categories.push({ id: product.category, label: product.categoryLabel });
    }
  });

  // Mientras el catálogo carga no hay categorías que mostrar
  if (products.length === 0) return null;

  return (
    <section className="categories" aria-label="Categorías destacadas">
      <div className="container categories-row">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`chip${category.id === activeCategory ? ' is-active' : ''}`}
            aria-pressed={category.id === activeCategory}
            onClick={() => onSelect(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryChips;
