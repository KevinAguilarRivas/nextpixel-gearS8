import Logo from './Logo.jsx';

// Columnas de enlaces del footer (datos separados del marcado)
const FOOTER_COLUMNS = [
  {
    title: 'Tienda',
    links: [
      { label: 'Catálogo', href: '#catalogo' },
      { label: 'Carrito', href: '#carrito' },
      { label: 'Tarjetas de regalo', href: '#' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Centro de ayuda', href: '#' },
      { label: 'Políticas de reembolso', href: '#' },
      { label: 'Contacto', href: '#contacto' },
    ],
  },
];

// Íconos SVG de redes sociales
const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'Facebook',
    icon: (
      <path
        d="M14.5 8.5H16.5V5.2C16.16 5.15 15 5.05 13.65 5.05C10.83 5.05 8.9 6.78 8.9 9.94V12.5H5.8V16.2H8.9V21.5H12.7V16.2H15.68L16.15 12.5H12.7V10.31C12.7 9.25 12.99 8.5 14.5 8.5Z"
        fill="currentColor"
      />
    ),
  },
  {
    label: 'X / Twitter',
    icon: <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />,
  },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Tu tienda de periféricos gaming, elegida por y para la comunidad gamer.</p>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <nav className="footer-col" key={column.title}>
            <h3>{column.title}</h3>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="footer-col">
          <h3>Síguenos</h3>
          <ul className="social-list">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a href="#" aria-label={social.label}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    {social.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} NextPixel Gear. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
