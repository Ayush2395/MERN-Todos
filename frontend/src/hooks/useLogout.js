import { useAuth } from "./useAuth";
import { useTodos } from "./useTodos";

export const useLogout = () => {
  const { dispatch } = useAuth();

  const { dispatch: TodoDispatch } = useTodos();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    TodoDispatch({ type: "GET_TASK", payload: null });
  };

  return { logout };
};
