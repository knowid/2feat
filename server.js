require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const sneakerRoute = require("./routes/sneakerRoute");
const adminRoute = require("./routes/adminRoute");

const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(err);
    console.log("Connected to MongoDB");
  }
);

app.use("/sneakers", sneakerRoute);
app.use("/", adminRoute);


app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
