/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";
import { initializeButtons, addMenuBar, addButton, guiCreatePage } from "../../gui.js";
import { GuidUtils } from "../../utilities.js";

jest.mock("../../utilities.js", () => ({
  GuidUtils: {
    getLocalUniqueID: jest.fn().mockReturnValue(1234),
  },
}));

describe("GUI Functions", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    jest.clearAllMocks();
  });

  test("addMenuBar creates a menu bar with correct ID and class", () => {
    const app = document.getElementById("app");
    const menuBar = addMenuBar(app);

    expect(menuBar).toBeTruthy();
    expect(menuBar.id).toBe("menu-bar-1234");
    expect(menuBar.className).toBe("menu-bar");
    expect(app.contains(menuBar)).toBe(true);
  });

  test("addButton creates a button with correct structure and content", () => {
    const menuBar = document.createElement("div");
    const button = addButton(menuBar, "test-icon.svg", "Test Button");

    expect(button).toBeTruthy();
    expect(button.id).toBe("flex-button-1234");
    expect(button.className).toBe("flex-button");
    expect(button.querySelector("img.button-icon").src).toContain("test-icon.svg");
    expect(button.querySelector("span.button-text").textContent).toBe("Test Button");
    expect(menuBar.contains(button)).toBe(true);
  });

  test("guiCreatePage creates the correct page structure", () => {
    const app = document.getElementById("app");
    guiCreatePage();

    const menuBar = app.querySelector(".menu-bar");
    expect(menuBar).toBeTruthy();

    const buttons = menuBar.querySelectorAll(".flex-button");
    expect(buttons.length).toBe(3);

    expect(buttons[0].querySelector(".button-icon").src).toContain("save-arrow.svg");
    expect(buttons[1].querySelector(".button-icon").src).toContain("hamburger-menu.svg");
    expect(buttons[2].querySelector(".button-icon").src).toContain("round-knob.svg");
  });

  test("Buttons exist in the document", () => {
    guiCreatePage();
    initializeButtons();
    const buttons = document.querySelectorAll(".flex-button");
    expect(buttons.length).toBe(3);
  });

  test("Buttons have correct classes", () => {
    guiCreatePage();
    initializeButtons();
    const buttons = document.querySelectorAll(".flex-button");
    buttons.forEach((button) => {
      expect(button.classList.contains("flex-button")).toBe(true);
    });
  });

  test("Button text is wrapped in a span", () => {
    guiCreatePage();
    initializeButtons();
    const buttonTexts = document.querySelectorAll(".button-text");
    expect(buttonTexts.length).toBe(3);
    expect(buttonTexts[0].textContent).toContain("Lorem ipsum dolor sit amet");
    expect(buttonTexts[1].textContent).toBe("Lorem ipsum dolor");
    expect(buttonTexts[2].textContent).toContain("Lorem ipsum dolor sit amet");
  });

  test("Button click event listeners are added", () => {
    guiCreatePage();
    initializeButtons();
    const buttons = document.querySelectorAll(".flex-button");
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    buttons.forEach((button, index) => {
      button.click();
      expect(alertMock).toHaveBeenCalledWith(`Button ${index + 1} clicked!`);
    });

    alertMock.mockRestore();
  });
});
