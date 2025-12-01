import { useEffect, useState } from "react";
import {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  adminGetAllCustomers,
  adminDeleteCustomer,
} from "../services/adminApi";




const AdminPanel = () => {
  const [admins, setAdmins] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "admin",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      window.location.href = "/";
    }
  }, []);

  const loadAdmins = async () => setAdmins(await getAdmins());
  const loadCustomers = async () => setCustomers(await adminGetAllCustomers());

  useEffect(() => {
    loadAdmins();
    loadCustomers();
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await updateAdmin(editId, form);
    } else {
      await addAdmin(form);
    }

    setForm({ name: "", email: "", role: "admin" });
    setEditId(null);
    loadAdmins();
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", role: "admin" });
    setEditId(null);
  };

  return (
    <div>
      <h2>Admin Panel</h2>

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
        placeholder="Role"
        value={form.role}
        readOnly
        style={{ background: "#f1f2f6" }}
      />

      <button className="action-btn" onClick={handleSubmit}>
        {editId ? "Update Admin" : "Add Admin"}
      </button>

      {editId && (
        <button className="delete-btn" onClick={handleCancel}>
          Cancel
        </button>
      )}

      <h3>Admins</h3>

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
          {admins.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.role}</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setForm(a);
                    setEditId(a.id);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteAdmin(a.id).then(loadAdmins())}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Customers (Admin Control)</h3>

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
                <button
                  className="delete-btn"
                  onClick={() =>
                    adminDeleteCustomer(c.id).then(loadCustomers())
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
