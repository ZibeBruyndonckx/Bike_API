const express = require("express");
const bodyParser = require("body-parser");
const csv = require("csv-parser");
const fs = require("fs");
const data = [];
fs.createReadStream("Used_Bikes.csv")
  .pipe(csv())
  .on("data", (d) => data.push(d))
  .on("end", () => {
    console.log(data);
    main();
  });

async function main() {
  const app = express();

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.get("/status", function (req, res) {
    res.status(200).send(data[2]);
  });
  app.post("/status", function (req, res) {
    const name = req.body.name;
    res.status(200).send("my name is " + name);
  });

  app.listen(80);
}
