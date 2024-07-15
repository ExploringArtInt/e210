// gui.js

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
  document.addEventListener("DOMContentLoaded", initializeButtons);
}
