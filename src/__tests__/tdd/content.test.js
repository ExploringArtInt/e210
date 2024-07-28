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

  test.skip("createContent creates the correct page structure", () => {});

  test("createContent logs error when app container is not found", () => {
    document.body.innerHTML = "";
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    createContent();

    expect(consoleSpy).toHaveBeenCalledWith("App container not found");
    consoleSpy.mockRestore();
  });
});
