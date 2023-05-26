const express = require("express");
const bodyParser = require("body-parser");
const csv = require("csv-parser");
const fs = require("fs");

const { sortObjectByValue, sortObjectByAge } = require("./renameFunctions");

let numberOfThings = Infinity;

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

  // GET API: bikes-per-?
  //#region
  app.get("/bikes-per-?", function (req, res) {
    const cities = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!cities[point.city]) {
        cities[point.city] = 0;
      }
      cities[point.city] += 1;
    }

    const ages = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!ages[point.age]) {
        ages[point.age] = 0;
      }
      ages[point.age] += 1;
    }

    const owners = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!owners[point.owner]) {
        owners[point.owner] = 0;
      }
      owners[point.owner] += 1;
    }

    const brands = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!brands[point.brand]) {
        brands[point.brand] = 0;
      }
      brands[point.brand] += 1;
    }

    const powers = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!powers[point.power]) {
        powers[point.power] = 0;
      }
      powers[point.power] += 1;
    }

    const dataNoThings = [];
    for (const point of data) {
      const newPoint = { ...point };
      delete newPoint.city;
      delete newPoint.age;
      delete newPoint.owner;
      delete newPoint.brand;
      delete newPoint.power;
      dataNoThings.push(newPoint);
    }

    let datas = [];
    for (let i = 0; i < numberOfThings && i < dataNoThings.length; i++) {
      datas.push(dataNoThings[i]);
    }

    const response = {
      datas: datas,
    };

    res.status(200).send(response);
  });
  //#endregion

  // GET API: bikes-per-power
  //#region
  app.get("/bikes-per-power", function (req, res) {
    const powers = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!powers[point.power]) {
        powers[point.power] = 0;
      }
      powers[point.power] += 1;
    }

    const response = {
      powers: sortObjectByAge(powers),
    };

    res.status(200).send(response);
  });

  //#endregion

  // GET API: bikes-per-brand
  //#region
  app.get("/bikes-per-brand", function (req, res) {
    const brands = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!brands[point.brand]) {
        brands[point.brand] = 0;
      }
      brands[point.brand] += 1;
    }

    const response = {
      brands: sortObjectByValue(brands),
    };

    res.status(200).send(response);
  });
  //#endregion

  // GET API: bikes-per-owner
  //#region
  app.get("/bikes-per-owner", function (req, res) {
    const owners = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!owners[point.owner]) {
        owners[point.owner] = 0;
      }
      owners[point.owner] += 1;
    }

    const response = {
      owners: owners,
    };

    res.status(200).send(response);
  });
  //#endregion

  // GET API: bikes-per-age
  //#region
  app.get("/bikes-per-age", function (req, res) {
    const ages = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!ages[point.age]) {
        ages[point.age] = 0;
      }
      ages[point.age] += 1;
    }

    const response = {
      ages: sortObjectByAge(ages),
    };

    res.status(200).send(response);
  });
  //#endregion

  // GET API: bikes-per-city
  //#region
  app.get("/bikes-per-city", function (req, res) {
    const cities = {};
    for (let i = 0; i < numberOfThings && i < data.length; i++) {
      const point = data[i];
      if (!cities[point.city]) {
        cities[point.city] = 0;
      }
      cities[point.city] += 1;
    }

    const response = {
      cities: sortObjectByValue(cities),
    };

    res.status(200).send(response);
  });
  //#endregion

  // GET API: status
  //#region
  app.get("/status", function (req, res) {
    res.status(200).send("OK");
  });
  //#endregion

  // POST API:post-data
  //#region
  app.post("/post-data", function (req, res) {
    const name = req.body.name;
    const age = req.body.age;
    const city = req.body.city;
    const brand = req.body.brand;
    const owner = req.body.owner;
    const data = req.body.data;

    const response = {
      name: name,
      age: age,
      city: city,
      brand: brand,
      owner: owner,
      data: data,
    };

    res.status(200).send(response);
  });
  //#endregion

  // POST API: info
  //#region
  app.post("/info", function (req, res) {
    const name = req.body.name;
    const age = req.body.age;
    res.status(200).send("My name is " + name + " and I am " + age + ".");
  });
  //#endregion

  app.listen(80);
}
