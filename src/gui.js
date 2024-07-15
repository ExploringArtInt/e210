import { GuidUtils } from "./utilities.js";

export function addMenuBar(parentDiv) {
  const menuBarId = `menu-bar-${GuidUtils.getLocalUniqueID()}`;
  const menuBar = document.createElement("div");
  menuBar.id = menuBarId;
  menuBar.className = "menu-bar";
  parentDiv.appendChild(menuBar);
  return menuBar;
}

export function addButton(menuBar, iconSrc, buttonText) {
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

export function guiCreatePage() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("App container not found");
    return;
  }

  const menuBar = addMenuBar(app);

  addButton(
    menuBar,
    "./assets/svg/gui-white/save-arrow.svg",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida neque blandit rhoncus porttitor. Sed et tincidunt risus.",
  );
  addButton(menuBar, "./assets/svg/gui-white/hamburger-menu.svg", "Lorem ipsum dolor");
  addButton(
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

// Run the initialization when the DOM is loaded
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    guiCreatePage();
    initializeButtons();
  });
}
