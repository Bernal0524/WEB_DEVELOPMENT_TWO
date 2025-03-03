import React, { useContext, useEffect } from "react";
import { BudgetStateContext, BudgetDispatchContext } from "./context/BudgetContext";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { FilterByCategory } from "./components/FilterByCategory";

function App() {
  const state = useContext(BudgetStateContext);
  const dispatch = useContext(BudgetDispatchContext); // Usar dispatch para cambiar la categoría
  const isValidBudget = state?.budget > 0;

  // Guardar budget en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
  }, [state.budget]);

  // Guardar expenses en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  // Función para manejar el cambio de categoría en el filtro
  const handleCategoryChange = (event) => {
    dispatch({
      type: "add-filter-category",
      payload: { categoryId: event.target.value },
    });
  };

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? (
          <>
            <BudgetTracker />
            <FilterByCategory onCategoryChange={handleCategoryChange} /> {/* Filtrar por categoría */}
            <ExpenseList /> {/* Ya no se necesita pasar `selectedCategory` */}
            <ExpenseModal />
          </>
        ) : (
          <BudgetForm />
        )}
      </div>
    </>
  );
}

export default App;
