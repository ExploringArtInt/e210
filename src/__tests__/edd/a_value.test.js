// a_value.test.js

const journeys = require("../../a_value.js");

test("simpleHTMLValJourney", () => {
  journeys.simpleHTMLValJourney();
  expect(true).toBe(true);
});
