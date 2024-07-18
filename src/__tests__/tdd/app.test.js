// app.test.js
import { App } from "../../app.js";
import { createContent, initializeButtons, createSpinner, deleteSpinner } from "../../gui.js";

jest.mock("../../gui.js", () => ({
  createContent: jest.fn(),
  initializeButtons: jest.fn(),
  createSpinner: jest.fn(),
  deleteSpinner: jest.fn(),
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
    expect(consoleSpy).toHaveBeenCalledWith("Exiting Start state");
    expect(consoleSpy).toHaveBeenCalledWith("App initialized");
    expect(consoleSpy).toHaveBeenCalledWith("Entering Loading state");
  });

  test("automatically transitions from Loading to Idle after timeout", () => {
    app.start();
    jest.runAllTimers();
    expect(app.fsm.getState()).toBe("Idle");
    expect(consoleSpy).toHaveBeenCalledWith("Exiting Loading state");
    expect(consoleSpy).toHaveBeenCalledWith("Creating page");
    expect(consoleSpy).toHaveBeenCalledWith("Entering Idle state");
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
    expect(consoleSpy).toHaveBeenCalledWith("Pausing app");
    expect(consoleSpy).toHaveBeenCalledWith("Entering Paused state");

    app.fsm.transition("Unpause");
    expect(app.fsm.getState()).toBe("Idle");
    expect(consoleSpy).toHaveBeenCalledWith("Resuming app");
    expect(consoleSpy).toHaveBeenCalledWith("Entering Idle state");
  });

  test("can perform action in Idle state", () => {
    app.start();
    jest.runAllTimers();

    app.fsm.transition("Request Action");
    expect(app.fsm.getState()).toBe("Idle");
    expect(consoleSpy).toHaveBeenCalledWith("Performing action");
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
