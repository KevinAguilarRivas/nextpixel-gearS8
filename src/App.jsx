import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import CategoryChips from './components/CategoryChips.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProductList from './components/ProductList.jsx';
import Cart from './components/Cart.jsx';
import Newsletter from './components/Newsletter.jsx';
import Footer from './components/Footer.jsx';
import { useProducts } from './hooks/useProducts.js';
import { useCart } from './hooks/useCart.js';
import { CATEGORIA_OFERTAS, CATEGORIA_TODOS } from './utils/constants.js';

/* =========================================================
   App: componente raíz.
   Guarda el estado compartido (catálogo, carrito, filtros)
   y lo reparte a los componentes hijos mediante props.
   ========================================================= */
function App() {
  // Catálogo: se carga con useEffect dentro del hook useProducts
  const { products, isLoading, error, reload } = useProducts();

  // Carrito: estado y acciones encapsulados en el hook useCart
  const cart = useCart(products);

  // Filtros del catálogo
  const [activeCategory, setActiveCategory] = useState(CATEGORIA_TODOS);
  const [searchTerm, setSearchTerm] = useState('');

  // Lista filtrada: se deriva del estado en cada render (no necesita su propio useState)
  const texto = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const coincideCategoria =
      activeCategory === CATEGORIA_TODOS ||
      (activeCategory === CATEGORIA_OFERTAS ? product.oldPrice !== null : product.category === activeCategory);
    const coincideTexto =
      texto === '' ||
      product.name.toLowerCase().includes(texto) ||
      product.brand.toLowerCase().includes(texto);
    return coincideCategoria && coincideTexto;
  });

  // Cambia la categoría y lleva al usuario al catálogo (usado por el menú y el hero)
  const goToCategory = (categoryId) => {
    setActiveCategory(categoryId);
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header cartCount={cart.totalUnits} onSelectCategory={goToCategory} />

      <main>
        <Hero onShowOffers={() => goToCategory(CATEGORIA_OFERTAS)} />

        <CategoryChips
          products={products}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />

        <section className="catalog" id="catalogo">
          <div className="container">
            <div className="catalog-head">
              <div className="section-head">
                <h2>Catálogo de periféricos</h2>
                <p>Selección de la semana elegida por el equipo NextPixel.</p>
              </div>
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>

            <ProductList
              products={filteredProducts}
              isLoading={isLoading}
              error={error}
              onRetry={reload}
              getQuantity={cart.getQuantity}
              onAdd={cart.addToCart}
            />
          </div>
        </section>

        <Cart
          items={cart.cartItems}
          totalUnits={cart.totalUnits}
          totalPrice={cart.totalPrice}
          onIncrease={cart.addToCart}
          onDecrease={cart.decreaseQuantity}
          onRemove={cart.removeFromCart}
          onClear={cart.clearCart}
        />

        <Newsletter />
      </main>

      <Footer />
    </>
  );
}

export default App;
