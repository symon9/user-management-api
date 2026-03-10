require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const requestLogger = require("./middlewares/logger");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use(requestLogger);

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
