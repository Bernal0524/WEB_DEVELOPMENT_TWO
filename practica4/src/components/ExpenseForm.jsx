import React, { useContext, useState } from 'react';
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
    if (Object.values(expense).some((val) => val === '' || val === 0)) {
      setError('Todos los campos son obligatorios');
      return;
    }
    dispatch({ type: 'add-expense', payload: { expense } });
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
      <div className="text-center">
        <label className="text-2xl text-black-600 font-bold">NUEVO GASTO</label>
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="expenseName" className="text-xl">
          Nombre del Gasto:
        </label>
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
        <label htmlFor="amount" className="text-xl">
          Monto:
        </label>
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
        <label htmlFor="category" className="text-xl">
          Categoría:
        </label>
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
        <label htmlFor="date" className="text-xl">
          Fecha del Gasto:
        </label>
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
        value="Registrar gasto"
      />
    </form>
  );
};

export default ExpenseForm;