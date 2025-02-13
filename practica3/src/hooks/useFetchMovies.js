import { useEffect, useState } from "react";

// Clave de API para acceder a OMDb 
export const API_KEY = "d1408eef"; 

/**
 * Hook personalizado para obtener películas desde la API de OMDb.
 * @param {string} query - Término de búsqueda ingresado por el usuario.
 * @returns {Object} - Retorna un objeto con:
 * - movies: Lista de películas encontradas.
 * - isLoading: Estado de carga de la solicitud.
 * - error: Mensaje de error en caso de fallo.
 */
export function useFetchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Inicializa error como null

  useEffect(() => {
    const abortController = new AbortController(); // Crea un AbortController

    // Función para realizar la búsqueda de películas
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null); // Limpia el error anterior

      if (!query || query.length < 3) {
        setMovies([]); // Limpia resultados si la búsqueda es muy corta
        setIsLoading(false);
        return; // Sale de la función si la búsqueda es muy corta
      }

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`,
          { signal: abortController.signal } // Usa el AbortController
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error || "No se encontraron resultados."); // Maneja errores de la API
          setMovies([]); // Limpia los resultados si no hay películas
        }
      } catch (err) {
        if (err.name !== 'AbortError') { // Ignora errores de abortar la petición
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    // Función de limpieza para abortar la petición anterior
    return () => abortController.abort();
  }, [query]); // El hook se ejecuta cuando cambia el query

  return { movies, isLoading, error };
}