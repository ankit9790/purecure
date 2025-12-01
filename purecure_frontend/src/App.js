import { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  deleteCustomer,
  updateCustomer,
  patchCustomer,
  getAdmins,
  addAdmin,
  deleteAdmin,
  updateAdmin,
  patchAdmin,
  adminGetAllCustomers,
  adminDeleteCustomer,
} from "./services/api";

import "./App.css";

function App() {
  // ------- CUSTOMER STATES -------
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [editCustomer, setEditCustomer] = useState(null);

  // ------- ADMIN STATES -------
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "" });
  const [editAdmin, setEditAdmin] = useState(null);

  // Admin → Customer view
  const [adminCustomers, setAdminCustomers] = useState([]);

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    loadCustomers();
    loadAdmins();
  }, []);

  const loadCustomers = async () => {
    const data = await getCustomers();
    setCustomers(data);
  };

  const loadAdmins = async () => {
    const data = await getAdmins();
    setAdmins(data);
  };

  // ---------------- CUSTOMER HANDLERS ----------------
  const handleAddCustomer = async () => {
    const created = await addCustomer(newCustomer);
    setCustomers([...customers, created]);
    setNewCustomer({ name: "", email: "", role: "" });
  };

  const handleUpdateCustomer = async () => {
    const updated = await updateCustomer(editCustomer.id, editCustomer);
    setCustomers(customers.map((c) => (c.id === updated.id ? updated : c)));
    setEditCustomer(null);
  };

 const handlePatchCustomer = async (id) => {
   const newValue = prompt("Enter new role:");
   if (!newValue) return;

   const updated = await patchCustomer(id, { role: newValue });
   setCustomers(customers.map((c) => (c.id === id ? updated : c)));
 };



  const handleDeleteCustomer = async (id) => {
    await deleteCustomer(id);
    setCustomers(customers.filter((c) => c.id !== id));
  };

  // ---------------- ADMIN HANDLERS ----------------
  const handleAddAdmin = async () => {
    const created = await addAdmin(newAdmin);
    setAdmins([...admins, created]);
    setNewAdmin({ name: "", email: "", role: "" });
  };

  const handleUpdateAdmin = async () => {
    const updated = await updateAdmin(editAdmin.id, editAdmin);
    setAdmins(admins.map((a) => (a.id === updated.id ? updated : a)));
    setEditAdmin(null);
  };

  const handlePatchAdmin = async (id) => {
    const newValue = prompt("Enter new role:");
    if (!newValue) return;

    const updated = await patchAdmin(id, { role: newValue });
    setAdmins(admins.map((a) => (a.id === id ? updated : a)));
  };


  const handleDeleteAdmin = async (id) => {
    await deleteAdmin(id);
    setAdmins(admins.filter((a) => a.id !== id));
  };

  // ---------------- ADMIN → CUSTOMER ACTIONS ----------------
  const handleAdminGetAllCustomers = async () => {
    const data = await adminGetAllCustomers();
    setAdminCustomers(data);
  };

  const handleAdminDeleteCustomer = async (id) => {
    await adminDeleteCustomer(id);
    setAdminCustomers(adminCustomers.filter((c) => c.id !== id));
  };

  return (
    <div className="App">
      <h1>PureCure Management Dashboard</h1>

      {/* ================= CUSTOMER SECTION ================= */}
      <h2 className="section-title">Customer Management</h2>

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
        <button className="add" onClick={handleAddCustomer}>
          Add Customer
        </button>
      </div>

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
          <button className="edit" onClick={handleUpdateCustomer}>
            Update
          </button>
          <button className="delete" onClick={() => setEditCustomer(null)}>
            Cancel
          </button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
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
                <button className="edit" onClick={() => setEditCustomer(c)}>
                  Edit
                </button>
                <button
                  className="patch"
                  onClick={() => handlePatchCustomer(c.id)}
                >
                  Patch
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteCustomer(c.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= ADMIN SECTION ================= */}
      <h2 className="section-title">Admin Management</h2>

      <div className="card">
        <h3>Add Admin</h3>
        <input
          type="text"
          placeholder="Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newAdmin.role}
          onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
        />
        <button className="add" onClick={handleAddAdmin}>
          Add Admin
        </button>
      </div>

      {editAdmin && (
        <div className="card">
          <h3>Edit Admin</h3>
          <input
            type="text"
            value={editAdmin.name}
            onChange={(e) =>
              setEditAdmin({ ...editAdmin, name: e.target.value })
            }
          />
          <input
            type="email"
            value={editAdmin.email}
            onChange={(e) =>
              setEditAdmin({ ...editAdmin, email: e.target.value })
            }
          />
          <input
            type="text"
            value={editAdmin.role}
            onChange={(e) =>
              setEditAdmin({ ...editAdmin, role: e.target.value })
            }
          />
          <button className="edit" onClick={handleUpdateAdmin}>
            Update
          </button>
          <button className="delete" onClick={() => setEditAdmin(null)}>
            Cancel
          </button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.role}</td>
              <td>
                <button className="edit" onClick={() => setEditAdmin(a)}>
                  Edit
                </button>
                <button
                  className="patch"
                  onClick={() => handlePatchAdmin(a.id)}
                >
                  Patch
                </button>
                <button
                  className="delete"
                  onClick={() => handleDeleteAdmin(a.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= ADMIN → CUSTOMER CONTROL ================= */}
      <h2 className="section-title">Admin Tools (Manage Customers)</h2>

      <button className="admin-action" onClick={handleAdminGetAllCustomers}>
        Load All Customers (Admin View)
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Admin Action</th>
          </tr>
        </thead>
        <tbody>
          {adminCustomers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.role}</td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleAdminDeleteCustomer(c.id)}
                >
                  Delete customer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
