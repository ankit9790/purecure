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
    role: "",
  });

  const [editCustomer, setEditCustomer] = useState(null);

  // Load all customers
  const loadCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (e) {
      console.error("Failed to load customers:", e);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // Add new customer
  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      const customer = await addCustomer(newCustomer);
      setCustomers([...customers, customer]);
      setNewCustomer({ name: "", email: "", role: "" });
    } catch (e) {
      console.error("Add error:", e);
      alert("Failed to add customer");
    }
  };

  // Update customer
  const handleUpdate = async () => {
    try {
      const updated = await updateCustomer(editCustomer.id, editCustomer);

      setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));

      setEditCustomer(null);
    } catch (e) {
      console.error("Update error:", e);
      alert("Failed to update customer");
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((c) => c.id !== id));
    } catch (e) {
      console.error("Delete error:", e);
      alert("Failed to delete customer");
    }
  };

  return (
    <div className="App">
      <h1>Customer Management</h1>

      {/* ADD CUSTOMER */}
      <div className="card">
        <h3>Add Customer</h3>
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
          placeholder="Role"
          value={newCustomer.role}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, role: e.target.value })
          }
        />

        <button onClick={handleAddCustomer}>Add</button>
      </div>

      {/* EDIT CUSTOMER */}
      {editCustomer && (
        <div className="card">
          <h3>Edit Customer</h3>

          <input
            type="text"
            value={editCustomer.name}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, name: e.target.value })
            }
          />
          <input
            type="email"
            value={editCustomer.email}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, email: e.target.value })
            }
          />
          <input
            type="text"
            value={editCustomer.role}
            onChange={(e) =>
              setEditCustomer({ ...editCustomer, role: e.target.value })
            }
          />

          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditCustomer(null)}>Cancel</button>
        </div>
      )}

      {/* CUSTOMER LIST */}
      <h2>All Customers</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.role}</td>

              <td>
                <button onClick={() => setEditCustomer(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
