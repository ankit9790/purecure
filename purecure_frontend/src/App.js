import { useEffect, useState } from "react";
import CustomerPanel from "./pages/CustomerPanel";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("login"); // login by default

  // Load saved user
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setScreen("login");
  };

  // 👉 If logged-in, show correct panel
  if (user) {
    return (
      <div className="App">
        <div className="top-buttons">
          <button onClick={logout}>Logout</button>
        </div>

        {user.role === "customer" && <CustomerPanel />}
        {user.role === "admin" && <AdminPanel />}
      </div>
    );
  }

  // 👉 Not logged in → Show Login / Signup
  return (
    <div className="App">
      <div className="top-buttons">
        <button
          className={screen === "login" ? "active-tab" : ""}
          onClick={() => setScreen("login")}
        >
          Login
        </button>

        <button
          className={screen === "signup" ? "active-tab" : ""}
          onClick={() => setScreen("signup")}
        >
          Signup
        </button>
      </div>

      <div className="panel-container">
        {screen === "login" ? (
          <Login setUser={setUser} />
        ) : (
          <Signup setUser={setUser} />
        )}
      </div>
    </div>
  );
}

export default App;
