import { GuidUtils } from "./utilities.js";

// GUI Button
export function createButton(menuBar, iconSrc, buttonText) {
  const buttonId = `gui-button-${GuidUtils.getLocalUniqueID()}`;
  const button = document.createElement("button");
  button.id = buttonId;
  button.className = "gui-button";

  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.className = "gui-button-icon";
  button.appendChild(icon);

  const textSpan = document.createElement("span");
  textSpan.className = "gui-button-text";
  textSpan.textContent = buttonText;
  button.appendChild(textSpan);

  menuBar.appendChild(button);
  return button;
}

// TBD: pass in scope (app, card#, button#)
export function initializeButtons() {
  // TBD: scope to only initializeButton for scope passed in
  const buttons = document.querySelectorAll(".gui-button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      alert(`Button ${index + 1} clicked!`);
    });
  });
}

// GUI createForm
export function createForm(parentDiv) {
  const createFormId = `gui-form-${GuidUtils.getLocalUniqueID()}`;
  const form = document.createElement("form");
  form.id = createFormId;
  form.className = "gui-form";
  parentDiv.appendChild(form);
  return form;
}

// GUI createInputCheckbox
export function createInputCheckbox(form, labelText, isChecked, isLabelFirst) {
  const createInputCheckboxId = `gui-input-checkbox-${GuidUtils.getLocalUniqueID()}`;
  const inputCheckbox = document.createElement("input");
  inputCheckbox.id = createInputCheckboxId;
  inputCheckbox.className = "gui-input-checkbox";
  inputCheckbox.type = "checkbox";
  inputCheckbox.checked = isChecked;

  const labelCheckbox = document.createElement("label");
  labelCheckbox.id = createInputCheckboxId;
  labelCheckbox.className = "gui-input-checkbox-label";
  labelCheckbox.for = inputCheckbox.id;
  labelCheckbox.innerHTML = labelText;

  if (isLabelFirst) {
    form.appendChild(labelCheckbox);
    form.appendChild(inputCheckbox);
  } else {
    form.appendChild(inputCheckbox);
    form.appendChild(labelCheckbox);
  }
  return inputCheckbox;
}

// GUI createInputPassword
export function createInputPassword(form) {
  const createInputPasswordId = `gui-input-password-${GuidUtils.getLocalUniqueID()}`;
  const inputPassword = document.createElement("div"); // TBD
  inputPassword.id = createInputPasswordId;
  inputPassword.className = "gui-input-password";
  form.appendChild(inputPassword);
  return inputPassword;
}

// GUI createInputRadioButton
export function createInputRadioButton(form) {
  const createInputRadioButtonId = `gui-input-radio-button-${GuidUtils.getLocalUniqueID()}`;
  const inputRadioButton = document.createElement("div"); // TBD
  inputRadioButton.id = createInputRadioButtonId;
  inputRadioButton.className = "gui-input-radio-button";
  form.appendChild(inputRadioButton);
  return inputRadioButton;
}

// GUI createInputText
export function createInputText(form) {
  const createInputTextId = `gui-input-text-id-${GuidUtils.getLocalUniqueID()}`;
  const inputTextId = document.createElement("div"); // TBD
  inputTextId.id = createInputTextId;
  inputTextId.className = "gui-input-text-id";
  form.appendChild(inputTextId);
  return inputTextId;
}

// GUI Menu
export function createMenuBar(parentDiv) {
  const menuBarId = `gui-menu-bar-${GuidUtils.getLocalUniqueID()}`;
  const menuBar = document.createElement("div");
  menuBar.id = menuBarId;
  menuBar.className = "gui-menu-bar";
  parentDiv.appendChild(menuBar);
  return menuBar;
}

// GUI Spinner
let spinnerInterval;

export function createSpinner() {
  const spinner = document.getElementById("spinner");
  if (!spinner) {
    console.error("Spinner container not found");
    return;
  }

  const spinnerId = `spinner-${GuidUtils.getLocalUniqueID()}`;

  spinner.innerHTML = `
    <div id="${spinnerId}" class="spinner">
      <img src="assets/svg/gui-black/cycle.svg" alt="Loading spinner">
    </div>
  `;

  const spinnerElement = document.getElementById(spinnerId);
  let rotation = 0;

  spinnerInterval = setInterval(() => {
    rotation -= 360;
    spinnerElement.style.transform = `rotate(${rotation}deg)`;
  }, 1000);
}

export function deleteSpinner() {
  const spinner = document.getElementById("spinner");
  if (spinner) {
    spinner.innerHTML = "";
  }

  if (spinnerInterval) {
    clearInterval(spinnerInterval);
    spinnerInterval = null;
  }
}

/* Template code for creating GUI elements
// GUI TBD
export function createTBD(parentDiv) {
  const TBDId = `gui-TBD-${GuidUtils.getLocalUniqueID()}`;
  const TBD = document.createElement("div");
  TBD.id = TBDId;
  TBD.className = "gui-TBD";
  parentDiv.appendChild(TBD);
  return TBD;
}
*/
