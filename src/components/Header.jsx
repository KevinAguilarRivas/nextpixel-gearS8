import { useState } from 'react';
import Logo from './Logo.jsx';

// Enlaces del menú: los que tienen "category" filtran el catálogo
const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Mouse', href: '#catalogo', category: 'mouse' },
  { label: 'Teclados', href: '#catalogo', category: 'teclado' },
  { label: 'Audífonos', href: '#catalogo', category: 'audifonos' },
  { label: 'Contacto', href: '#contacto' },
];

/* =========================================================
   Header: logo, menú de navegación y acceso al carrito.
   Props:
   - cartCount: total de unidades en el carrito (contador)
   - onSelectCategory: filtra el catálogo al elegir una categoría del menú
   ========================================================= */
function Header({ cartCount, onSelectCategory }) {
  // Estado local: menú móvil abierto o cerrado
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLinkClick = (event, link) => {
    if (link.category) {
      event.preventDefault();
      onSelectCategory(link.category);
    }
    setIsNavOpen(false); // en móvil, cierra el menú después de navegar
  };

  const scrollToCart = () => {
    document.getElementById('carrito')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      <div className="container header-bar">
        <Logo />

        <button
          className="nav-toggle"
          type="button"
          aria-label={isNavOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isNavOpen}
          aria-controls="siteNav"
          onClick={() => setIsNavOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Renderizado condicional de clase: "is-open" solo cuando el menú está abierto */}
        <nav className={`site-nav${isNavOpen ? ' is-open' : ''}`} id="siteNav">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(event) => handleLinkClick(event, link)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button className="cart-toggle" type="button" aria-label="Ver carrito" onClick={scrollToCart}>
          🛒 <span className="cart-label">Carrito</span>
          {/* El contador cambia de estilo cuando hay productos */}
          <span className={`cart-count${cartCount > 0 ? ' has-items' : ''}`}>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
