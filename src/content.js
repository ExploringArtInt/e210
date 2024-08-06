import { createStep } from "./step.js";
import { createEntityInput } from "./entityInput.js";

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

  // card 1
  const nvpCard1 = {
    styleCSS: "border-radius: 15px;",
  };

  console.groupCollapsed("Card");
  console.table(nvpCard1);
  console.groupEnd("Card");

  const card1 = new Card(app, nvpCard1);
}
