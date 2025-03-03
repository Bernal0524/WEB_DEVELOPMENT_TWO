import { createContext, useReducer, useContext } from "react";
import { budgetReducer, initialState } from "../reducers/budget-reducer";

// Creación de los contextos
export const BudgetStateContext = createContext();
export const BudgetDispatchContext = createContext();

// El proveedor del contexto para envolver la aplicación
export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetStateContext.Provider value={state}>
      <BudgetDispatchContext.Provider value={dispatch}>
        {children}
      </BudgetDispatchContext.Provider>
    </BudgetStateContext.Provider>
  );
};

// Hooks personalizados para acceder al estado y al dispatch
export const useBudgetState = () => useContext(BudgetStateContext);
export const useBudgetDispatch = () => useContext(BudgetDispatchContext);