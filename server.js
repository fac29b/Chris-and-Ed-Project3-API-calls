require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.static("public"));

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});