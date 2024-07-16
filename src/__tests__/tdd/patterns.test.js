// patterns.test.js

import { fsmPattern } from "../../patterns.js";

describe("Finite State Machine Pattern", () => {
  let appFSM;
  let actions;

  /***
  The app FSM represents the states and transitions of a simple application.

  State Transition Table

  |  State  | Event           | Next State | Actions
  |---------|-----------------|------------|--------
  | Start   | Initialize      | Loading    | onAppInitialized
  | Loading | Content Loaded  | Idle       | onCreatePage
  | Idle    | Request Action  | Idle       | onPerformAction
  | Idle    | Pause           | Paused     | onPauseApp
  | Paused  | Unpause         | Idle       | onResumeApp

  State Action Table

  | State   | Enter Action    | Exit Action    | Is Final State
  |---------|-----------------|----------------|---------------
  | Start   | onEnterStart    | onExitStart    | No
  | Loading | onEnterLoading  | onExitLoading  | No
  | Idle    | onEnterIdle     | onExitIdle     | No
  | Paused  | onEnterPaused   | onExitPaused   | Yes

  ***/

  beforeEach(() => {
    actions = {
      onEnterStart: jest.fn(),
      onExitStart: jest.fn(),
      onEnterLoading: jest.fn(),
      onExitLoading: jest.fn(),
      onEnterIdle: jest.fn(),
      onExitIdle: jest.fn(),
      onEnterPaused: jest.fn(),
      onExitPaused: jest.fn(),
      onAppInitialized: jest.fn(),
      onCreatePage: jest.fn(),
      onPerformAction: jest.fn(),
      onPauseApp: jest.fn(),
      onResumeApp: jest.fn(),
    };

    appFSM = fsmPattern.createMachine("Start", {
      Start: {
        enter: actions.onEnterStart,
        exit: actions.onExitStart,
        Initialize: {
          target: "Loading",
          actions: actions.onAppInitialized,
        },
      },
      Loading: {
        enter: actions.onEnterLoading,
        exit: actions.onExitLoading,
        "Content Loaded": {
          target: "Idle",
          actions: actions.onCreatePage,
        },
      },
      Idle: {
        enter: actions.onEnterIdle,
        exit: actions.onExitIdle,
        "Request Action": {
          target: "Idle",
          actions: actions.onPerformAction,
        },
        Pause: {
          target: "Paused",
          actions: actions.onPauseApp,
        },
      },
      Paused: {
        enter: actions.onEnterPaused,
        exit: actions.onExitPaused,
        Unpause: {
          target: "Idle",
          actions: actions.onResumeApp,
        },
        isFinal: true,
      },
    });
  });

  test("initial state is set correctly", () => {
    expect(appFSM.getState()).toBe("Start");
  });

  test("valid transition changes state", () => {
    expect(appFSM.transition("Initialize")).toBe("Loading");
    expect(appFSM.getState()).toBe("Loading");
  });

  test("invalid transition does not change state", () => {
    expect(appFSM.transition("invalid")).toBe("Start");
    expect(appFSM.getState()).toBe("Start");
  });

  test("multiple transitions work correctly", () => {
    appFSM.transition("Initialize");
    expect(appFSM.getState()).toBe("Loading");
    appFSM.transition("Content Loaded");
    expect(appFSM.getState()).toBe("Idle");
    appFSM.transition("Pause");
    expect(appFSM.getState()).toBe("Paused");
  });

  test("canTransition returns true for valid transitions", () => {
    expect(appFSM.canTransition("Initialize")).toBe(true);
  });

  test("canTransition returns false for invalid transitions", () => {
    expect(appFSM.canTransition("invalid")).toBe(false);
  });

  test("isInFinalState returns false for non-final state", () => {
    expect(appFSM.isInFinalState()).toBe(false);
  });

  test("isInFinalState returns true for final state", () => {
    appFSM.transition("Initialize");
    appFSM.transition("Content Loaded");
    appFSM.transition("Pause");
    expect(appFSM.isInFinalState()).toBe(true);
  });

  test("enter and exit actions are called", () => {
    appFSM.transition("Initialize");
    expect(actions.onExitStart).toHaveBeenCalledTimes(1);
    expect(actions.onEnterLoading).toHaveBeenCalledTimes(1);

    appFSM.transition("Content Loaded");
    expect(actions.onExitLoading).toHaveBeenCalledTimes(1);
    expect(actions.onEnterIdle).toHaveBeenCalledTimes(1);
  });

  test("transition actions are called", () => {
    appFSM.transition("Initialize");
    expect(actions.onAppInitialized).toHaveBeenCalledTimes(1);

    appFSM.transition("Content Loaded");
    expect(actions.onCreatePage).toHaveBeenCalledTimes(1);

    appFSM.transition("Request Action");
    expect(actions.onPerformAction).toHaveBeenCalledTimes(1);

    appFSM.transition("Pause");
    expect(actions.onPauseApp).toHaveBeenCalledTimes(1);

    appFSM.transition("Unpause");
    expect(actions.onResumeApp).toHaveBeenCalledTimes(1);
  });
});
