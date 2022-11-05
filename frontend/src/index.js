import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { TodoContextProvider } from "./context/TodosContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="main">
      <AuthContextProvider>
        <TodoContextProvider>
          <Router>
            <App />
          </Router>
        </TodoContextProvider>
      </AuthContextProvider>
    </div>
  </React.StrictMode>
);
