const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const customerRoutes = require("./routes/customerRoute");

// Routes
app.use("/customers", customerRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Customer API is running...");
});

// PORT for both Local and Render
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
