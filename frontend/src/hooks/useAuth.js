import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const hook = useContext(AuthContext);
  if (!hook) throw Error("useAuth hook can me used inside AuthContextProvider");
  return hook;
};
