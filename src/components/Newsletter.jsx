import { useState } from 'react';

/* =========================================================
   Newsletter: formulario de suscripción.
   - useState controla el correo escrito y si ya se envió.
   - Renderizado condicional: tras enviar, el formulario se
     reemplaza por un mensaje de confirmación.
   ========================================================= */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // evita recargar la página
    // Simulación: no hay backend, solo se confirma en pantalla
    setIsSubscribed(true);
  };

  return (
    <section className="newsletter" id="contacto">
      <div className="container newsletter-inner">
        <div>
          <h2>No te pierdas ningún lanzamiento</h2>
          <p>
            Recibe noticias de nuevos periféricos, betas de firmware y descuentos exclusivos directo a tu
            correo.
          </p>
        </div>

        {isSubscribed ? (
          <div className="newsletter-success" role="status">
            <p>
              ✅ ¡Listo! Te enviaremos las novedades a <strong>{email}</strong>.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setEmail('');
                setIsSubscribed(false);
              }}
            >
              Usar otro correo
            </button>
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="visually-hidden">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
