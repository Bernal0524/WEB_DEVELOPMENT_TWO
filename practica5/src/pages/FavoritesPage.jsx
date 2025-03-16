import React from 'react';
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../store/useAppStore"; // Importamos el store

export const FavoritesPage = () => {
  // Recuperamos el arreglo de favoritos desde el store
  const favorites = useAppStore((state) => state.favorites);
  
  // Verificamos si hay favoritos
  const hasFavorites = favorites.length > 0;

  return (
    <div className="favorites-page">
      <h2 className="text-2xl font-bold mb-4">Favoritos</h2>

      {hasFavorites ? (
        // Si hay favoritos, mapeamos y los mostramos
        <div className="favorites-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((drink) => (
            <DrinkCard key={drink.idDrink} drink={drink} />
          ))}
        </div>
      ) : (
        // Si no hay favoritos, mostramos un mensaje
        <p className="text-lg">Los favoritos se mostrarán aquí</p>
      )}
    </div>
  );
};

export default FavoritesPage;
