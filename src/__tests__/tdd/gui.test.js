/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";

import { initializeButtons, createMenuBar, createButton, createSpinner, deleteSpinner } from "../../gui.js";
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

  test("createMenuBar creates a menu bar with correct ID and class", () => {
    const app = document.getElementById("app");
    const menuBar = createMenuBar(app);

    expect(menuBar).toBeTruthy();
    expect(menuBar.id).toBe("menu-bar-1234");
    expect(menuBar.className).toBe("menu-bar");
    expect(app.contains(menuBar)).toBe(true);
  });

  test("createButton creates a button with correct structure and content", () => {
    const menuBar = document.createElement("div");
    const button = createButton(menuBar, "test-icon.svg", "Test Button");

    expect(button).toBeTruthy();
    expect(button.id).toBe("flex-button-1234");
    expect(button.className).toBe("flex-button");
    expect(button.querySelector("img.button-icon").src).toContain("test-icon.svg");
    expect(button.querySelector("span.button-text").textContent).toBe("Test Button");
    expect(menuBar.contains(button)).toBe(true);
  });

  test("initializeButtons adds click event listeners to buttons", () => {
    document.body.innerHTML = `
      <button class="flex-button"></button>
      <button class="flex-button"></button>
      <button class="flex-button"></button>
    `;

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    initializeButtons();

    const buttons = document.querySelectorAll(".flex-button");
    buttons.forEach((button, index) => {
      button.click();
      expect(alertMock).toHaveBeenCalledWith(`Button ${index + 1} clicked!`);
    });

    alertMock.mockRestore();
  });

  // Add tests for createSpinner and deleteSpinner if needed
});
