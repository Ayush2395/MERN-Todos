import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-input"
            placeholder=""
          />
          <label className="form-label">Email</label>
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-input"
            placeholder=""
          />
          <label className="form-label">Password</label>
        </div>
        <button disabled={isLoading} type="submit">
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default Login;
