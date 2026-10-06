import { formatPrice, getDiscountPercent, publicUrl } from '../utils/format.js';

/* =========================================================
   ProductCard: tarjeta de un producto del catálogo.
   Props:
   - product: datos del producto (nombre, marca, precios, imagen…)
   - quantityInCart: unidades de este producto en el carrito
   - onAdd: agrega una unidad al carrito (evento onClick)
   ========================================================= */
function ProductCard({ product, quantityInCart, onAdd }) {
  const isInCart = quantityInCart > 0;
  const hasOffer = product.oldPrice !== null;
  const discount = hasOffer ? getDiscountPercent(product.oldPrice, product.price) : 0;

  // El badge "-X%" se calcula con los precios; los demás vienen del JSON
  const badgeText = hasOffer ? `-${discount}%` : product.badge;
  let badgeClass = 'badge';
  if (hasOffer) badgeClass += ' badge-sale';
  if (product.badge === 'Nuevo') badgeClass += ' badge-nuevo';

  return (
    <article className={`product-card${isInCart ? ' is-in-cart' : ''}`}>
      <div className="product-thumb">
        <img
          src={publicUrl(product.image)}
          alt={product.name}
          className="product-cover"
          loading="lazy"
        />
        {badgeText && <span className={badgeClass}>{badgeText}</span>}
      </div>

      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <p className="product-tags">{product.description}</p>

        <div className="product-footer">
          {/* Precio: si tiene oferta muestra el precio normal tachado y el precio oferta */}
          {hasOffer ? (
            <span className="price">
              <span className="price-old" aria-label="Precio normal">
                {formatPrice(product.oldPrice)}
              </span>
              <span aria-label="Precio oferta">{formatPrice(product.price)}</span>
            </span>
          ) : (
            <span className="price">{formatPrice(product.price)}</span>
          )}

          {/* El botón cambia de texto y estilo cuando el producto ya está en el carrito */}
          <button
            className={`btn-add${isInCart ? ' is-added' : ''}`}
            type="button"
            onClick={() => onAdd(product.id)}
            aria-label={
              isInCart
                ? `Agregar otra unidad de ${product.name} (hay ${quantityInCart} en el carrito)`
                : `Añadir ${product.name} al carrito`
            }
          >
            {isInCart ? 'En el carrito ✓' : 'Añadir'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
