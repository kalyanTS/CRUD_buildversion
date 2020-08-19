const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

const uri = process.env.URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => console.log("database connected!"));

const employeeRoute = require("./routes/employeeRoutes");
app.use("/employees", employeeRoute);

app.listen(port, () => console.log("server is running on port " + port));
