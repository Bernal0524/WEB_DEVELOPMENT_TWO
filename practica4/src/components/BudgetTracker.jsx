import { useContext } from 'react';
import { BudgetStateContext, BudgetDispatchContext } from '../context/BudgetContext';
import { AmountDisplay } from './AmountDisplay';

const BudgetTracker = () => {
    const state = useContext(BudgetStateContext);
    const dispatch = useContext(BudgetDispatchContext);

    // Calcular el presupuesto total gastado
    const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0);

    // Calcular el presupuesto restante
    const remainingBudget = state.budget - totalExpenses;

    const handleReset = () => {
        dispatch({ type: 'reset-app' });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/grafico.jpg" alt="Gráfico de presupuesto" />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                    onClick={handleReset}
                >
                    Resetear app
                </button>

                {/* Mostrar el presupuesto total con formato */}
                <AmountDisplay amount={state.budget} label="Presupuesto" />
                {/* Mostrar el presupuesto disponible con formato */}
                <AmountDisplay amount={remainingBudget} label="Disponible" />
                {/* Mostrar el presupuesto gastado con formato */}
                <AmountDisplay amount={totalExpenses} label="Gastado" />
            </div>
        </div>
    );
};

export default BudgetTracker;
