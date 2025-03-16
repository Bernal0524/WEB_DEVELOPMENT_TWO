import React from 'react';
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../store/useAppStore";
import useNotificationStore from "../notificationStore";  // Importa el store de notificaciones

export const FavoritesPage = () => {
  const favorites = useAppStore((state) => state.favorites);
  const addNotification = useNotificationStore((state) => state.addNotification); // Extrae la función addNotification

  const handleAddToFavorites = (drink) => {
    // Lógica para agregar la bebida a favoritos
    useAppStore.getState().addFavorite(drink);
    addNotification('Bebida añadida a favoritos', 'success');
  };

  const handleRemoveFromFavorites = (drink) => {
    // Lógica para eliminar la bebida de favoritos
    useAppStore.getState().removeFavorite(drink.idDrink);
    addNotification('Bebida eliminada de favoritos', 'success');
  };

  const hasFavorites = favorites.length > 0;

  return (
    <div className="favorites-page">
      <h2 className="text-2xl font-bold mb-4">Favoritos</h2>
      {hasFavorites ? (
        <div className="favorites-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
              onAddToFavorites={handleAddToFavorites}
              onRemoveFromFavorites={handleRemoveFromFavorites}
            />
          ))}
        </div>
      ) : (
        <p className="text-lg">Los favoritos se mostrarán aquí</p>
      )}
    </div>
  );
};

export default FavoritesPage;
