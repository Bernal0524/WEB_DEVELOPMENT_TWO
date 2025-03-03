import { useContext } from 'react';
import { BudgetStateContext, BudgetDispatchContext } from '../context/BudgetContext';
import { AmountDisplay } from './AmountDisplay';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetTracker = () => {
    const state = useContext(BudgetStateContext);
    const dispatch = useContext(BudgetDispatchContext);

    // Calcular el presupuesto total gastado
    const totalExpenses = state.expenses.reduce((total, expense) => expense.amount + total, 0);

    // Calcular el presupuesto restante
    const remainingBudget = state.budget - totalExpenses;

    // Calcular el porcentaje de presupuesto gastado
    const percentage = ((totalExpenses / state.budget) * 100).toFixed(2);

    const handleReset = () => {
        dispatch({ type: 'reset-app' });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                {/* Reemplazamos la etiqueta img por el CircularProgressbar */}
                <CircularProgressbar
                    value={percentage}
                    text={`$${percentage}%`} // Texto que se muestra dentro del círculo, en este caso el porcentaje
                    styles={buildStyles({
                        pathColor: percentage < 100 ? '#3b82f6' : '#dc2626', // Azul si es menor a 100%, rojo si es 100%
                        trailColor: '#f5f5f5' // Color del fondo de la barra (trayectoria no completada)
                    })}
                />
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
