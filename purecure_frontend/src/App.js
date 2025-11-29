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
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });

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
    if (!newCustomer.name || !newCustomer.email) return alert("Enter details");

    await addCustomer(newCustomer);
    setNewCustomer({ name: "", email: "" });
    loadCustomers();
  };

  // Delete customer
  const handleDelete = async (id) => {
    await deleteCustomer(id);
    loadCustomers();
  };

  // Update customer (example updates name)
  const handleUpdate = async (id) => {
    const updatedName = prompt("Enter new name:");
    if (!updatedName) return;

    await updateCustomer(id, { name: updatedName });
    loadCustomers();
  };

  return (
    <div className="App">
      <h1>Customer Management</h1>

      {/* Add Form */}
      <div>
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
        <button onClick={handleAdd}>Add Customer</button>
      </div>

      <hr />

      {/* Customer List */}
      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> - {c.email}
            <button onClick={() => handleUpdate(c.id)}>Update</button>
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
