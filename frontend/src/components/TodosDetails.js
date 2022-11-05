import React from "react";
import { useTodos } from "../hooks/useTodos";
import { useAuth } from "../hooks/useAuth";

const TodosDetails = ({ todo }) => {
  const { dispatch } = useTodos();
  const { user } = useAuth();

  const deleteTask = async () => {
    const response = await fetch(`/api/todos/${todo._id}`, {
      method: "DELETE",
      headers: { authorization: `Bearer ${user.token}` },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-title">{todo.task}</div>
        <div className="card-status">{todo.status}</div>
        <button onClick={deleteTask}>Delete</button>
      </div>
    </>
  );
};

export default TodosDetails;
