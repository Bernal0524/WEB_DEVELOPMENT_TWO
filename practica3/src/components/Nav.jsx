export const Nav = ({ children }) => {
    return (
      <nav className="nav-bar">
        {children}
      </nav>
    );
  };
  
  export function Logo() {
    return (
      <div className="logo">
        <span role="img" aria-label="Popcorn">🍿</span> {/* Agrega aria-label */}
        <h1>Palomitas de papel</h1>
      </div>
    );
  }
  
  export function Search({ query, setQuery }) {
    return (
      <input
        className="search"
        type="text"
        placeholder="Buscar peliculas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    );
  }
  
  export function NumResults({ movies }) {
    if (!Array.isArray(movies)) { // Maneja el caso en que movies no es un array
      return <p className="num-results">Cargando resultados...</p>; // O un mensaje similar
    }
    return (
      <p className="num-results">
        <strong>{movies.length}</strong> resultados encontrados
      </p>
    );
  }