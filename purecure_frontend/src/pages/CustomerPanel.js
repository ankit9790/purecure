import { useEffect, useState } from "react";
import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerApi";


const CustomerPanel = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "customer",
  });
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "customer") {
      window.location.href = "/"; // redirect to main (login)
    }
  }, []);

  const loadCustomers = async () => {
    setCustomers(await getCustomers());
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleSubmit = async () => {
    if (editId) {
      await updateCustomer(editId, form);
    } else {
      await addCustomer(form);
    }

    setForm({ name: "", email: "", role: "customer" });
    setEditId(null);
    loadCustomers();
  };

  const handleCancel = () => {
    setForm({ name: "", email: "", role: "customer" });
    setEditId(null);
  };

  return (
    <div>
      <h2>Customer Panel</h2>

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
        {editId ? "Update" : "Add"}
      </button>

      {editId && (
        <button className="delete-btn" onClick={handleCancel}>
          Cancel
        </button>
      )}

      <h3>All Customers</h3>

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
                  className="edit-btn"
                  onClick={() => {
                    setForm(c);
                    setEditId(c.id);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteCustomer(c.id).then(loadCustomers)}
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

export default CustomerPanel;
