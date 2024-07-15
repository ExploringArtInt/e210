// patterns.test.js

import { fsmPattern } from "../../patterns.js";

describe("Finite State Machine Pattern", () => {
  let turnstileFSM;
  let actions;

  /***
  The turnstile FSM is a coin-operated turnstile you might find at a subway station.

  State Transition Table

  | Current State | Event | Next State | Actions
  |---------------|-------|------------|--------
  | Locked        | coin  | Unlocked   | onExitLocked, onCoin, onEnterUnlocked
  | Locked        | push  | Locked     | onPush
  | Unlocked      | coin  | Unlocked   | onCoin
  | Unlocked      | push  | Locked     | onExitUnlocked, onPush, onEnterLocked

  State Action Table

  | State    | Enter Action    | Exit Action    | Is Final State
  |----------|-----------------|----------------|---------------
  | Locked   | onEnterLocked   | onExitLocked   | No
  | Unlocked | onEnterUnlocked | onExitUnlocked | Yes

  ***/

  beforeEach(() => {
    actions = {
      onEnterLocked: jest.fn(),
      onExitLocked: jest.fn(),
      onEnterUnlocked: jest.fn(),
      onExitUnlocked: jest.fn(),
      onCoin: jest.fn(),
      onPush: jest.fn(),
    };

    turnstileFSM = fsmPattern.createMachine("locked", {
      locked: {
        enter: actions.onEnterLocked,
        exit: actions.onExitLocked,
        coin: {
          target: "unlocked",
          actions: actions.onCoin,
        },
        push: {
          target: "locked",
          actions: actions.onPush,
        },
      },
      unlocked: {
        enter: actions.onEnterUnlocked,
        exit: actions.onExitUnlocked,
        coin: {
          target: "unlocked",
          actions: actions.onCoin,
        },
        push: {
          target: "locked",
          actions: actions.onPush,
        },
        isFinal: true,
      },
    });
  });

  test("initial state is set correctly", () => {
    expect(turnstileFSM.getState()).toBe("locked");
  });

  test("valid transition changes state", () => {
    expect(turnstileFSM.transition("coin")).toBe("unlocked");
    expect(turnstileFSM.getState()).toBe("unlocked");
  });

  test("invalid transition does not change state", () => {
    expect(turnstileFSM.transition("invalid")).toBe("locked");
    expect(turnstileFSM.getState()).toBe("locked");
  });

  test("multiple transitions work correctly", () => {
    turnstileFSM.transition("coin");
    expect(turnstileFSM.getState()).toBe("unlocked");
    turnstileFSM.transition("push");
    expect(turnstileFSM.getState()).toBe("locked");
  });

  test("canTransition returns true for valid transitions", () => {
    expect(turnstileFSM.canTransition("coin")).toBe(true);
  });

  test("canTransition returns false for invalid transitions", () => {
    expect(turnstileFSM.canTransition("invalid")).toBe(false);
  });

  test("isInFinalState returns false for non-final state", () => {
    expect(turnstileFSM.isInFinalState()).toBe(false);
  });

  test("isInFinalState returns true for final state", () => {
    turnstileFSM.transition("coin");
    expect(turnstileFSM.isInFinalState()).toBe(true);
  });

  test("enter and exit actions are called", () => {
    turnstileFSM.transition("coin");
    expect(actions.onExitLocked).toHaveBeenCalledTimes(1);
    expect(actions.onEnterUnlocked).toHaveBeenCalledTimes(1);

    turnstileFSM.transition("push");
    expect(actions.onExitUnlocked).toHaveBeenCalledTimes(1);
    expect(actions.onEnterLocked).toHaveBeenCalledTimes(1);
  });

  test("transition actions are called", () => {
    turnstileFSM.transition("coin");
    expect(actions.onCoin).toHaveBeenCalledTimes(1);

    turnstileFSM.transition("push");
    expect(actions.onPush).toHaveBeenCalledTimes(1);
  });
});
