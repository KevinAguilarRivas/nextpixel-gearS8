/* =========================================================
   SearchBar: buscador del catálogo (input controlado).
   Filtra en tiempo real con onChange; el botón "Limpiar"
   solo aparece cuando hay texto escrito.
   Props:
   - value: texto de búsqueda actual (estado en App)
   - onChange: actualiza el texto de búsqueda
   ========================================================= */
function SearchBar({ value, onChange }) {
  // El submit no recarga la página: la búsqueda ya se aplica al escribir
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <label htmlFor="searchInput" className="visually-hidden">
        Buscar producto
      </label>
      <input
        type="text"
        id="searchInput"
        placeholder="Buscar por nombre o marca…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {/* Renderizado condicional: el botón solo existe si hay algo que limpiar */}
      {value && (
        <button type="button" className="btn btn-primary" onClick={() => onChange('')}>
          Limpiar
        </button>
      )}
    </form>
  );
}

export default SearchBar;
