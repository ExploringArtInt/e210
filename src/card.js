import { fsmPattern } from "./patterns.js";
import { GuidUtils } from "./utilities.js";

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
    this.element = this.createCardElement();

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

  createCardElement() {
    const card = document.createElement("div");
    card.id = this.cardId;
    card.className = "card hidden";
    card.innerHTML = `
      <h2>Card Title</h2>
      <p>Card content goes here.</p>
      <button class="hide-btn">Hide</button>
      <button class="modal-btn">Open Modal</button>
    `;
    this.parentDiv.appendChild(card);
    return card;
  }

  onEnterHidden() {
    console.log("Entering Hidden state");
    this.element.classList.add("hidden");
  }

  onExitHidden() {
    console.log("Exiting Hidden state");
    this.element.classList.remove("hidden");
  }

  onEnterNormal() {
    console.log("Entering Normal state");
    this.element.classList.add("normal");
  }

  onExitNormal() {
    console.log("Exiting Normal state");
    this.element.classList.remove("normal");
  }

  onEnterModal() {
    console.log("Entering Modal state");
    this.element.classList.add("modal");
  }

  onExitModal() {
    console.log("Exiting Modal state");
    this.element.classList.remove("modal");
  }

  onDisplayCard() {
    console.log("Displaying card");
  }

  onHideCard() {
    console.log("Hiding card");
  }

  onOpenModal() {
    console.log("Opening modal");
  }

  onCloseModal() {
    console.log("Closing modal");
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
  card.element.querySelector(".hide-btn").addEventListener("click", () => card.hide());
  card.element.querySelector(".modal-btn").addEventListener("click", () => card.openModal());

  // Initially display the card
  card.display();

  return card;
}
