import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
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
          Signup
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default Signup;
