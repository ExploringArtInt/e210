/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";

import { EntityInput, createEntityInput } from "../../EntityInput.js";
import { fsmPattern } from "../../patterns.js";
import { GuidUtils } from "../../utilities.js";

jest.mock("../../patterns.js");
jest.mock("../../utilities.js");

describe("EntityInput", () => {
  let mockParentElement;
  let entityInput;

  beforeEach(() => {
    mockParentElement = document.createElement("div");
    document.body.appendChild(mockParentElement);

    fsmPattern.createMachine.mockReturnValue({
      transition: jest.fn(),
      getState: jest.fn(),
    });

    GuidUtils.getLocalUniqueID.mockReturnValue(12345);
  });

  afterEach(() => {
    document.body.removeChild(mockParentElement);
    jest.clearAllMocks();
  });

  test("constructor initializes correctly", () => {
    entityInput = new EntityInput(mockParentElement, { label: "Test Input" });
    expect(entityInput.inputId).toBe("entity-input-12345");
    expect(entityInput.parentElement).toBe(mockParentElement);
    expect(fsmPattern.createMachine).toHaveBeenCalled();
  });

  test.skip("createElement creates input element", () => {
    entityInput = new EntityInput(mockParentElement, { label: "Test Input", type: "text", placeholder: "Enter text" });
    entityInput.createElement();

    const inputElement = mockParentElement.querySelector("input");
    expect(inputElement).not.toBeNull();
    expect(inputElement.type).toBe("text");
    expect(inputElement.placeholder).toBe("Enter text");

    const labelElement = mockParentElement.querySelector("label");
    expect(labelElement).not.toBeNull();
    expect(labelElement.textContent).toBe("Test Input");
  });

  test.skip("show method displays the element", () => {
    entityInput = new EntityInput(mockParentElement);
    entityInput.createElement();
    entityInput.hide();
    entityInput.show();
    expect(entityInput.element.style.display).toBe("block");
  });

  test.skip("hide method hides the element", () => {
    entityInput = new EntityInput(mockParentElement);
    entityInput.createElement();
    entityInput.hide();
    expect(entityInput.element.style.display).toBe("none");
  });

  test.skip("disable method disables the input", () => {
    entityInput = new EntityInput(mockParentElement);
    entityInput.createElement();
    entityInput.disable();
    const inputElement = entityInput.element.querySelector("input");
    expect(inputElement.disabled).toBe(true);
  });

  test.skip("enable method enables the input", () => {
    entityInput = new EntityInput(mockParentElement);
    entityInput.createElement();
    entityInput.disable();
    entityInput.enable();
    const inputElement = entityInput.element.querySelector("input");
    expect(inputElement.disabled).toBe(false);
  });

  test.skip("markAsTouched adds touched class", () => {
    entityInput = new EntityInput(mockParentElement);
    entityInput.createElement();
    entityInput.markAsTouched();
    expect(entityInput.element.classList.contains("touched")).toBe(true);
  });

  test.skip("showError displays error message", () => {
    entityInput = new EntityInput(mockParentElement);
    entityInput.createElement();
    entityInput.showError("Test error");
    const errorElement = entityInput.element.querySelector(".error-message");
    expect(errorElement.textContent).toBe("Test error");
    expect(errorElement.style.display).toBe("block");
  });

  test.skip("hideError hides error message", () => {
    entityInput = new EntityInput(mockParentElement);
    entityInput.createElement();
    entityInput.showError("Test error");
    entityInput.hideError();
    const errorElement = entityInput.element.querySelector(".error-message");
    expect(errorElement.style.display).toBe("none");
  });

  test("remove method removes the element from DOM", () => {
    entityInput = new EntityInput(mockParentElement);
    entityInput.createElement();
    entityInput.remove();
    expect(mockParentElement.children.length).toBe(0);
  });
});

describe("createEntityInput", () => {
  let mockParentElement;

  beforeEach(() => {
    mockParentElement = document.createElement("div");
    document.body.appendChild(mockParentElement);

    fsmPattern.createMachine.mockReturnValue({
      transition: jest.fn(),
      getState: jest.fn(),
    });

    GuidUtils.getLocalUniqueID.mockReturnValue(12345);
  });

  afterEach(() => {
    document.body.removeChild(mockParentElement);
    jest.clearAllMocks();
  });

  test("creates and returns an EntityInput instance", () => {
    const entityInput = createEntityInput(mockParentElement, { label: "Test Input" });
    expect(entityInput).toBeInstanceOf(EntityInput);
  });

  test("transitions to Display state", () => {
    const entityInput = createEntityInput(mockParentElement, { label: "Test Input" });
    expect(entityInput.fsm.transition).toHaveBeenCalledWith("Display");
  });
});
