// constrain.js

/***
Uses the Composite design pattern with three components, forming a tree-like structure:
  - base (root) component
  - leaf components are the end objects (no children). They represent a single, indivisible constraint.
  - composite (branch) can contain other constraints (both simple and composite)
***/

// base (root) component: interface for all elements in composition
class ConstraintComponent {
  constructor(options = {}) {
    const defaults = {
      isAccepted: false,
      testOnKeyUp: false,
      pattern: "",
      errorMessage: "Input does not meet the required format",
      helpTitle: "Input Help",
      helpMessage: "Please enter a valid input",
    };
    const mergedOptions = { ...defaults, ...options };
    Object.assign(this, mergedOptions);
  }

  test(value) {
    throw new Error("test method must be implemented by subclasses");
  }

  testAll(value) {
    return this.test(value);
  }

  getErrors() {
    return this.isAccepted ? [] : [this.errorMessage];
  }
}

// Leaf component
class SimpleConstraint extends ConstraintComponent {
  constructor(options = {}) {
    super(options);
    this.pattern = options.pattern || "";
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

// Composite (branch) component
class CompositeConstraint extends ConstraintComponent {
  constructor(options = {}) {
    super(options);
    this.constraints = [];
  }

  addConstraint(constraint) {
    this.constraints.push(constraint);
  }

  test(value) {
    this.isAccepted = this.constraints.every((constraint) => constraint.test(value));
    return this.isAccepted;
  }

  testAll(value) {
    return this.constraints.every((constraint) => constraint.testAll(value));
  }

  getErrors() {
    const errors = this.constraints.flatMap((constraint) => constraint.getErrors());
    return errors.length > 0 ? errors : super.getErrors();
  }
}

// Factory function to create constraints
function createConstraint(options) {
  if (options.constraints) {
    return new CompositeConstraint(options);
  } else {
    return new SimpleConstraint(options);
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

export { createConstraint, CompositeConstraint, ConstraintPatterns };
