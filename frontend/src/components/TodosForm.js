import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTodos } from "../hooks/useTodos";

const TodosForm = () => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("unchecked");
  const [error, setError] = useState(null);

  const { dispatch } = useTodos();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { task, status };

    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log(json.error);
      return;
    }
    if (response.ok) {
      setError("Your task added");
      setStatus("");
      dispatch({ type: "ADD_TASK", payload: json });
    }
  };

  return (
    <>
      <form className="form card" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            className="form-input"
          />
          <label className="form-label">Task</label>
        </div>
        <div className="form-group">
          <input
            value={status}
            onClick={() =>
              status === "checked"
                ? setStatus("unchecked")
                : setStatus("checked")
            }
            type="checkbox"
            className="form-input"
          />
        </div>
        <button type="submit">Add Task</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default TodosForm;
