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
    role: "customer",
  });

  const loadCustomers = async () => {
    const res = await getCustomers();
    setCustomers(res.data);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleAdd = async () => {
    if (!newCustomer.name || !newCustomer.email) return alert("Enter details");

    await addCustomer(newCustomer);
    setNewCustomer({ name: "", email: "", role: "customer" });
    loadCustomers();
  };

  const handleDelete = async (id) => {
    await deleteCustomer(id);
    loadCustomers();
  };

  const handleUpdate = async (id) => {
    const updatedName = prompt("Enter new name:");
    const updatedRole = prompt("Enter new role (admin/customer):");

    if (!updatedName || !updatedRole) return;

    await updateCustomer(id, {
      name: updatedName,
      role: updatedRole,
      email: customers.find((c) => c.id === id).email,
    });

    loadCustomers();
  };

  return (
    <div className="App">
      <h1>Customer Management</h1>

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

        <input
          type="text"
          placeholder="Role (default: customer)"
          value={newCustomer.role}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, role: e.target.value })
          }
        />

        <button onClick={handleAdd}>Add Customer</button>
      </div>

      <hr />

      <ul>
        {customers.map((c) => (
          <li key={c.id}>
            <strong>{c.name}</strong> - {c.email} - {c.role}
            <button onClick={() => handleUpdate(c.id)}>Update</button>
            <button onClick={() => handleDelete(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
