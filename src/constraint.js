// constrain.js

/***
  Provides a flexible way to define and apply constraints to entity inputs.

 Key Components:
 1. Constraint: A class representing a single validation rule.
 2. ConstraintSet: A class for managing multiple constraints for an entity input.
 3. ConstraintPatterns: Predefined patterns for common validation scenarios.

 How to use:
 1. Import the necessary classes and patterns:
    import { Constraint, ConstraintSet, ConstraintPatterns } from './constrain.js';

 2. Create a ConstraintSet for your entity input:
    const constraintSet = new ConstraintSet();

 3. Add constraints to the set:
    constraintSet.addConstraint(new Constraint(ConstraintPatterns.Required));
    constraintSet.addConstraint(new Constraint(ConstraintPatterns.Type.Email));

 4. Test input against all constraints:
    const isValid = constraintSet.testAll("user@example.com");

 5. Get error messages if validation fails:
    const errors = constraintSet.getErrors();

 ***/

class Constraint {
  constructor(options) {
    this.isAccepted = false;
    this.testOnKeyUp = options.testOnKeyUp || false;
    this.pattern = options.pattern;
    this.errorMessage = options.errorMessage || "Input does not meet the required format";
    this.helpTitle = options.helpTitle || "Input Help";
    this.helpMessage = options.helpMessage || "Please enter a valid input";
  }

  test(value) {
    if (typeof this.pattern === "function") {
      this.isAccepted = this.pattern(value);
    } else {
      this.isAccepted = new RegExp(this.pattern).test(value);
    }
    return this.isAccepted;
  }
}

class ConstraintSet {
  constructor() {
    this.constraints = [];
  }

  addConstraint(constraint) {
    this.constraints.push(constraint);
  }

  testAll(value) {
    return this.constraints.every((constraint) => constraint.test(value));
  }

  getErrors() {
    return this.constraints.filter((constraint) => !constraint.isAccepted).map((constraint) => constraint.errorMessage);
  }
}

// Predefined constraint patterns
const ConstraintPatterns = {
  Required: {
    pattern: /\S+/,
    errorMessage: "This field is required",
    helpTitle: "Required Field",
    helpMessage: "This field cannot be empty or contain only whitespace",
  },
  ExactPattern: (pattern) => ({
    pattern: pattern,
    errorMessage: "Input does not match the required pattern",
    helpTitle: "Exact Pattern",
    helpMessage: "Input must exactly match the specified pattern",
  }),
  CaseInsensitivePattern: (pattern) => ({
    pattern: (value) => new RegExp(pattern, "i").test(value.toLowerCase()),
    errorMessage: "Input does not match the required pattern (case insensitive)",
    helpTitle: "Case Insensitive Pattern",
    helpMessage: "Input must match the pattern, ignoring letter case",
  }),
  WhitespaceInsensitivePattern: (pattern) => ({
    pattern: (value) => new RegExp(pattern).test(value.replace(/\s/g, "")),
    errorMessage: "Input does not match the required pattern (whitespace insensitive)",
    helpTitle: "Whitespace Insensitive Pattern",
    helpMessage: "Input must match the pattern, ignoring any whitespace",
  }),
  Type: {
    Integer: {
      pattern: /^-?\d+$/,
      errorMessage: "Input must be an integer",
      helpTitle: "Integer Input",
      helpMessage: "Please enter a whole number (positive or negative)",
    },
    Float: {
      pattern: /^-?\d*\.?\d+$/,
      errorMessage: "Input must be a number",
      helpTitle: "Number Input",
      helpMessage: "Please enter a number (can include decimal points)",
    },
    Date: {
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      errorMessage: "Input must be a date in YYYY-MM-DD format",
      helpTitle: "Date Input",
      helpMessage: "Please enter a date in the format YYYY-MM-DD",
    },
    Email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage: "Input must be a valid email address",
      helpTitle: "Email Input",
      helpMessage: "Please enter a valid email address (e.g., user@example.com)",
    },
  },
  RangeMin: (min) => ({
    pattern: (value) => parseFloat(value) >= min,
    errorMessage: `Value must be greater than or equal to ${min}`,
    helpTitle: "Minimum Value",
    helpMessage: `Please enter a number that is at least ${min}`,
  }),
  RangeMax: (max) => ({
    pattern: (value) => parseFloat(value) <= max,
    errorMessage: `Value must be less than or equal to ${max}`,
    helpTitle: "Maximum Value",
    helpMessage: `Please enter a number that is at most ${max}`,
  }),
};

export { Constraint, ConstraintSet, ConstraintPatterns };
