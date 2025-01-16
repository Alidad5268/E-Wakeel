const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const sequelize = require("./config/db");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);


// Synchronize all models
// sequelize
//   .sync({ force: true }) // Use { force: true } only in development to recreate tables
//   .then(() => {
//     console.log("Database & tables created!");
//   })
//   .catch((err) => {
//     console.error("Error creating database & tables:", err);
//   });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
