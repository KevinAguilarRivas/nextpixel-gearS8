import ProductCard from './ProductCard.jsx';

/* =========================================================
   ProductList: grilla del catálogo con sus distintos estados.
   Renderizado condicional según el estado de la carga:
   cargando → error → sin resultados → lista de productos.
   ========================================================= */
function ProductList({ products, isLoading, error, onRetry, getQuantity, onAdd }) {
  if (isLoading) {
    return (
      <div className="catalog-status is-visible" role="status">
        <span className="loader" aria-hidden="true"></span>
        Cargando productos…
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog-status is-visible is-error" role="alert">
        <p>{error}</p>
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="catalog-status is-visible">
        No encontramos productos que coincidan con tu búsqueda.
      </p>
    );
  }

  return (
    <>
      <p className="catalog-count">
        Mostrando {products.length} {products.length === 1 ? 'producto' : 'productos'}
      </p>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantityInCart={getQuantity(product.id)}
            onAdd={onAdd}
          />
        ))}
      </div>
    </>
  );
}

export default ProductList;
