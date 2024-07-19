// app.test.js
/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";

import { App } from "../../app.js";
import { initializeButtons, createSpinner, deleteSpinner } from "../../gui.js";
import { createContent } from "../../content.js";

jest.mock("../../gui.js", () => ({
  initializeButtons: jest.fn(),
  createSpinner: jest.fn(),
  deleteSpinner: jest.fn(),
}));

jest.mock("../../content.js", () => ({
  createContent: jest.fn(),
}));

describe("App", () => {
  let app;
  let consoleSpy;

  beforeEach(() => {
    app = new App();
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    jest.useFakeTimers();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.useRealTimers();
  });

  test("initial state is Start", () => {
    expect(app.fsm.getState()).toBe("Start");
  });

  test("start method transitions to Loading state", () => {
    app.start();
    expect(app.fsm.getState()).toBe("Loading");
  });

  test("automatically transitions from Loading to Idle after timeout", () => {
    app.start();
    jest.runAllTimers();
    expect(app.fsm.getState()).toBe("Idle");
  });

  test("createContent and initializeButtons are called when transitioning to Idle", () => {
    app.start();
    jest.runAllTimers();
    expect(createContent).toHaveBeenCalled();
    expect(initializeButtons).toHaveBeenCalled();
  });

  test("can transition from Idle to Paused and back", () => {
    app.start();
    jest.runAllTimers();

    app.fsm.transition("Pause");
    expect(app.fsm.getState()).toBe("Paused");

    app.fsm.transition("Unpause");
    expect(app.fsm.getState()).toBe("Idle");
  });

  test("can perform action in Idle state", () => {
    app.start();
    jest.runAllTimers();

    app.fsm.transition("Request Action");
    expect(app.fsm.getState()).toBe("Idle");
  });

  test("cannot transition directly from Start to Idle", () => {
    app.fsm.transition("Content Loaded");
    expect(app.fsm.getState()).toBe("Start");
  });

  test("cannot transition directly from Loading to Paused", () => {
    app.start();
    app.fsm.transition("Pause");
    expect(app.fsm.getState()).toBe("Loading");
  });

  test("Paused is a final state", () => {
    app.start();
    jest.runAllTimers();
    app.fsm.transition("Pause");
    expect(app.fsm.isInFinalState()).toBe(true);
  });
});
