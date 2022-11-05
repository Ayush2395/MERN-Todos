import React, { useEffect } from "react";
import TodosDetails from "../components/TodosDetails";
import TodosForm from "../components/TodosForm";
import { useAuth } from "../hooks/useAuth";
import { useTodos } from "../hooks/useTodos";

const Home = () => {
  const { todos, dispatch } = useTodos();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos", {
        headers: { authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_TASK", payload: json });
      }
    };

    fetchTodos();
  }, [dispatch, user]);

  return (
    <>
      <h1>Your Todos</h1>
      <div className="section grid home_section">
        <div className="todos">
          {todos &&
            todos.map((todo) => <TodosDetails key={todo._id} todo={todo} />)}
        </div>
        <TodosForm />
      </div>
    </>
  );
};

export default Home;
