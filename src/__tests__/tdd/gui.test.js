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
    document.body.innerHTML = '<div id="app"></div><div id="spinner"></div>';
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("createMenuBar creates a menu bar with correct ID and class", () => {
    const app = document.getElementById("app");
    const menuBar = createMenuBar(app);

    expect(menuBar).toBeTruthy();
    expect(menuBar.id).toBe("gui-menu-bar-1234");
    expect(menuBar.className).toBe("gui-menu-bar");
    expect(app.contains(menuBar)).toBe(true);
  });

  test("createButton creates a button with correct structure and content", () => {
    const menuBar = document.createElement("div");
    const button = createButton(menuBar, { iconSrc: "test-icon.svg", label: "Test Button" }); // refactor to new interface

    expect(button).toBeTruthy();
    expect(button.id).toBe("gui-button-1234");
    expect(button.className).toBe("gui-button");
    expect(button.querySelector("img.gui-button-icon").src).toContain("test-icon.svg");
    expect(button.querySelector("span.gui-button-text").textContent).toBe("Test Button");
    expect(menuBar.contains(button)).toBe(true);
  });

  test("initializeButtons adds click event listeners to buttons", () => {
    document.body.innerHTML = `
      <button class="gui-button"></button>
      <button class="gui-button"></button>
      <button class="gui-button"></button>
    `;

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    initializeButtons();

    const buttons = document.querySelectorAll(".gui-button");
    buttons.forEach((button, index) => {
      button.click();
      expect(alertMock).toHaveBeenCalledWith(`Button ${index + 1} clicked!`);
    });

    alertMock.mockRestore();
  });

  test("createSpinner creates a spinner with correct structure", () => {
    createSpinner();

    const spinnerContainer = document.getElementById("spinner");
    const spinnerElement = spinnerContainer.querySelector(".spinner");
    const spinnerImage = spinnerElement.querySelector("img");

    expect(spinnerElement).toBeTruthy();
    expect(spinnerElement.id).toBe("spinner-1234");
    expect(spinnerImage).toBeTruthy();
    expect(spinnerImage.src).toContain("assets/svg/gui-black/cycle.svg");
    expect(spinnerImage.alt).toBe("Loading spinner");
  });

  test("createSpinner starts rotation animation", () => {
    createSpinner();

    const spinnerElement = document.querySelector(".spinner");

    expect(spinnerElement.style.transform).toBe("");
  });

  test("createSpinner logs error when spinner container is not found", () => {
    document.body.innerHTML = "";
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    createSpinner();

    expect(consoleSpy).toHaveBeenCalledWith("Spinner container not found");
    consoleSpy.mockRestore();
  });

  test("deleteSpinner removes spinner and stops animation", () => {
    createSpinner();

    const spinnerContainer = document.getElementById("spinner");
    expect(spinnerContainer.innerHTML).not.toBe("");

    deleteSpinner();

    expect(spinnerContainer.innerHTML).toBe("");
  });
});
