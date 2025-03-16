import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore'; // Importar la función selectRecipe
import useNotificationStore from "../notificationStore";  // Importar el store de notificaciones

export default function DrinkCard({ drink, onAddToFavorites, onRemoveFromFavorites }) {
  const selectRecipe = useAppStore((state) => state.selectRecipe); // Acceder a la función selectRecipe desde el store
  const addNotification = useNotificationStore((state) => state.addNotification); // Extraer la función addNotification

  // Estado local para controlar la visibilidad de los botones de favoritos
  const [isRecipeVisible, setIsRecipeVisible] = useState(false);

  // Función para manejar el click en "Ver Receta"
  const handleRecipeClick = () => {
    setIsRecipeVisible(!isRecipeVisible); // Cambiar la visibilidad de los botones
    selectRecipe(drink.idDrink); // Seleccionar receta
  };

  const handleAddToFavorites = () => {
    onAddToFavorites(drink);
    addNotification('Bebida añadida a favoritos', 'success');
  };

  const handleRemoveFromFavorites = () => {
    onRemoveFromFavorites(drink);
    addNotification('Bebida eliminada de favoritos', 'success');
  };

  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className="hover:scale-125 transition-transform hover:rotate-2"
        />
      </div>

      <div className="p-5">
        <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>

        {/* Botón para ver receta */}
        <button
          type="button"
          className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg"
          onClick={handleRecipeClick} // Usar handleRecipeClick
        >
          Ver Receta
        </button>

        {/* Botones de favoritos solo visibles si isRecipeVisible es verdadero */}
        {isRecipeVisible && (
          <div className="mt-3 flex justify-between">
            <button
              type="button"
              className="bg-green-400 hover:bg-green-500 mt-2 w-full p-2 font-bold text-white text-lg"
              onClick={handleAddToFavorites}
            >
              Agregar a Favoritos
            </button>

            <button
              type="button"
              className="bg-red-400 hover:bg-red-500 mt-2 w-full p-2 font-bold text-white text-lg"
              onClick={handleRemoveFromFavorites}
            >
              Eliminar de Favoritos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
