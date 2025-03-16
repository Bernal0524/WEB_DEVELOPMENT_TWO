import { getCategories, getRecipes, getRecipeById } from "../services/RecipeService";

export const createRecipesSlice = (set) => ({
  categories: [],  // Almacenará las categorías de cócteles
  drinks: [],      // Almacenará las bebidas filtradas
  selectedRecipe: {},  // Almacenará los detalles de la receta seleccionada
  modal: false,        // Controla si el modal está abierto o cerrado

  // Función para obtener las categorías de cócteles
  fetchCategories: async () => {
    const categories = await getCategories();  // Obtiene las categorías de cócteles
    set({ categories });  // Actualiza el estado con las categorías obtenidas
  },

  // Función para obtener recetas basadas en filtros
  searchRecipes: async (filters) => {
    const drinks = await getRecipes(filters);  // Obtiene las recetas filtradas con los valores de filtros
    set({ drinks });  // Actualiza el estado con las bebidas filtradas
  },

  // Función para seleccionar una receta y mostrar el modal
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);  // Obtiene los detalles de la receta
    set({
      selectedRecipe,  // Almacena los detalles de la receta seleccionada
      modal: true       // Abre el modal
    });
  },

  // Función para cerrar el modal y limpiar los detalles de la receta seleccionada
  closeModal: () => {
    set({
      modal: false,     // Cierra el modal
      selectedRecipe: {}  // Limpia los detalles de la receta seleccionada
    });
  }
});
