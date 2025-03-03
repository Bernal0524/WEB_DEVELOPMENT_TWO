import React, { useContext } from 'react';
import { BudgetStateContext } from './context/BudgetContext';
import BudgetForm from './components/BudgetForm';
import BudgetTracker from './components/BudgetTracker';
import ExpenseModal from './components/ExpenseModal';
import { ExpenseList } from './components/ExpenseList'; // Asegúrate de importar ExpenseList

function App() {
  const state = useContext(BudgetStateContext);
  const isValidBudget = state?.budget > 0;

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
            <ExpenseList /> {/* Renderiza ExpenseList aquí */}
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