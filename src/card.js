import { fsmPattern } from "./patterns.js";
import { GuidUtils } from "./utilities.js";
import { createButton, createElement, createDivider, createForm, createInputCheckbox, createInputRadioButton, createInputText } from "./gui.js";

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
  constructor(parentElement, options = {}) {
    const defaults = {
      styleCSS: "",
    };
    const mergedOptions = { ...defaults, ...options };
    Object.assign(this, mergedOptions);

    this.parentElement = parentElement;
    this.cardId = `card-${GuidUtils.getLocalUniqueID()}`;

    this.element = this.createCardElement(parentElement);

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

  createCardElement(parentElement) {
    if (!parentElement) {
      console.error("parent container not found");
      return;
    }

    const card = document.createElement("div");
    card.id = this.cardId;
    card.className = "card hidden";
    card.style = this.styleCSS;

    // Content title
    const divider1 = createDivider(card, { styleClass: null, styleCSS: "margin-top: 1.5em; margin-bottom: 0px;" });

    const elementHTML1 = `<h2>Card Title</h2>`;

    const element1 = createElement(divider1, { elementHTML: elementHTML1, styleClass: null, styleCSS: "width: 100%;" });

    // Content text
    const divider2 = createDivider(card, { styleClass: null, styleCSS: "text-align: left;" });

    // Create the card element
    const elementHTML2 = `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p>`;
    /*
  const elementHTML2 = `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eleifend ex gravida velit vulputate auctor. Sed vitae vehicula mi. Cras ut lorem a ex laoreet tristique. Phasellus justo dolor, dignissim ac dictum vitae, accumsan eget orci. Integer imperdiet tristique tortor at scelerisque. Sed tincidunt tincidunt dui, vitae pharetra lacus gravida id. Nam eget risus turpis. Ut a pretium mi, ut tincidunt ipsum. Nullam vehicula pulvinar urna et ultricies.</p>
  `;
*/

    const element2 = createElement(divider2, { elementHTML: elementHTML2, styleClass: null, styleCSS: null });

    // Create the form
    const form = createForm(card);

    const divider3 = createDivider(form, { styleClass: "row", styleCSS: null });

    const inputCheckbox1 = createInputCheckbox(divider3, { labelText: "Check 1", isChecked: true, isLabelFirst: false });

    const inputCheckbox2 = createInputCheckbox(divider3, { labelText: "Check 200" });

    const inputCheckbox3 = createInputCheckbox(divider3, { labelText: "Check 30000" });

    const divider4 = createDivider(form, { styleClass: "row", styleCSS: null });

    const inputRadioButton1 = createInputRadioButton(divider4, { radioGroupName: "RadioGroup1", labelText: "Radio 1", isLabelFirst: false });
    const inputRadioButton2 = createInputRadioButton(divider4, { radioGroupName: "RadioGroup1", labelText: "Radio 200" });
    const inputRadioButton3 = createInputRadioButton(divider4, { radioGroupName: "RadioGroup1", labelText: "Radio 30000" });

    const divider5 = createDivider(form, { styleClass: "row", styleCSS: null });

    // text goes here
    createInputText(divider5, {
      label: "Username",
      placeholder: "Enter your username",
      required: true,
      pattern: "^[a-zA-Z0-9_]{3,20}$",
      errorMessage: "Username must be 3-20 characters and can only contain letters, numbers, and underscores",
      minLength: 3,
      maxLength: 20,
    });

    // Create the menu bar
    const menuBar = createDivider(card, {
      styleClass: "menu-bar",
    });

    const button1 = createButton(menuBar, {
      iconSrc: "./assets/svg/gui-white/hamburger-menu.svg",
      label: "Hide",
    });
    const button2 = createButton(menuBar, {
      iconSrc: "./assets/svg/gui-white/save-arrow.svg",
      label: "Open",
    });
    const button3 = createButton(menuBar, {
      iconSrc: "./assets/svg/gui-white/help.svg",
      label: null,
      styleClass: "circle-button",
    });

    card.appendChild(menuBar);

    // Append the card to the parent div
    parentElement.appendChild(card);

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

export function createCard(parentElement, options = {}) {
  const card = new Card(parentElement, options);

  // Add event listeners
  const hideButton = card.element.querySelector(".gui-button:nth-child(1)");
  const openButton = card.element.querySelector(".gui-button:nth-child(2)");

  hideButton.addEventListener("click", () => card.hide());
  openButton.addEventListener("click", () => card.openModal());

  // Initially display the card
  card.display();

  return card;
}
