import { createMenuBar, createButton } from "./gui.js";

export function createContent() {
  const app = document.getElementById("app");
  if (!app) {
    console.error("App container not found");
    return;
  }

  const menuBar = createMenuBar(app);

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
