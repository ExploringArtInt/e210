import { fsmPattern } from "./patterns.js";
import { GuidUtils } from "./utilities.js";
import { createMenuBar, createButton } from "./gui.js";

/***

Card State Transition Table

|  State  | Event      | Next State | Actions
|---------|------------|------------|--------
| Start   | Create     | Hidden     | onCreateCard
| Hidden  | Display    | Normal     | onDisplayCard
| Hidden  | OpenModal  | Modal      | onOpenModal
| Normal  | Hide       | Hidden     | onHideCard
| Modal   | CloseModal | Hidden     | onCloseModal
| Removed | Delete     | (none)     | onDeleteCard

State Action Table

| State   | Enter Action   | Exit Action   | Is Final State
|---------|----------------|---------------|---------------
| Start   | onEnterStart   | onExitStart   | No
| Hidden  | onEnterHidden  | onExitHidden  | No
| Normal  | onEnterNormal  | onExitNormal  | No
| Modal   | onEnterModal   | onExitModal   | No
| Removed | onEnterRemoved | onExitRemoved | Yes

***/

export class Card {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
    this.cardId = `card-${GuidUtils.getLocalUniqueID()}`;
    this.element = this.createCardElement(parentDiv);

    this.fsm = fsmPattern.createMachine("Hidden", {
      Hidden: {
        enter: this.onEnterHidden.bind(this),
        exit: this.onExitHidden.bind(this),
        Display: {
          target: "Normal",
          actions: this.onDisplayCard.bind(this),
        },
        OpenModal: {
          target: "Modal",
          actions: this.onOpenModal.bind(this),
        },
      },
      Normal: {
        enter: this.onEnterNormal.bind(this),
        exit: this.onExitNormal.bind(this),
        Hide: {
          target: "Hidden",
          actions: this.onHideCard.bind(this),
        },
      },
      Modal: {
        enter: this.onEnterModal.bind(this),
        exit: this.onExitModal.bind(this),
        CloseModal: {
          target: "Hidden",
          actions: this.onCloseModal.bind(this),
        },
        isFinal: true,
      },
    });
  }

  createCardElement(parentDiv) {
    if (!parentDiv) {
      console.error("parent container not found");
      return;
    }

    const card = document.createElement("div");
    card.id = this.cardId;
    card.className = "card hidden";

    // Create the card content
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    cardContent.innerHTML = `
      <h2>Card Title</h2>
      <p>Card content goes here.</p>
    `;

    // Create the menu bar
    const menuBar = createMenuBar(card);
    createButton(menuBar, "./assets/svg/gui-white/hamburger-menu.svg", "Hide");
    createButton(menuBar, "./assets/svg/gui-white/save-arrow.svg", "Open");

    // Append the menu bar and card content to the card
    card.appendChild(cardContent);
    card.appendChild(menuBar);

    // Append the card to the parent div
    parentDiv.appendChild(card);

    return card;
  }

  onEnterHidden() {
    // console.log("Entering Hidden state");
    this.element.classList.add("hidden");
  }

  onExitHidden() {
    // console.log("Exiting Hidden state");
    this.element.classList.remove("hidden");
  }

  onEnterNormal() {
    // console.log("Entering Normal state");
    this.element.classList.add("normal");
  }

  onExitNormal() {
    // console.log("Exiting Normal state");
    this.element.classList.remove("normal");
  }

  onEnterModal() {
    // console.log("Entering Modal state");
    this.element.classList.add("modal");
  }

  onExitModal() {
    // console.log("Exiting Modal state");
    this.element.classList.remove("modal");
  }

  onDisplayCard() {
    // console.log("Displaying card");
  }

  onHideCard() {
    // console.log("Hiding card");
  }

  onOpenModal() {
    // console.log("Opening modal");
  }

  onCloseModal() {
    // console.log("Closing modal");
  }

  display() {
    this.fsm.transition("Display");
  }

  hide() {
    this.fsm.transition("Hide");
  }

  openModal() {
    this.fsm.transition("OpenModal");
  }

  closeModal() {
    this.fsm.transition("CloseModal");
  }
}

export function createCard(parentDiv) {
  const card = new Card(parentDiv);

  // Add event listeners
  const hideButton = card.element.querySelector(".flex-button:nth-child(1)");
  const openButton = card.element.querySelector(".flex-button:nth-child(2)");

  hideButton.addEventListener("click", () => card.hide());
  openButton.addEventListener("click", () => card.openModal());

  // Initially display the card
  card.display();

  return card;
}
