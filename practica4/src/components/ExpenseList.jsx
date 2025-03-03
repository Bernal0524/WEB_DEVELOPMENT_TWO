import { useContext } from "react";
import { BudgetStateContext } from "../context/BudgetContext"; // Importar el contexto correctamente
import { ExpenseDetails } from "./ExpenseDetails"; // Importar el componente que muestra los detalles del gasto

export const ExpenseList = () => {
  const { expenses, currentCategory } = useContext(BudgetStateContext); // Obtener los gastos y la categoría seleccionada desde el contexto
  const isEmpty = expenses.length === 0;

  // Filtrar los gastos por categoría, si se ha seleccionado alguna categoría
  const filteredExpenses = currentCategory
    ? expenses.filter((expense) => expense.category === currentCategory) // Filtrar por la categoría seleccionada
    : expenses; // Si no se ha seleccionado categoría, mostrar todos los gastos

  return (
    <div className="mt-10">
      {isEmpty ? (
        // Si no hay gastos, mostrar un mensaje
        <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>
      ) : (
        <>
          {/* Si hay gastos, mostrar un título y los detalles de los gastos */}
          <p className="text-gray-600 text-2xl font-bold my-5">
            Listado de gastos.
          </p>
          {filteredExpenses.map((expense, index) => (
            // Mostrar los detalles de cada gasto
            <ExpenseDetails key={index} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
};
