const initialBudget = () => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? parseFloat(localStorageBudget) : 0;
};

const localStorageExpenses = () => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: "",
  error: "",
};

export const budgetReducer = (state, action) => {
  switch (action.type) {
    case "add-budget":
      return { ...state, budget: action.payload.budget, error: "" };

    case "show-modal":
      return { ...state, modal: true };

    case "close-modal":
      return { ...state, modal: false, editingId: "" };

    case "add-expense": {
      const newTotal = state.expenses.reduce((sum, exp) => sum + exp.amount, 0) + action.payload.expense.amount;
      if (newTotal > state.budget) {
        return { ...state, error: "El gasto excede el presupuesto disponible" };
      }
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload.expense, id: new Date().getTime() }],
        modal: false,
        error: "",
      };
    }

    case "remove-expense":
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload.id),
        error: "",
      };

    case "get-expense-by-id":
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };

    case "update-expense": {
      const updatedExpenses = state.expenses.map((exp) =>
        exp.id === action.payload.expense.id ? action.payload.expense : exp
      );
      const newTotal = updatedExpenses.reduce((sum, exp) => sum + exp.amount, 0);
      if (newTotal > state.budget) {
        return { ...state, error: "El gasto actualizado excede el presupuesto disponible" };
      }
      return {
        ...state,
        expenses: updatedExpenses,
        modal: false,
        editingId: "",
        error: "",
      };
    }

    case "add-filter-category":
      return {
        ...state,
        currentCategory: action.payload.categoryId,
      };

    case "reset-app": // Acción para reiniciar la app
      localStorage.removeItem("budget");
      localStorage.removeItem("expenses");
      return {
        ...initialState,
        budget: 0,
        expenses: [],
      };

    default:
      return state;
  }
};
