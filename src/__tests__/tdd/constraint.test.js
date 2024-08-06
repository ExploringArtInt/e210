/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";

import { Constraint, ConstraintSet, ConstraintPatterns } from "../../constraint.js";

describe("Constraint", () => {
  test("should create a constraint with default values", () => {
    const constraint = new Constraint({ pattern: /\d+/ });
    expect(constraint.isAccepted).toBe(false);
    expect(constraint.testOnKeyUp).toBe(false);
    expect(constraint.pattern).toEqual(/\d+/);
    expect(constraint.errorMessage).toBe("Input does not meet the required format");
    expect(constraint.helpTitle).toBe("Input Help");
    expect(constraint.helpMessage).toBe("Please enter a valid input");
  });

  test("should create a constraint with custom values", () => {
    const constraint = new Constraint({
      pattern: /[A-Z]+/,
      testOnKeyUp: true,
      errorMessage: "Custom error",
      helpTitle: "Custom help",
      helpMessage: "Custom help message",
    });
    expect(constraint.testOnKeyUp).toBe(true);
    expect(constraint.pattern).toEqual(/[A-Z]+/);
    expect(constraint.errorMessage).toBe("Custom error");
    expect(constraint.helpTitle).toBe("Custom help");
    expect(constraint.helpMessage).toBe("Custom help message");
  });

  test("should test input against regex pattern", () => {
    const constraint = new Constraint({ pattern: /\d+/ });
    expect(constraint.test("123")).toBe(true);
    expect(constraint.test("abc")).toBe(false);
  });

  test("should test input against function pattern", () => {
    const constraint = new Constraint({
      pattern: (value) => value.length > 5,
    });
    expect(constraint.test("123456")).toBe(true);
    expect(constraint.test("12345")).toBe(false);
  });
});

describe("ConstraintSet", () => {
  let constraintSet;

  beforeEach(() => {
    constraintSet = new ConstraintSet();
  });

  test("should add constraints to the set", () => {
    const constraint1 = new Constraint({ pattern: /\d+/ });
    const constraint2 = new Constraint({ pattern: /[A-Z]+/ });
    constraintSet.addConstraint(constraint1);
    constraintSet.addConstraint(constraint2);
    expect(constraintSet.constraints.length).toBe(2);
  });

  test("should test all constraints", () => {
    constraintSet.addConstraint(new Constraint({ pattern: /\d+/ }));
    constraintSet.addConstraint(new Constraint({ pattern: /[A-Z]+/ }));
    expect(constraintSet.testAll("123ABC")).toBe(true);
    expect(constraintSet.testAll("123abc")).toBe(false);
    expect(constraintSet.testAll("abcABC")).toBe(false);
  });

  test("should get errors for failed constraints", () => {
    constraintSet.addConstraint(
      new Constraint({
        pattern: /\d+/,
        errorMessage: "Must contain numbers",
      }),
    );
    constraintSet.addConstraint(
      new Constraint({
        pattern: /[A-Z]+/,
        errorMessage: "Must contain uppercase letters",
      }),
    );
    constraintSet.testAll("abc");
    expect(constraintSet.getErrors()).toEqual(["Must contain numbers", "Must contain uppercase letters"]);
  });
});

describe("ConstraintPatterns", () => {
  test("Required pattern", () => {
    const constraint = new Constraint(ConstraintPatterns.Required);
    expect(constraint.test("abc")).toBe(true);
    expect(constraint.test("")).toBe(false);
    expect(constraint.test(" ")).toBe(false);
  });

  test("ExactPattern", () => {
    const constraint = new Constraint(ConstraintPatterns.ExactPattern(/^abc$/));
    expect(constraint.test("abc")).toBe(true);
    expect(constraint.test("abcd")).toBe(false);
  });

  test("CaseInsensitivePattern", () => {
    const constraint = new Constraint(ConstraintPatterns.CaseInsensitivePattern("abc"));
    expect(constraint.test("ABC")).toBe(true);
    expect(constraint.test("abc")).toBe(true);
  });

  test("WhitespaceInsensitivePattern", () => {
    const constraint = new Constraint(ConstraintPatterns.WhitespaceInsensitivePattern("abc"));
    expect(constraint.test("a b c")).toBe(true);
    expect(constraint.test("abc")).toBe(true);
  });

  test("Type.Integer", () => {
    const constraint = new Constraint(ConstraintPatterns.Type.Integer);
    expect(constraint.test("123")).toBe(true);
    expect(constraint.test("-123")).toBe(true);
    expect(constraint.test("123.45")).toBe(false);
  });

  test("Type.Email", () => {
    const constraint = new Constraint(ConstraintPatterns.Type.Email);
    expect(constraint.test("user@example.com")).toBe(true);
    expect(constraint.test("invalid-email")).toBe(false);
  });

  test("RangeMin", () => {
    const constraint = new Constraint(ConstraintPatterns.RangeMin(5));
    expect(constraint.test("10")).toBe(true);
    expect(constraint.test("5")).toBe(true);
    expect(constraint.test("4")).toBe(false);
  });

  test("RangeMax", () => {
    const constraint = new Constraint(ConstraintPatterns.RangeMax(5));
    expect(constraint.test("4")).toBe(true);
    expect(constraint.test("5")).toBe(true);
    expect(constraint.test("6")).toBe(false);
  });
});
