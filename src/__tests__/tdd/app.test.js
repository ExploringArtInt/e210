// app.test.js
/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";

// app.test.js
import { App } from "../../app.js";
import { initializeButtons, createSpinner, deleteSpinner } from "../../gui.js";
import { createContent } from "../../content.js";

jest.mock("../../gui.js", () => ({
  createContent: jest.fn(),
  initializeButtons: jest.fn(),
  createSpinner: jest.fn(),
  deleteSpinner: jest.fn(),
}));

describe("App", () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    jest.useFakeTimers();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.useRealTimers();
  });

  test("constructor initializes with default values when no arguments are provided", () => {
    const app = new App();
    expect(app.sessionKey).toBe(123456789);
    expect(app.msUntilTimeOut).toBe(20000);
    expect(app.routeURL).toBe("/");
    expect(app.lightSourceX).toBe(0);
    expect(app.lightSourceY).toBe(0);
    expect(app.lightSourceBrightness).toBe(0);
    expect(app.lightSourceBlur).toBe(0);
    expect(app.cardPaddingTop).toBe(0);
    expect(app.cardPaddingRight).toBe(0);
    expect(app.cardPaddingBottom).toBe(0);
    expect(app.cardPaddingLeft).toBe(0);
    expect(app.cardMarginTop).toBe(0);
    expect(app.cardMarginRight).toBe(0);
    expect(app.cardMarginBottom).toBe(0);
    expect(app.cardMarginLeft).toBe(0);
    expect(app.appMaxWidth).toBe(0);
    expect(app.appBreakWidth).toBe(0);
  });

  test("constructor initializes with custom values when all arguments are provided", () => {
    const customApp = new App({
      sessionKey: 987654321,
      msUntilTimeOut: 30000,
      routeURL: "/custom",
      lightSourceX: 100,
      lightSourceY: 200,
      lightSourceBrightness: 0.5,
      lightSourceBlur: 10,
      cardPaddingTop: 5,
      cardPaddingRight: 10,
      cardPaddingBottom: 5,
      cardPaddingLeft: 10,
      cardMarginTop: 15,
      cardMarginRight: 20,
      cardMarginBottom: 15,
      cardMarginLeft: 20,
      appMaxWidth: 1200,
      appBreakWidth: 768,
    });

    expect(customApp.sessionKey).toBe(987654321);
    expect(customApp.msUntilTimeOut).toBe(30000);
    expect(customApp.routeURL).toBe("/custom");
    expect(customApp.lightSourceX).toBe(100);
    expect(customApp.lightSourceY).toBe(200);
    expect(customApp.lightSourceBrightness).toBe(0.5);
    expect(customApp.lightSourceBlur).toBe(10);
    expect(customApp.cardPaddingTop).toBe(5);
    expect(customApp.cardPaddingRight).toBe(10);
    expect(customApp.cardPaddingBottom).toBe(5);
    expect(customApp.cardPaddingLeft).toBe(10);
    expect(customApp.cardMarginTop).toBe(15);
    expect(customApp.cardMarginRight).toBe(20);
    expect(customApp.cardMarginBottom).toBe(15);
    expect(customApp.cardMarginLeft).toBe(20);
    expect(customApp.appMaxWidth).toBe(1200);
    expect(customApp.appBreakWidth).toBe(768);
  });

  test("constructor initializes with mix of custom and default values when some arguments are provided", () => {
    const partialCustomApp = new App({
      sessionKey: 987654321,
      routeURL: "/partial-custom",
      lightSourceBrightness: 0.7,
      cardPaddingTop: 8,
      appMaxWidth: 1000,
    });

    expect(partialCustomApp.sessionKey).toBe(987654321);
    expect(partialCustomApp.msUntilTimeOut).toBe(20000); // default
    expect(partialCustomApp.routeURL).toBe("/partial-custom");
    expect(partialCustomApp.lightSourceX).toBe(0); // default
    expect(partialCustomApp.lightSourceY).toBe(0); // default
    expect(partialCustomApp.lightSourceBrightness).toBe(0.7);
    expect(partialCustomApp.lightSourceBlur).toBe(0); // default
    expect(partialCustomApp.cardPaddingTop).toBe(8);
    expect(partialCustomApp.cardPaddingRight).toBe(0); // default
    expect(partialCustomApp.cardPaddingBottom).toBe(0); // default
    expect(partialCustomApp.cardPaddingLeft).toBe(0); // default
    expect(partialCustomApp.cardMarginTop).toBe(0); // default
    expect(partialCustomApp.cardMarginRight).toBe(0); // default
    expect(partialCustomApp.cardMarginBottom).toBe(0); // default
    expect(partialCustomApp.cardMarginLeft).toBe(0); // default
    expect(partialCustomApp.appMaxWidth).toBe(1000);
    expect(partialCustomApp.appBreakWidth).toBe(0); // default
  });

  test("initial state is Start", () => {
    const app = new App();
    expect(app.fsm.getState()).toBe("Start");
  });

  test.skip("start method transitions to Loading state", () => {
    const app = new App();
    app.start();
    expect(app.fsm.getState()).toBe("Loading");
    expect(consoleSpy).toHaveBeenCalledWith("Exiting Start state");
    expect(consoleSpy).toHaveBeenCalledWith("App initialized");
    expect(consoleSpy).toHaveBeenCalledWith("Entering Loading state");
  });

  test.skip("automatically transitions from Loading to Idle after timeout", () => {
    const app = new App();
    app.start();
    jest.runAllTimers();
    expect(app.fsm.getState()).toBe("Idle");
    expect(consoleSpy).toHaveBeenCalledWith("Exiting Loading state");
    expect(consoleSpy).toHaveBeenCalledWith("Creating page");
    expect(consoleSpy).toHaveBeenCalledWith("Entering Idle state");
  });

  test.skip("can transition from Idle to Paused and back", () => {
    const app = new App();
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

  test.skip("can perform action in Idle state", () => {
    const app = new App();
    app.start();
    jest.runAllTimers();

    app.fsm.transition("Request Action");
    expect(app.fsm.getState()).toBe("Idle");
    expect(consoleSpy).toHaveBeenCalledWith("Performing action");
  });

  test("cannot transition directly from Start to Idle", () => {
    const app = new App();
    app.fsm.transition("Content Loaded");
    expect(app.fsm.getState()).toBe("Start");
  });

  test("cannot transition directly from Loading to Paused", () => {
    const app = new App();
    app.start();
    app.fsm.transition("Pause");
    expect(app.fsm.getState()).toBe("Loading");
  });

  test.skip("Paused is a final state", () => {
    const app = new App();
    app.start();
    jest.runAllTimers();
    app.fsm.transition("Pause");
    expect(app.fsm.isInFinalState()).toBe(true);
  });
});
