import { GuidUtils } from "./utilities.js";

export function createMenuBar(parentDiv) {
  const menuBarId = `menu-bar-${GuidUtils.getLocalUniqueID()}`;
  const menuBar = document.createElement("div");
  menuBar.id = menuBarId;
  menuBar.className = "menu-bar";
  parentDiv.appendChild(menuBar);
  return menuBar;
}

export function createButton(menuBar, iconSrc, buttonText) {
  const buttonId = `flex-button-${GuidUtils.getLocalUniqueID()}`;
  const button = document.createElement("button");
  button.id = buttonId;
  button.className = "flex-button";

  const icon = document.createElement("img");
  icon.src = iconSrc;
  icon.className = "button-icon";
  button.appendChild(icon);

  const textSpan = document.createElement("span");
  textSpan.className = "button-text";
  textSpan.textContent = buttonText;
  button.appendChild(textSpan);

  menuBar.appendChild(button);
  return button;
}

export function initializeButtons() {
  const buttons = document.querySelectorAll(".flex-button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      alert(`Button ${index + 1} clicked!`);
    });
  });
}

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
