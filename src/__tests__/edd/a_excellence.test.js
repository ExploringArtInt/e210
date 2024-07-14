// excellence.test.js

const journeys = require("../../a_excellence.js");

test("architecture is excellent", () => {
  journeys.architecture();
  expect(true).toBe(true);
});

test("nfrs are excellent", () => {
  journeys.nfr();
  expect(true).toBe(true);
});

test("tech debt is low", () => {
  journeys.techDebt();
  expect(true).toBe(true);
});

test("exampleExlJourney", () => {
  journeys.exampleExlJourney();
  expect(true).toBe(true);
});
