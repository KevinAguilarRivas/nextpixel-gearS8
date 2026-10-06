import CartItem from './CartItem.jsx';
import { formatPrice } from '../utils/format.js';

/* =========================================================
   Cart: resumen del carrito de compras.
   Renderizado condicional: si no hay productos muestra un
   mensaje de carrito vacío; si hay, la lista y el total.
   ========================================================= */
function Cart({ items, totalUnits, totalPrice, onIncrease, onDecrease, onRemove, onClear }) {
  const isEmpty = items.length === 0;

  return (
    <section className="cart-section" id="carrito">
      <div className="cart">
        <div className="cart-header">
          <div>
            <p className="eyebrow">Tu selección</p>
            <h2>Carrito de compras</h2>
          </div>
          {/* Solo se ofrece vaciar el carrito cuando tiene productos */}
          {!isEmpty && (
            <button type="button" className="btn-remove" onClick={onClear}>
              Vaciar carrito
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="cart-empty">
            <p>Aún no has agregado productos al carrito.</p>
            <a href="#catalogo" className="btn btn-ghost">
              Ir al catálogo
            </a>
          </div>
        ) : (
          <div className="cart-list">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}

        <div className="cart-total">
          <span>
            Total{' '}
            <small>
              ({totalUnits} {totalUnits === 1 ? 'producto' : 'productos'})
            </small>
          </span>
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
      </div>
    </section>
  );
}

export default Cart;
