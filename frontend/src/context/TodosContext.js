import { createContext, useReducer } from "react";

export const TodoContext = createContext();

const TodoReducer = (state, action) => {
  switch (action.type) {
    case "GET_TASK":
      return {
        todos: action.payload,
      };
    case "ADD_TASK":
      return {
        todos: [action.payload, ...state.todos],
      };
    case "DELETE_TASK":
      return {
        todos: state.todos.filter((todo) => todo._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, { todos: null });

  return (
    <>
      <TodoContext.Provider value={{ ...state, dispatch }}>
        {children}
      </TodoContext.Provider>
    </>
  );
};
