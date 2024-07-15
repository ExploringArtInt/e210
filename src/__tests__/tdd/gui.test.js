/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";
import { initializeButtons } from "../../gui.js";

describe("Flexible Buttons", () => {
  beforeEach(() => {
    // Mock DOM
    document.body.innerHTML = `
      <div id="app">
        <div class="menu-bar">
          <button id="flexButton1" class="flex-button">
            <span class="button-text">Button 1</span>
          </button>
          <button id="flexButton2" class="flex-button">
            <span class="button-text">Button 2</span>
          </button>
          <button id="flexButton3" class="flex-button">
            <span class="button-text">Button 3</span>
          </button>
        </div>
      </div>
    `;

    // Initialize the buttons
    initializeButtons();
  });

  test("Buttons exist in the document", () => {
    const buttons = document.querySelectorAll(".flex-button");
    expect(buttons.length).toBe(3);
  });

  test("Buttons have correct classes", () => {
    const buttons = document.querySelectorAll(".flex-button");
    buttons.forEach((button) => {
      expect(button.classList.contains("flex-button")).toBe(true);
    });
  });

  test("Button text is wrapped in a span", () => {
    const buttonTexts = document.querySelectorAll(".button-text");
    expect(buttonTexts.length).toBe(3);
    buttonTexts.forEach((buttonText, index) => {
      expect(buttonText.textContent).toBe(`Button ${index + 1}`);
    });
  });

  test("Button click event listeners are added", () => {
    const buttons = document.querySelectorAll(".flex-button");
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    buttons.forEach((button, index) => {
      button.click();
      expect(alertMock).toHaveBeenCalledWith(`Button ${index + 1} clicked!`);
    });

    alertMock.mockRestore();
  });
});
