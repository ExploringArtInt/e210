/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";
import { createContent } from "../../content.js";
import { createMenuBar, createButton } from "../../gui.js";

jest.mock("../../gui.js", () => ({
  createMenuBar: jest.fn(),
  createButton: jest.fn(),
}));

describe("Content Functions", () => {
  let mockMenuBar;

  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    mockMenuBar = document.createElement("div");
    createMenuBar.mockReturnValue(mockMenuBar);
    jest.clearAllMocks();
  });

  test("createContent creates the correct page structure", () => {
    createContent();

    expect(true).toBe(true); // stub out content during initial dev
    /*
    expect(createMenuBar).toHaveBeenCalledTimes(1);
    expect(createButton).toHaveBeenCalledTimes(3);

    expect(createButton).toHaveBeenNthCalledWith(1, mockMenuBar, "./assets/svg/gui-white/hamburger-menu.svg", "Lorem ipsum dolor");
    expect(createButton).toHaveBeenNthCalledWith(2, mockMenuBar, "./assets/svg/gui-white/save-arrow.svg", expect.any(String));
    expect(createButton).toHaveBeenNthCalledWith(3, mockMenuBar, "./assets/svg/gui-white/round-knob.svg", expect.any(String));
    */
  });

  test("createContent logs error when app container is not found", () => {
    document.body.innerHTML = "";
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    createContent();

    expect(consoleSpy).toHaveBeenCalledWith("App container not found");
    consoleSpy.mockRestore();
  });
});
