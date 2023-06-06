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

// Write your test cases: can get bikes from dehli
test('"can get bikes from dehli"', async () => {
  const res = await fetch("http://localhost/number-of-city-bikes?city=Delhi");
  expect(res.ok).toBe(true);
  const data = await res.json();
  expect(data.Delhi).not.toBe(undefined);
  expect(data.Delhi).toBe(3383); // This is the amount of bikes in Delhi in this dataset
});

// Write your test cases: can get bikes from cities
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
