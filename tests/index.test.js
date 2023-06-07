// SETUP
//#region
const { fork } = require("child_process");
const path = require("path");

// Start the server before running the tests
let server;

beforeAll(async () => {
  server = fork(path.join(process.cwd(), "index.js"));
  await new Promise((resolve) => {
    server.on("message", resolve);
  });
});

// Close the server after running the tests
afterAll((done) => {
  server.kill();
  server.on("exit", (code, signal) => {
    done();
  });
});

// Write your test cases: testsss are working
test('"testsss are working"', async () => {
  expect(true).toBe(true);
});
//#endregion

// Write your test cases: can get bikes from powers
//#region
test('"can get bikes from powers"', async () => {
  const res = await fetch("http://localhost/bikes-per-power");
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(data.powers).not.toBe(undefined);
  const powerNumber1 = 100;
  const powerNumber2 = 320;
  const powerNumber3 = 500;
  const powerNumber4 = 1000;
  expect(data.powers[powerNumber1]).toBe(2424); // This is the amount of bikes with power 100 in this dataset
  expect(data.powers[powerNumber2]).toBe(9); // This is the amount of bikes with power 320 in this dataset
  expect(data.powers[powerNumber3]).toBe(369); // This is the amount of bikes with power 500 in this dataset
  expect(data.powers[powerNumber4]).toBe(20); // This is the amount of bikes with power 1000 in this dataset
  const amountOfPowers = Object.keys(data.powers).length;
  expect(amountOfPowers).toBe(63 - 10); // This is the amount of diffrent powers in this dataset
});
//#endregion

// Write your test cases: can get bikes from brands
//#region
test('"can get bikes from brands"', async () => {
  const res = await fetch("http://localhost/bikes-per-brand");
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(data.brands).not.toBe(undefined);
  expect(data.brands.Hero).toBe(2862); // This is to check the amount of brand Hero in the dataset
  expect(data.brands.Honda).toBe(1226); // This is to check the amount of brand Honda in the dataset
  expect(data.brands.MV).toBe(4); // This is to check the amount of brand MV in the dataset
  expect(data.brands.Yezdi).toBe(1); // This is to check the amount of brand Yedzi in the dataset
  const amountOfBrands = Object.keys(data.brands).length;
  expect(amountOfBrands).toBe(33 - 10); // This is the amount of different brands in this dataset
});
//#endregion

// Write your test cases: can get bikes from cities
//#region
test('"can get bikes from cities"', async () => {
  const res = await fetch("http://localhost/bikes-per-city");
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(data.cities).not.toBe(undefined);
  expect(data.cities.Delhi).toBe(3383); // This is the amount of bikes in Delhi in this dataset
  expect(data.cities.Pune).toBe(847); // This is the amount of bikes in Pune in this dataset
  expect(data.cities.Noida).toBe(335); // This is the amount of bikes in Noida in this dataset
  expect(data.cities.Vapi).toBe(3); // This is the amount of bikes in Vapi in this dataset
  const amountOfCities = Object.keys(data.cities).length;
  expect(amountOfCities).toBe(442 + 1); // This is the amount of diffrent cities in this dataset
});
//#endregion

// Write your test cases: can get bikes from ages
//#region
test('"can get bikes from ages"', async () => {
  const res = await fetch("http://localhost/bikes-per-age");
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(data.ages).not.toBe(undefined);
  const ageNumber1 = 2;
  const ageNumber2 = 10;
  const ageNumber3 = 20;
  const ageNumber4 = 30;
  expect(data.ages[ageNumber1]).toBe(385); // This is the amount of bikes with age 1 in this dataset
  expect(data.ages[ageNumber2]).toBe(648); // This is the amount of bikes with age 5 in this dataset
  expect(data.ages[ageNumber3]).toBe(7); // This is the amount of bikes with age 10 in this dataset
  expect(data.ages[ageNumber4]).toBe(1); // This is the amount of bikes with age 15 in this dataset
  const amountOfAges = Object.keys(data.ages).length;
  expect(amountOfAges).toBe(45 - 10); // This is the amount of different ages in this dataset
});
//#endregion

// Write your test cases: can get bikes from owners
//#region
test('"can get bikes from owners"', async () => {
  const res = await fetch("http://localhost/bikes-per-owner");
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(data.owners).not.toBe(undefined);
  const owner1 = "First Owner";
  const owner2 = "Second Owner";
  const owner3 = "Third Owner";
  const owner4 = "Fourth Owner Or More";
  expect(data.owners[owner1]).toBe(14620);
  expect(data.owners[owner2]).toBe(1259);
  expect(data.owners[owner3]).toBe(108);
  expect(data.owners[owner4]).toBe(12);
});
//#endregion

// Write your test cases: can get bikes from Delhi city
//#region
test('"can get bikes from Delhi city"', async () => {
  const res = await fetch("http://localhost/number-of-city-bikes?city=Delhi");
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(data.Delhi).not.toBe(undefined);
  expect(data.Delhi).toBe(3383); // This is the amount of bikes in Delhi in this dataset
});
//#endregion

// Write your test cases: can get bikes from Hero brand
//#region
test('"can get bikes from the Hero brand"', async () => {
  const res = await fetch("http://localhost/bikes-per-brand");
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(data.brands).not.toBe(undefined);
  const brand = "Hero";
  expect(data.brands[brand]).toBe(2862); // This is the expected number of bikes for the Hero brand in the dataset
});
//#endregion
