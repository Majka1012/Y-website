const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const usersRoutes = require("./routes/users.routes");
const postsRoutes = require("./routes/posts.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

const geocodeRouter = require("./routes/geocode");
app.use("/api", geocodeRouter);

mongoose
  .connect(process.env.Mongo_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.log("MongoDB error", err));

app.get("/", (req, res) => {
  res.send("Backend działa ");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend działa na http://localhost:${PORT}`);
});
