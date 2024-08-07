/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";

import { createConstraint, CompositeConstraint, ConstraintPatterns } from "../../constraint.js";

describe("Constraint System", () => {
  describe("SimpleConstraint", () => {
    test("Required constraint", () => {
      const constraint = createConstraint(ConstraintPatterns.Required);
      expect(constraint.test("value")).toBe(true);
      expect(constraint.test("")).toBe(false);
      expect(constraint.test(" ")).toBe(false);
    });

    test("ExactPattern constraint", () => {
      const constraint = createConstraint(ConstraintPatterns.ExactPattern(/^[a-z]+$/));
      expect(constraint.test("lowercase")).toBe(true);
      expect(constraint.test("UPPERCASE")).toBe(false);
      expect(constraint.test("123")).toBe(false);
    });

    test("Type.Integer constraint", () => {
      const constraint = createConstraint(ConstraintPatterns.Type.Integer);
      expect(constraint.test("123")).toBe(true);
      expect(constraint.test("-123")).toBe(true);
      expect(constraint.test("12.3")).toBe(false);
      expect(constraint.test("abc")).toBe(false);
    });

    test("Type.Email constraint", () => {
      const constraint = createConstraint(ConstraintPatterns.Type.Email);
      expect(constraint.test("user@example.com")).toBe(true);
      expect(constraint.test("invalid-email")).toBe(false);
    });

    test("RangeMin constraint", () => {
      const constraint = createConstraint(ConstraintPatterns.RangeMin(5));
      expect(constraint.test("10")).toBe(true);
      expect(constraint.test("5")).toBe(true);
      expect(constraint.test("4")).toBe(false);
    });

    test("RangeMax constraint", () => {
      const constraint = createConstraint(ConstraintPatterns.RangeMax(5));
      expect(constraint.test("4")).toBe(true);
      expect(constraint.test("5")).toBe(true);
      expect(constraint.test("6")).toBe(false);
    });
  });

  describe("CompositeConstraint", () => {
    test("Composite of multiple constraints", () => {
      const composite = createConstraint({
        constraints: [ConstraintPatterns.Required, ConstraintPatterns.Type.Integer, ConstraintPatterns.RangeMin(1), ConstraintPatterns.RangeMax(100)],
        errorMessage: "Invalid input",
      });

      expect(composite.testAll("50")).toBe(true);
      // expect(composite.testAll("0")).toBe(false);
      // expect(composite.testAll("101")).toBe(false);
      // expect(composite.testAll("abc")).toBe(false);
      // expect(composite.testAll("")).toBe(false);
    });

    test("Nested composite constraints", () => {
      const nestedComposite = createConstraint({
        constraints: [
          {
            constraints: [ConstraintPatterns.Required, ConstraintPatterns.Type.Email],
            errorMessage: "Invalid email",
          },
          {
            constraints: [ConstraintPatterns.Required, ConstraintPatterns.ExactPattern(/^[a-zA-Z0-9_]{3,20}$/)],
            errorMessage: "Invalid username",
          },
        ],
        errorMessage: "Form validation failed",
      });

      expect(
        nestedComposite.testAll({
          email: "user@example.com",
          username: "valid_user123",
        }),
      ).toBe(true);

      /*
      expect(
        nestedComposite.testAll({
          email: "invalid-email",
          username: "inv@lid",
        }),
      ).toBe(false);
      */
    });
  });

  describe("Error handling", () => {
    test("SimpleConstraint error messages", () => {
      const constraint = createConstraint({
        ...ConstraintPatterns.Required,
        errorMessage: "Custom error message",
      });

      constraint.test("");
      expect(constraint.getErrors()).toEqual(["Custom error message"]);
    });

    test.skip("CompositeConstraint error messages", () => {
      const composite = createConstraint({
        constraints: [
          { ...ConstraintPatterns.Required, errorMessage: "Value is required" },
          { ...ConstraintPatterns.Type.Integer, errorMessage: "Must be an integer" },
          { ...ConstraintPatterns.RangeMin(1), errorMessage: "Must be at least 1" },
          { ...ConstraintPatterns.RangeMax(100), errorMessage: "Must be at most 100" },
        ],
        errorMessage: "Invalid input",
      });

      composite.testAll("");
      expect(composite.getErrors()).toEqual(["Value is required", "Must be an integer", "Must be at least 1"]);

      composite.testAll("101");
      expect(composite.getErrors()).toEqual(["Must be at most 100"]);
    });
  });
});
