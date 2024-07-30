import { GuidUtils } from "./utilities.js";

// GUI Button
export function createButton(parentElement, iconSrc, buttonText) {
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

  parentElement.appendChild(button);
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

// GUI Divider
export function createDivider(parentElement, styleCSS) {
  const dividerId = `gui-divider-${GuidUtils.getLocalUniqueID()}`;
  const divider = document.createElement("div");
  divider.id = dividerId;
  divider.className = "gui-divider";
  divider.style = styleCSS;
  parentElement.appendChild(divider);
  return divider;
}

// GUI createForm
export function createForm(parentElement) {
  const createFormId = `gui-form-${GuidUtils.getLocalUniqueID()}`;
  const form = document.createElement("form");
  form.id = createFormId;
  form.className = "gui-form";
  parentElement.appendChild(form);
  return form;
}

// GUI createInputCheckbox
export function createInputCheckbox(parentElement, labelText, isChecked, isLabelFirst) {
  const createInputCheckboxId = `gui-input-checkbox-${GuidUtils.getLocalUniqueID()}`;
  const inputCheckbox = document.createElement("input");
  inputCheckbox.id = createInputCheckboxId;
  inputCheckbox.className = "gui-input-checkbox";
  inputCheckbox.type = "checkbox";
  inputCheckbox.checked = isChecked;

  const labelCheckbox = document.createElement("label");
  labelCheckbox.id = inputCheckbox.id;
  labelCheckbox.className = "gui-input-checkbox-label";
  labelCheckbox.for = inputCheckbox.id;
  labelCheckbox.innerHTML = labelText;

  const itemCheckbox = document.createElement("div");
  itemCheckbox.id = inputCheckbox.id;
  itemCheckbox.className = "gui-input-checkbox-item";
  parentElement.appendChild(itemCheckbox);

  if (isLabelFirst) {
    itemCheckbox.appendChild(labelCheckbox);
    itemCheckbox.appendChild(inputCheckbox);
  } else {
    itemCheckbox.appendChild(inputCheckbox);
    itemCheckbox.appendChild(labelCheckbox);
  }
  return itemCheckbox;
}

// GUI createInputPassword
export function createInputPassword(parentElement) {
  const createInputPasswordId = `gui-input-password-${GuidUtils.getLocalUniqueID()}`;
  const inputPassword = document.createElement("div"); // TBD
  inputPassword.id = createInputPasswordId;
  inputPassword.className = "gui-input-password";
  parentElement.appendChild(inputPassword);
  return inputPassword;
}

// GUI createInputRadioButton
export function createInputRadioButton(parentElement, radioGroupName, labelText, isChecked, isLabelFirst) {
  console.debug("DEBUG 1");
  const createInputRadioButtonId = `gui-input-radio-button-${GuidUtils.getLocalUniqueID()}`;
  const inputRadioButton = document.createElement("input");
  inputRadioButton.id = createInputRadioButtonId;
  inputRadioButton.className = "gui-input-radio-button";
  inputRadioButton.name = radioGroupName;
  inputRadioButton.type = "radio";
  inputRadioButton.checked = isChecked;

  const labelRadio = document.createElement("label");
  labelRadio.id = inputRadioButton.id;
  labelRadio.className = "gui-input-radio-label";
  labelRadio.for = inputRadioButton.id;
  labelRadio.innerHTML = labelText;

  const itemRadio = document.createElement("div");
  itemRadio.id = inputRadioButton.id;
  itemRadio.className = "gui-input-checkbox-item";
  parentElement.appendChild(itemRadio);

  if (isLabelFirst) {
    itemRadio.appendChild(labelRadio);
    itemRadio.appendChild(inputRadioButton);
  } else {
    itemRadio.appendChild(inputRadioButton);
    itemRadio.appendChild(labelRadio);
  }

  return itemRadio;
}

// GUI createInputText
export function createInputText(parentElement) {
  const createInputTextId = `gui-input-text-id-${GuidUtils.getLocalUniqueID()}`;
  const inputTextId = document.createElement("div"); // TBD
  inputTextId.id = createInputTextId;
  inputTextId.className = "gui-input-text-id";
  parentElement.appendChild(inputTextId);
  return inputTextId;
}

// GUI Menu
export function createMenuBar(parentElement) {
  const menuBarId = `gui-menu-bar-${GuidUtils.getLocalUniqueID()}`;
  const menuBar = document.createElement("div");
  menuBar.id = menuBarId;
  menuBar.className = "gui-menu-bar";
  parentElement.appendChild(menuBar);
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
export function createTBD(parentElement) {
  const TBDId = `gui-TBD-${GuidUtils.getLocalUniqueID()}`;
  const TBD = document.createElement("div");
  TBD.id = TBDId;
  TBD.className = "gui-TBD";
  parentElement.appendChild(TBD);
  return TBD;
}
*/
