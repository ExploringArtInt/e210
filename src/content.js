import { createStep } from "./step.js";
import { createEntityInput } from "./entityInput.js";
import { createConstraint, ConstraintPatterns } from "./constraint.js";

import { Card, createCard } from "./card.js";
import { createButton } from "./gui.js";

export function createContent() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("App container not found");
    return;
  }

  // step
  const firstStep = createStep(app);

  const entityInput = createEntityInput(firstStep, {
    type: "text",
    label: "Username",
    placeholder: "Enter your username",
  });

  // Create a composite constraint
  const emailConstraint = createConstraint({
    constraints: [createConstraint(ConstraintPatterns.Required), createConstraint(ConstraintPatterns.Type.Email)],
    errorMessage: "Please enter a valid email address",
    helpTitle: "Email Input",
    helpMessage: "Enter a valid email address (e.g., user@example.com)",
  });

  // Create a complex composite constraint
  const formConstraint = createConstraint({
    constraints: [
      {
        constraints: [ConstraintPatterns.Required, ConstraintPatterns.Type.Email],
        errorMessage: "Invalid email",
      },
      {
        constraints: [ConstraintPatterns.Required, ConstraintPatterns.ExactPattern(/^[a-zA-Z0-9_]{3,20}$/)],
        errorMessage: "Invalid username",
      },
      ConstraintPatterns.Type.Integer,
    ],
    errorMessage: "Form validation failed",
  });

  // card 1
  const nvpCard1 = {
    styleCSS: "border-radius: 15px;",
  };

  console.groupCollapsed("Card");
  console.table(nvpCard1);
  console.groupEnd("Card");

  const card1 = new Card(app, nvpCard1);
}
