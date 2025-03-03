import React, { useContext, useState, useEffect } from 'react';
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { BudgetDispatchContext, BudgetStateContext } from "../context/BudgetContext";
import ErrorMessage from './ErrorMessage';

export const ExpenseForm = () => {
  const [expense, setExpense] = useState({
    expenseName: '',
    amount: 0,
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');
  const dispatch = useContext(BudgetDispatchContext);
  const state = useContext(BudgetStateContext);

  // useEffect para cargar el gasto en edición si editingId cambia
  useEffect(() => { 
    if (state.editingId) {
      const editingExpense = state.expenses.find(exp => exp.id === state.editingId);
      if (editingExpense) {
        setExpense(editingExpense);
      }
    }
  }, [state.editingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isAmountField = name === 'amount';
    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    });
  };

  const handleChangeDate = (value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };

  const handleSubmit = (e) => { 
    e.preventDefault();

    // Validación
    if (Object.values(expense).includes('')) {
      setError('Todos los Campos son Obligatorios');
      return;
    }

    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } });
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });
    }

    // Reiniciar el state/form
    setExpense({
      expenseName: '',
      amount: 0,
      category: '',
      date: new Date(),
    });

    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
      <fieldset>
        <legend className="text-center text-2xl text-black-600 font-bold">
          {state.editingId ? "GUARDAR CAMBIOS" : "NUEVO GASTO"}
        </legend>
      </fieldset>

      {error && <ErrorMessage message={error} />}

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="expenseName" className="text-xl">Nombre del Gasto:</label>
        <input
          id="expenseName"
          type="text"
          className="bg-slate-100 p-2 border rounded-md"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
          placeholder="Añade el Nombre del gasto"
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="amount" className="text-xl">Monto:</label>
        <input
          id="amount"
          type="number"
          className="bg-slate-100 p-2 border rounded-md"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          placeholder="0"
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="category" className="text-xl">Categoría:</label>
        <select
          id="category"
          className="bg-slate-100 p-2 border rounded-md"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="date" className="text-xl">Fecha del Gasto:</label>
        <div className="flex items-center">
          <DatePicker
            className="bg-slate-100 p-2 border rounded-md"
            value={expense.date}
            onChange={handleChangeDate}
          />
        </div>
      </div>

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-md"
        value={state.editingId ? "GUARDAR CAMBIOS" : "REGISTRAR GASTO"}
      />
    </form>
  );
};

export default ExpenseForm;
