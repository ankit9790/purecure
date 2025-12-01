const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const customerRoute = require("./routes/customerRoute");
const adminRoute = require("./routes/adminRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");





// Routes
app.use("/customers", customerRoute);
app.use("/admins", adminRoute);
app.use("/auth", authRoute);    
app.use("/products", productRoute);
app.use("/orders", orderRoute);



// Default route
app.get("/", (req, res) => {
  res.send("Customer API is running...");
});

// PORT for both Local and Render
const PORT = process.env.PORT || 8001;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
