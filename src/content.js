import { Card, createCard } from "./card.js";
import { createMenuBar, createButton } from "./gui.js";

export function createContent() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("App container not found");
    return;
  }

  // card 1
  const nvpCard1 = {
    styleCSS: "border-radius: 0px;",
  };

  console.groupCollapsed("Card");
  console.table(nvpCard1);
  console.groupEnd("Card");

  const card1 = new Card(app, nvpCard1);

  /*
  // card 2
  const nvpCard2 = {
    styleCSS: "border-radius: 10px;",
  };

  console.groupCollapsed("Card");
  console.table(nvpCard2);
  console.groupEnd("Card");

  const card2 = new Card(app, nvpCard2);

  // card 3
  const nvpCard3 = {
    styleCSS: "border-radius: 20px;",
  };

  console.groupCollapsed("Card");
  console.table(nvpCard3);
  console.groupEnd("Card");

  const card3 = new Card(app, nvpCard3);

  */
}
