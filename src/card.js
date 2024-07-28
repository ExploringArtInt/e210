import { fsmPattern } from "./patterns.js";
import { GuidUtils } from "./utilities.js";
import { createButton, createMenuBar, createForm, createInputCheckbox, createInputPassword, createInputRadioButton, createInputText } from "./gui.js";

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
  constructor(parentDiv, options = {}) {
    this.parentDiv = parentDiv;
    this.cardId = `card-${GuidUtils.getLocalUniqueID()}`;

    // Define default values
    const defaults = {
      styleCSS: "",
    };

    // Merge provided options with defaults
    const config = { ...defaults, ...options };

    // Assign merged config to instance properties
    Object.assign(this, config);

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
    card.style = this.styleCSS;

    // Create the card content
    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    cardContent.innerHTML = `
      <h2>Card Title</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>`;
    /*
    cardContent.innerHTML = `
      <h2>Card Title</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend ex gravida velit vulputate auctor. Sed vitae vehicula mi. Cras ut lorem a ex laoreet tristique. Phasellus justo dolor, dignissim ac dictum vitae, accumsan eget orci. Integer imperdiet tristique tortor at scelerisque. Sed tincidunt tincidunt dui, vitae pharetra lacus gravida id. Nam eget risus turpis. Ut a pretium mi, ut tincidunt ipsum. Nullam vehicula pulvinar urna et ultricies.</p>
    `;
*/

    // Create the form
    const form = createForm(card);
    const inputCheckbox = createInputCheckbox(form);
    const inputPassword = createInputPassword(form);
    const inputRadioButton = createInputRadioButton(form);
    const inputText = createInputText(form);

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
    this.element.classList.add("hidden");
  }

  onExitHidden() {
    this.element.classList.remove("hidden");
  }

  onEnterNormal() {
    this.element.classList.add("normal");
  }

  onExitNormal() {
    this.element.classList.remove("normal");
  }

  onEnterModal() {
    this.element.classList.add("modal");
  }

  onExitModal() {
    this.element.classList.remove("modal");
  }

  onDisplayCard() {
    // Logic for displaying card
  }

  onHideCard() {
    // Logic for hiding card
  }

  onOpenModal() {
    // Logic for opening modal
  }

  onCloseModal() {
    // Logic for closing modal
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

export function createCard(parentDiv, options = {}) {
  const card = new Card(parentDiv, options);

  // Add event listeners
  const hideButton = card.element.querySelector(".gui-button:nth-child(1)");
  const openButton = card.element.querySelector(".gui-button:nth-child(2)");

  hideButton.addEventListener("click", () => card.hide());
  openButton.addEventListener("click", () => card.openModal());

  // Initially display the card
  card.display();

  return card;
}
