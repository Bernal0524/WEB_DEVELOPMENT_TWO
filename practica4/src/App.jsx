import React, { useEffect, useContext } from "react";
import { BudgetStateContext, BudgetDispatchContext } from "./context/BudgetContext";
import BudgetForm from "./components/BudgetForm";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { FilterByCategory } from "./components/FilterByCategory";

function App() {
  const state = useContext(BudgetStateContext);
  const dispatch = useContext(BudgetDispatchContext);
  const isValidBudget = state?.budget > 0;

  // Guardar presupuesto en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("budget", state.budget.toString());
  }, [state.budget]);

  // Guardar gastos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de gastos
        </h1>
      </header>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {/* Mostrar error sobre el formulario y la lista de gastos */}
        {state.error && (
          <div className="bg-red-500 text-white p-3 mb-5 rounded text-center font-bold">
            {state.error}
          </div>
        )}

        {isValidBudget ? (
          <>
            <BudgetTracker />
            <FilterByCategory />
            <ExpenseList />
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
