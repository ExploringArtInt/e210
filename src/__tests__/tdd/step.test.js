/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";
import { Step, createStep } from "../../step.js";
import { fsmPattern } from "../../patterns.js";

jest.mock("../../patterns.js", () => ({
  fsmPattern: {
    createMachine: jest.fn(),
  },
}));

describe("Step", () => {
  let parentElement;
  let step;
  let mockFsm;

  beforeEach(() => {
    document.body.innerHTML = '<div id="parent"></div>';
    parentElement = document.getElementById("parent");

    mockFsm = {
      transition: jest.fn(),
    };
    fsmPattern.createMachine.mockReturnValue(mockFsm);

    step = new Step(parentElement);
  });

  test("constructor creates a step element", () => {
    expect(parentElement.querySelector(".step")).not.toBeNull();
  });

  test("constructor initializes FSM", () => {
    expect(fsmPattern.createMachine).toHaveBeenCalled();
  });

  test("display method calls FSM transition", () => {
    step.display();
    expect(mockFsm.transition).toHaveBeenCalledWith("Display");
  });

  test("hide method calls FSM transition", () => {
    step.hide();
    expect(mockFsm.transition).toHaveBeenCalledWith("Hide");
  });

  test("disable method calls FSM transition", () => {
    step.disable();
    expect(mockFsm.transition).toHaveBeenCalledWith("Disable");
  });

  test("enable method calls FSM transition", () => {
    step.enable();
    expect(mockFsm.transition).toHaveBeenCalledWith("Enable");
  });

  test("update method calls FSM transition", () => {
    step.update();
    expect(mockFsm.transition).toHaveBeenCalledWith("Update");
  });

  test("fieldError method calls FSM transition", () => {
    step.fieldError();
    expect(mockFsm.transition).toHaveBeenCalledWith("FieldError");
  });

  test("submit method calls FSM transition", () => {
    step.submit();
    expect(mockFsm.transition).toHaveBeenCalledWith("Submit");
  });

  test("cancel method calls FSM transition", () => {
    step.cancel();
    expect(mockFsm.transition).toHaveBeenCalledWith("Cancel");
  });

  test("stepError method calls FSM transition", () => {
    step.stepError();
    expect(mockFsm.transition).toHaveBeenCalledWith("StepError");
  });

  test("completed method calls FSM transition", () => {
    step.completed();
    expect(mockFsm.transition).toHaveBeenCalledWith("Completed");
  });

  test("timeout method calls FSM transition", () => {
    step.timeout();
    expect(mockFsm.transition).toHaveBeenCalledWith("Timeout");
  });

  // Test state enter/exit methods
  test("onEnterHidden adds 'hidden' class", () => {
    step.onEnterHidden();
    expect(step.element.classList.contains("hidden")).toBe(true);
  });

  test("onExitHidden removes 'hidden' class", () => {
    step.element.classList.add("hidden");
    step.onExitHidden();
    expect(step.element.classList.contains("hidden")).toBe(false);
  });

  test("onEnterNormal adds 'normal' class", () => {
    step.onEnterNormal();
    expect(step.element.classList.contains("normal")).toBe(true);
  });

  test("onExitNormal removes 'normal' class", () => {
    step.element.classList.add("normal");
    step.onExitNormal();
    expect(step.element.classList.contains("normal")).toBe(false);
  });

  // Add similar tests for other enter/exit methods...

});

describe("createStep", () => {
  let parentElement;

  beforeEach(() => {
    document.body.innerHTML = '<div id="parent"></div>';
    parentElement = document.getElementById("parent");
  });

  test("createStep returns a Step instance", () => {
    const step = createStep(parentElement);
    expect(step).toBeInstanceOf(Step);
  });

  test("createStep displays the step", () => {
    const displaySpy = jest.spyOn(Step.prototype, "display");
    createStep(parentElement);
    expect(displaySpy).toHaveBeenCalled();
  });
});