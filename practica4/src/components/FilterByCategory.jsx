import { useContext } from "react";
import { BudgetDispatchContext } from "../context/BudgetContext"; // Asegúrate de que este es el contexto correcto
import { categories } from "../data/categories"; // Asegúrate de que las categorías están correctamente importadas

export const FilterByCategory = () => {
  const dispatch = useContext(BudgetDispatchContext); // Usamos el dispatch del contexto

  // Manejador de evento para cambiar la categoría
  const handleChange = (e) => {
    dispatch({
      type: "add-filter-category", // El tipo de acción
      payload: { categoryId: e.target.value }, // El ID de la categoría seleccionada
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <form>
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category">Filtrar gastos</label>
          <select
            id="category"
            className="bg-slate-100 p-3 flex-1 rounded"
            onChange={handleChange} // Asegúrate de que el evento onChange esté conectado
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
