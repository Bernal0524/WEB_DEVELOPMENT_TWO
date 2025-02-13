import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies"; // Importa la clave de API desde el otro hook

/**
 * Hook personalizado para obtener los detalles de una película desde la API de OMDb.
 * @param {string} selectedId - ID único de la película seleccionada.
 * @returns {Object} - Retorna un objeto con:
 * - movie: Detalles de la película.
 * - isLoading: Estado de carga de la solicitud.
 * - error: Mensaje de error en caso de fallo.
 */
export function useFetchMovieDetails(selectedId) {
  const [movie, setMovie] = useState(null); // Inicializa movie como null
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // Inicializa error como null

  useEffect(() => {
    const abortController = new AbortController(); // Crea un AbortController

    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null); // Limpia el error anterior

      if (!selectedId) {
        setMovie(null); // Limpia la película
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${API_KEY}`,
          { signal: abortController.signal } // Usa el AbortController
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "No se encontraron detalles."); // Maneja errores de la API
          setMovie(null); // Limpia la película
        }
      } catch (err) {
        if (err.name !== 'AbortError') { // Ignora errores de abortar la petición
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();

    return () => abortController.abort(); // Función de limpieza
  }, [selectedId]);

  return { movie, isLoading, error };
}