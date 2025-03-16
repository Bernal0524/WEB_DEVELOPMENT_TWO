import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice } from "./recipeSlice";
import { createFavoritesSlice } from './favoritesSlice';  // Importar el slice de favoritos

export const useAppStore = create(devtools((...args) => ({
  ...createRecipesSlice(...args),  // Agregar las funciones y variables del slice de recetas
  ...createFavoritesSlice(...args)  // Agregar las funciones y variables del slice de favoritos
})));
