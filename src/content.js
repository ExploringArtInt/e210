import { createStep } from "./step.js";
import { createEntityInput } from "./entityInput.js";
import { Constraint, ConstraintSet, ConstraintPatterns } from "./constraint.js";

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

  // Create a constraint set for an entity input
  const constraintSet = new ConstraintSet();

  // Add constraints
  constraintSet.addConstraint(new Constraint(ConstraintPatterns.Required));
  constraintSet.addConstraint(new Constraint(ConstraintPatterns.Type.Email));

  // Test input
  const isValid = constraintSet.testAll("user@example.com");

  // Get errors if any
  const errors = constraintSet.getErrors();

  // card 1
  const nvpCard1 = {
    styleCSS: "border-radius: 15px;",
  };

  console.groupCollapsed("Card");
  console.table(nvpCard1);
  console.groupEnd("Card");

  const card1 = new Card(app, nvpCard1);
}
