/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";
import { createCard } from "../../card.js";
import { fsmPattern } from "../../patterns.js";
import { GuidUtils } from "../../utilities.js";

jest.mock("../../patterns.js");
jest.mock("../../utilities.js");

describe("Card", () => {
  let card;
  let parentDiv;
  let mockFsm;
  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Setup DOM
    document.body.innerHTML = '<div id="app"></div>';
    parentDiv = document.getElementById("app");

    // Mock FSM
    let currentState = "Normal";
    mockFsm = {
      transition: jest.fn((event) => {
        if (event === "Display" && currentState === "Hidden") currentState = "Normal";
        else if (event === "OpenModal" && currentState === "Normal") currentState = "Modal";
        else if (event === "CloseModal" && currentState === "Modal") currentState = "Hidden";
        else if (event === "Hide" && currentState === "Normal") currentState = "Hidden";
      }),
      getState: jest.fn(() => currentState),
      isInFinalState: jest.fn(() => currentState === "Modal"),
    };
    fsmPattern.createMachine.mockReturnValue(mockFsm);

    // Mock GuidUtils
    GuidUtils.getLocalUniqueID.mockReturnValue("1234");

    // Create Card instance
    card = createCard(parentDiv);

    // Spy on console.log
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    jest.useRealTimers();
    consoleSpy.mockRestore();
  });

  test("Stub", () => {
    expect(true).toBe(true);
  });
});
