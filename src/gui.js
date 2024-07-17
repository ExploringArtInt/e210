import { GuidUtils } from "./utilities.js";

export function addMenuBar(parentDiv) {
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

export function createButtonSet() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("App container not found");
    return;
  }

  const menuBar = addMenuBar(app);

  createButton(menuBar, "./assets/svg/gui-white/hamburger-menu.svg", "Lorem ipsum dolor");
  createButton(
    menuBar,
    "./assets/svg/gui-white/save-arrow.svg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida neque blandit rhoncus porttitor. Sed et tincidunt risus.",
  );
  createButton(
    menuBar,
    "./assets/svg/gui-white/round-knob.svg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida neque blandit rhoncus porttitor. Sed et tincidunt risus. Sed vitae arcu eu neque congue iaculis. Nunc tortor magna, vulputate eget erat vel, sagittis consequat nisi. Donec eu quam vitae tellus venenatis rutrum eget eget nibh. Suspendisse potenti. Morbi ut ligula efficitur, consectetur diam et, malesuada leo. Donec id vestibulum mauris, sit amet pharetra nisi. In magna enim, tincidunt id nisl tincidunt, volutpat sodales tellus. Suspendisse vel dolor ipsum. Sed efficitur, tortor ac tristique varius, elit massa cursus lectus, quis lacinia neque risus ut nulla. Aliquam erat volutpat. Vivamus et tellus at mauris tincidunt convallis.",
  );
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
