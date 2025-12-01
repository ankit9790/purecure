import { useState } from "react";
import { signup } from "../services/authApi";

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // default
  });

  const handleSignup = async () => {
    try {
      const res = await signup(form);
      localStorage.setItem("user", JSON.stringify(res.user));
      setUser(res.user);
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="panel-container">
      <h2>Signup</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

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

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      <button className="action-btn" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};

export default Signup;
