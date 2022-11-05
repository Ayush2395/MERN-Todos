import { useContext } from "react";
import { TodoContext } from "../context/TodosContext";

export const useTodos = () => {
  const hook = useContext(TodoContext);
  if (!hook) {
    return Error("useTodos can be only used inside the TodoContextProvider");
  }
  return hook;
};
