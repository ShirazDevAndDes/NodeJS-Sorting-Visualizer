const express = require("express");
const app = express();

app.listen(3000, console.log("Server Start"));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
