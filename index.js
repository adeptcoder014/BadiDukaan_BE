const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { pool, connectDB } = require("./db/connect");
const routes = require("./routes");
const path = require("path");

const app = express();

connectDB();

// Enable CORS
app.use(
  cors({
    origin: "*", // Adjust for security in production
  })
);

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Routes
app.use(routes);

// Define PORT properly with fallback
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`✅ Server started on PORT: ${PORT}`);
});
