import { publicUrl } from '../utils/format.js';

// Datos del bloque de estadísticas (se recorren con map en vez de repetir el HTML)
const STATS = [
  { value: '+40', label: 'periféricos disponibles' },
  { value: '24/7', label: 'soporte a la comunidad' },
  { value: '4.8★', label: 'valoración de compradores' },
];

/* =========================================================
   Hero: portada de la tienda.
   Props:
   - onShowOffers: filtra el catálogo para mostrar solo productos en oferta
   ========================================================= */
function Hero({ onShowOffers }) {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Nueva temporada de lanzamientos</p>
          <h1>
            Sube de nivel
            <br />
            tu setup
          </h1>
          <p className="hero-lead">
            Mouse, teclados y audífonos de las marcas gamer más vendidas del último año, elegidos para
            jugadores competitivos. Entrega inmediata, precios justos y respaldo de garantía en cada compra.
          </p>
          <div className="hero-actions">
            <a href="#catalogo" className="btn btn-primary">
              Explorar catálogo
            </a>
            <button type="button" className="btn btn-ghost" onClick={onShowOffers}>
              Ver ofertas
            </button>
          </div>

          <dl className="hero-stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-glow"></div>
          <img src={publicUrl('img/helmet.png')} alt="" className="hero-svg" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
