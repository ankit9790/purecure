import { useState } from "react";
import { login } from "../services/authApi";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await login(form);
      localStorage.setItem("user", JSON.stringify(res.user)); // save session
      setUser(res.user); // update state in App.js
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="panel-container">
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button className="action-btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
