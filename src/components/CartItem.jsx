import { formatPrice } from '../utils/format.js';

/* =========================================================
   CartItem: una fila del carrito con controles de cantidad.
   Props:
   - item: producto + quantity + subtotal
   - onIncrease / onDecrease: suman o restan una unidad
   - onRemove: quita el producto completo del carrito
   ========================================================= */
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <span>
          {formatPrice(item.price)} c/u
          {item.oldPrice !== null && <em className="cart-item-saving"> · en oferta</em>}
        </span>
      </div>

      <div className="cart-item-actions">
        <div className="qty-control" aria-label={`Cantidad de ${item.name}`}>
          <button type="button" onClick={() => onDecrease(item.id)} aria-label="Quitar una unidad">
            −
          </button>
          <span aria-live="polite">{item.quantity}</span>
          <button type="button" onClick={() => onIncrease(item.id)} aria-label="Agregar una unidad">
            +
          </button>
        </div>
        <span className="cart-item-price">{formatPrice(item.subtotal)}</span>
        <button className="btn-remove" type="button" onClick={() => onRemove(item.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default CartItem;
