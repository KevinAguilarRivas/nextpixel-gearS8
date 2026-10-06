import { publicUrl } from '../utils/format.js';

// Logo reutilizable: se usa en el Header y en el Footer
function Logo() {
  return (
    <a href="#inicio" className="logo">
      <span className="logo-mark">
        <img src={publicUrl('img/helmet.png')} alt="" className="logo-icon-img" />
      </span>
      <span className="logo-text">
        NextPixel <em>Gear</em>
      </span>
    </a>
  );
}

export default Logo;
