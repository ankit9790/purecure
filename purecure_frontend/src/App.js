import { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
} from "./services/api";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    role: "user",
  });

  // Fetch customers on load
  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Add new customer
  const handleAdd = async () => {
    if (!newCustomer.name || !newCustomer.email)
      return alert("Enter name and email");

    // send name, email, role
    await addCustomer(newCustomer);

    setNewCustomer({ name: "", email: "", role: "user" });
    loadCustomers();
  };

  // Delete customer
  const handleDelete = async (id) => {
    await deleteCustomer(id);
    loadCustomers();
  };

  // Update customer (example: update name only via PATCH)
  const handleUpdate = async (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;

    await updateCustomer(id, { name: updatedName }); // PATCH, backend will only update name
    loadCustomers();
  };

  return (
    <div className="App">
      <h1>Customer Management</h1>

      {/* Add Form */}
      <div className="form-row">
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, email: e.target.value })
          }
        />
        <select
          value={newCustomer.role}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, role: e.target.value })
          }
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={handleAdd}>Add Customer</button>
      </div>

      <hr />

      {/* Customer List */}
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            <div>
              <strong>{c.name}</strong> - {c.email}{" "}
              <span className="role-tag">[{c.role}]</span>
            </div>
            <div>
              <button onClick={() => handleUpdate(c.id)}>Update</button>
              <button onClick={() => handleDelete(c.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
