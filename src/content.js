import { Card, createCard } from "./card.js";
import { createMenuBar, createButton } from "./gui.js";

export function createContent() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("App container not found");
    return;
  }

  const nvpCard = {
    cardPaddingTop: 10,
    cardMarginRight: 15,
    zIndex: 100,
    flexGrow: 1,
  };

  console.groupCollapsed("Card");
  console.table(nvpCard);
  console.groupEnd("Card");

  const card = new Card(app, nvpCard);
}
