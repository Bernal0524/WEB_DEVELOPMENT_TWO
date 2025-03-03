// Funciones para obtener datos desde localStorage
const initialBudget = () => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? parseFloat(localStorageBudget) : 0;
};

const localStorageExpenses = () => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

// Estado inicial del reducer
export const initialState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: "",
};

export const budgetReducer = (state, action) => {
  switch (action.type) {
    case "add-budget":
      localStorage.setItem("budget", action.payload.budget); // Guardar en localStorage
      return { ...state, budget: action.payload.budget };

    case "show-modal":
      return { ...state, modal: true };

    case "close-modal":
      return { ...state, modal: false, editingId: "" };

    case "add-expense":
      const newExpenses = [
        ...state.expenses,
        { ...action.payload.expense, id: new Date().getTime() },
      ];
      localStorage.setItem("expenses", JSON.stringify(newExpenses)); // Guardar en localStorage
      return {
        ...state,
        expenses: newExpenses,
        modal: false,
      };

    case "remove-expense":
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses)); // Guardar en localStorage
      return {
        ...state,
        expenses: updatedExpenses,
      };

    case "get-expense-by-id":
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };

    case "update-expense":
      const modifiedExpenses = state.expenses.map((expense) =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      );
      localStorage.setItem("expenses", JSON.stringify(modifiedExpenses)); // Guardar en localStorage
      return {
        ...state,
        expenses: modifiedExpenses,
        modal: false,
        editingId: "",
      };

    case "add-filter-category":
      return {
        ...state,
        currentCategory: action.payload.categoryId, // Actualizar categoría seleccionada
      };

    default:
      return state;
  }
};
