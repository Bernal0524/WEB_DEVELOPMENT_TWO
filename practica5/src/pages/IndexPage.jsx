import React from 'react';
import DrinkCard from "../components/DrinkCard";
import { useAppStore } from "../store/useAppStore";
import useNotificationStore from "../notificationStore"; // Importa el store de notificaciones

export const IndexPage = () => {
  const drinks = useAppStore((state) => state.drinks);
  const addNotification = useNotificationStore((state) => state.addNotification); // Extrae la función addNotification

  const handleAddToFavorites = (drink) => {
    // Lógica para agregar la bebida a favoritos
    useAppStore.getState().addFavorite(drink);
    addNotification('Bebida añadida a favoritos', 'success');
  };

  const hasDrinks = Array.isArray(drinks) && drinks.length > 0;

  return (
    <>
      <h1 className="text-4xl font-bold">Recetas</h1>
      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
          {drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
              onAddToFavorites={handleAddToFavorites}  // Pasamos la función al componente DrinkCard
            />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          No hay resultados aún, utiliza el formulario para buscar recetas
        </p>
      )}
    </>
  );
};

export default IndexPage;
