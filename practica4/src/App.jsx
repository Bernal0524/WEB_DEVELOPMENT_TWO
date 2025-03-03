import React, { useState, useContext } from 'react';
import { BudgetStateContext } from './context/BudgetContext';
import BudgetForm from './components/BudgetForm';
import BudgetTracker from './components/BudgetTracker';
import ExpenseModal from './components/ExpenseModal';
import { ExpenseList } from './components/ExpenseList'; 
import { FilterByCategory } from './components/FilterByCategory';

function App() {
  const state = useContext(BudgetStateContext);
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para el filtro de categoría
  const isValidBudget = state?.budget > 0;

  // Función para manejar el cambio de categoría en el filtro
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
            <FilterByCategory onCategoryChange={handleCategoryChange} /> {/* Filtro por categoría */}
            <ExpenseList selectedCategory={selectedCategory} /> {/* Pasa el filtro a ExpenseList */}
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
