import axios from "axios";

// Función para obtener las categorías de cócteles
export async function getCategories() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
  const { data } = await axios(url);
  console.log(data.drinks);  // Para depurar y verificar la respuesta
  return data.drinks || [];  // Asegurarse de que siempre retorne un array
}

// Función para obtener recetas basadas en filtros
export async function getRecipes(filters) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;
  const { data } = await axios(url);
  console.log(data);  // Para depurar y verificar la respuesta completa
  return data.drinks ? data.drinks : [];  // Asegurarse de que se retorne un array vacío si no hay bebidas
}

// Función para obtener una receta por su ID
export async function getRecipeById(id) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const { data } = await axios(url);
  return data.drinks ? data.drinks[0] : null;  // Devuelve la receta o null si no se encuentra
}
