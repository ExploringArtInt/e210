import { GuidUtils } from "./utilities.js";

// GUI Button
export function createButton(parentElement, options = {}) {
  const { iconSrc = null, label = null, isLabelFirst = false, styleClass = null, styleCSS = null } = options;

  const buttonId = `gui-button-${GuidUtils.getLocalUniqueID()}`;
  const button = document.createElement("button");
  button.id = buttonId;

  if (styleClass != null) {
    button.className = "gui-button " + styleClass;
  } else {
    button.className = "gui-button";
  }
  if (styleCSS != null) {
    button.style = styleCSS;
  }

  if (iconSrc != null && isLabelFirst != null && isLabelFirst != true) {
    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.className = "gui-button-icon";
    button.appendChild(icon);
  }

  if (label != null) {
    const textSpan = document.createElement("span");
    textSpan.className = "gui-button-text";
    textSpan.textContent = label;
    button.appendChild(textSpan);
  }

  if (iconSrc != null && isLabelFirst == true) {
    const icon = document.createElement("img");
    icon.src = iconSrc;
    icon.className = "gui-button-icon";
    button.appendChild(icon);
  }

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

// GUI Content
export function createContent(parentElement, options = {}) {
  const { contentHTML = null, styleClass = null, styleCSS = null } = options;

  const contentId = `gui-content-${GuidUtils.getLocalUniqueID()}`;
  const content = document.createElement("div");
  content.id = contentId;
  if (styleClass != null) {
    content.className = "gui-content " + styleClass;
  } else {
    content.className = "gui-content";
  }
  if (styleCSS != null) {
    content.style = styleCSS;
  }

  if (contentHTML != null) {
    content.innerHTML = contentHTML;
  }
  parentElement.appendChild(content);
  return content;
}

// GUI Divider
export function createDivider(parentElement, options = {}) {
  const { styleClass = null, styleCSS = null } = options;

  const dividerId = `gui-divider-${GuidUtils.getLocalUniqueID()}`;
  const divider = document.createElement("div");
  divider.id = dividerId;

  if (styleClass != null) {
    divider.className = "gui-divider " + styleClass;
  } else {
    divider.className = "gui-divider";
  }
  if (styleCSS != null) {
    divider.style = styleCSS;
  }
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
export function createInputCheckbox(parentElement, options = {}) {
  const { labelText = null, isChecked = false, isLabelFirst = false } = options;

  const { iconSrc = null, label = null } = options;
  const createInputCheckboxId = `gui-input-checkbox-${GuidUtils.getLocalUniqueID()}`;

  const inputCheckbox = document.createElement("input");
  inputCheckbox.id = createInputCheckboxId;
  inputCheckbox.className = "gui-input-checkbox";
  inputCheckbox.type = "checkbox";
  inputCheckbox.checked = isChecked;

  const labelCheckbox = document.createElement("label");
  labelCheckbox.className = "gui-input-checkbox-label";
  labelCheckbox.htmlFor = inputCheckbox.id;

  const itemCheckbox = document.createElement("div");
  itemCheckbox.className = "gui-input-checkbox-item";

  if (labelText == null) {
    labelCheckbox.appendChild(inputCheckbox);
  } else if (isLabelFirst) {
    labelCheckbox.appendChild(document.createTextNode(labelText));
    labelCheckbox.appendChild(inputCheckbox);
  } else {
    labelCheckbox.appendChild(inputCheckbox);
    labelCheckbox.appendChild(document.createTextNode(labelText));
  }

  itemCheckbox.appendChild(labelCheckbox);
  parentElement.appendChild(itemCheckbox);

  return itemCheckbox;
}

// GUI createInputPassword
export function createInputPassword(parentElement) {
  const createInputPasswordId = `gui-input-password-${GuidUtils.getLocalUniqueID()}`;
  const inputPassword = document.createElement("div"); // TBD
  inputPassword.id = createInputPasswordId;
  inputPassword.className = "gui-input-password";
  inputPassword.type = "password";
  parentElement.appendChild(inputPassword);
  return inputPassword;
}

// GUI createInputRadioButton
export function createInputRadioButton(parentElement, options = {}) {
  const { radioGroupName = "NOT_SET", labelText = null, isChecked = false, isLabelFirst = false } = options;

  const createInputRadioButtonId = `gui-input-radio-button-${GuidUtils.getLocalUniqueID()}`;

  const inputRadioButton = document.createElement("input");
  inputRadioButton.id = createInputRadioButtonId;
  inputRadioButton.className = "gui-input-radio-button";
  inputRadioButton.name = radioGroupName;
  inputRadioButton.type = "radio";
  inputRadioButton.checked = isChecked;

  const labelRadio = document.createElement("label");
  labelRadio.className = "gui-input-radio-label";
  labelRadio.htmlFor = createInputRadioButtonId;

  const itemRadio = document.createElement("div");
  itemRadio.className = "gui-input-radio-item";

  if (labelText == null) {
    labelRadio.appendChild(inputRadioButton);
  } else if (isLabelFirst) {
    labelRadio.appendChild(document.createTextNode(labelText));
    labelRadio.appendChild(inputRadioButton);
  } else {
    labelRadio.appendChild(inputRadioButton);
    labelRadio.appendChild(document.createTextNode(labelText));
  }

  itemRadio.appendChild(labelRadio);
  parentElement.appendChild(itemRadio);

  return itemRadio;
}

// GUI createInputText
export function createInputText(parentElement, options = {}) {
  const { label = "Text Input", placeholder = "Enter text", required = false, pattern = null, errorMessage = "Invalid input", minLength = null, maxLength = null } = options;

  const createInputTextId = `gui-input-text-${GuidUtils.getLocalUniqueID()}`;
  const createInputTextErrorId = `${createInputTextId}-error`;

  const wrapper = document.createElement("div");
  wrapper.className = "gui-input-text-wrapper";

  const labelElement = document.createElement("label");
  labelElement.htmlFor = createInputTextId;
  labelElement.className = "gui-input-text-label";
  labelElement.textContent = label;
  if (required) {
    const requiredSpan = document.createElement("span");
    requiredSpan.className = "gui-input-required";
    requiredSpan.setAttribute("aria-hidden", "true");
    labelElement.appendChild(requiredSpan);
  }

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.id = createInputTextId;
  inputText.className = "gui-input-text";
  inputText.placeholder = placeholder;
  inputText.required = required;
  if (pattern) inputText.pattern = pattern;
  if (minLength !== null) inputText.minLength = minLength;
  if (maxLength !== null) inputText.maxLength = maxLength;

  const errorElement = document.createElement("div");
  errorElement.id = createInputTextErrorId;
  errorElement.className = "gui-input-text-error";
  errorElement.setAttribute("aria-live", "polite");
  errorElement.hidden = true;

  wrapper.appendChild(labelElement);
  wrapper.appendChild(inputText);
  wrapper.appendChild(errorElement);

  const validateInput = () => {
    let isValid = true;
    let validationMessage = "";

    if (required && inputText.value.trim() === "") {
      isValid = false;
      validationMessage = "This field is required";
    } else if (pattern && !new RegExp(pattern).test(inputText.value)) {
      isValid = false;
      validationMessage = errorMessage;
    } else if (minLength !== null && inputText.value.length < minLength) {
      isValid = false;
      validationMessage = `Minimum length is ${minLength} characters`;
    } else if (maxLength !== null && inputText.value.length > maxLength) {
      isValid = false;
      validationMessage = `Maximum length is ${maxLength} characters`;
    }

    if (!isValid) {
      inputText.setAttribute("aria-invalid", "true");
      inputText.setAttribute("aria-describedby", createInputTextErrorId);
      errorElement.textContent = validationMessage;
      errorElement.hidden = false;
    } else {
      inputText.removeAttribute("aria-invalid");
      inputText.removeAttribute("aria-describedby");
      errorElement.hidden = true;
    }
  };

  inputText.addEventListener("input", validateInput);
  inputText.addEventListener("blur", validateInput);

  parentElement.appendChild(wrapper);
  return wrapper;
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
export function createTBD(parentElement, options = {}) {
  const { optionTBD = null } = options;

  const TBDId = `gui-TBD-${GuidUtils.getLocalUniqueID()}`;
  const TBD = document.createElement("div");
  TBD.id = TBDId;
  TBD.className = "gui-TBD";
  TBD.type = "TBD";
  parentElement.appendChild(TBD);
  return TBD;
}
*/
