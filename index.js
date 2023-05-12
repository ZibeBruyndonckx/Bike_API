const express = require("express");
const bodyParser = require("body-parser");
const csv = require("csv-parser");
const fs = require("fs");

const { sortObjectByValue } = require("./objectTweeFuncties");

let numberOfThings = 10;

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

  app.get("/bikes-per-city", function (req, res) {
    const cities = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!cities[point.city]) {
        cities[point.city] = 0;
      }
      cities[point.city] += 1;
    }

    const powers = [];
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!powers[point.power]) {
        powers[point.power] = 0;
      }
      powers[point.power] += 1;
    }

    const dataNoCity = [];
    for (const point of data) {
      const newPoint = { ...point };
      delete newPoint.city;
      dataNoCity.push(newPoint);
    }

    let datas = [];
    for (let i = 0; i < numberOfThings && i < dataNoCity.length; i++) {
      datas.push(dataNoCity[i]);
    }

    const response = {
      data: datas,
      cities: sortObjectByValue(cities),
    };

    res.status(200).send(response);
  });

  app.get("/status", function (req, res) {
    res.status(200).send("OK");
  });

  app.post("/info", function (req, res) {
    const name = req.body.name;
    const age = req.body.age;
    res.status(200).send("My name is " + name + " and I am " + age + ".");
  });

  app.listen(80);
}
