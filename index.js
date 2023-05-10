const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/status", function (req, res) {
  res.status(200).send("ok");
});
app.post("/status", function (req, res) {
  const name = req.body.name;
  res.status(200).send("my name is " + name);
});

app.listen(80);
