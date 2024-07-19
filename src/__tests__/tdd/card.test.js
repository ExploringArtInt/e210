/**
 * @jest-environment jsdom
 */
import "jest-canvas-mock";

import { Card, createCard } from "../../card.js";
import { fsmPattern } from "../../patterns.js";
import { GuidUtils } from "../../utilities.js";

jest.mock("../../patterns.js", () => ({
  fsmPattern: {
    createMachine: jest.fn(),
  },
}));

jest.mock("../../utilities.js", () => ({
  GuidUtils: {
    getLocalUniqueID: jest.fn().mockReturnValue(1234),
  },
}));

describe("Card", () => {
  let parentDiv;
  let card;
  let mockFsm;

  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = '<div id="parent"></div>';
    parentDiv = document.getElementById("parent");

    // Mock the FSM
    mockFsm = {
      transition: jest.fn(),
    };
    fsmPattern.createMachine.mockReturnValue(mockFsm);

    // Create a new card instance
    card = new Card(parentDiv);
  });

  test("constructor creates card element", () => {
    expect(card.cardId).toBe("card-1234");
    expect(card.element).toBeTruthy();
    expect(card.element.id).toBe("card-1234");
    expect(card.element.className).toContain("card");
    expect(card.element.className).toContain("hidden");
  });

  test("createCardElement creates correct structure", () => {
    const cardElement = card.element;
    expect(cardElement.querySelector("h2")).toBeTruthy();
    expect(cardElement.querySelector("p")).toBeTruthy();
    expect(cardElement.querySelector(".hide-btn")).toBeTruthy();
    expect(cardElement.querySelector(".modal-btn")).toBeTruthy();
  });

  test("onEnterHidden adds hidden class", () => {
    card.element.classList.remove("hidden");
    card.onEnterHidden();
    expect(card.element.classList.contains("hidden")).toBe(true);
  });

  test("onExitHidden removes hidden class", () => {
    card.element.classList.add("hidden");
    card.onExitHidden();
    expect(card.element.classList.contains("hidden")).toBe(false);
  });

  test("onEnterNormal adds normal class", () => {
    card.onEnterNormal();
    expect(card.element.classList.contains("normal")).toBe(true);
  });

  test("onExitNormal removes normal class", () => {
    card.element.classList.add("normal");
    card.onExitNormal();
    expect(card.element.classList.contains("normal")).toBe(false);
  });

  test("onEnterModal adds modal class", () => {
    card.onEnterModal();
    expect(card.element.classList.contains("modal")).toBe(true);
  });

  test("onExitModal removes modal class", () => {
    card.element.classList.add("modal");
    card.onExitModal();
    expect(card.element.classList.contains("modal")).toBe(false);
  });

  test('display calls fsm.transition with "Display"', () => {
    card.display();
    expect(mockFsm.transition).toHaveBeenCalledWith("Display");
  });

  test('hide calls fsm.transition with "Hide"', () => {
    card.hide();
    expect(mockFsm.transition).toHaveBeenCalledWith("Hide");
  });

  test('openModal calls fsm.transition with "OpenModal"', () => {
    card.openModal();
    expect(mockFsm.transition).toHaveBeenCalledWith("OpenModal");
  });

  test('closeModal calls fsm.transition with "CloseModal"', () => {
    card.closeModal();
    expect(mockFsm.transition).toHaveBeenCalledWith("CloseModal");
  });
});

describe("createCard", () => {
  let parentDiv;
  let card;

  beforeEach(() => {
    document.body.innerHTML = '<div id="parent"></div>';
    parentDiv = document.getElementById("parent");
    card = createCard(parentDiv);
  });

  test("createCard returns a Card instance", () => {
    expect(card).toBeInstanceOf(Card);
  });

  test("createCard adds event listeners", () => {
    const hideBtn = card.element.querySelector(".hide-btn");
    const modalBtn = card.element.querySelector(".modal-btn");

    const hideSpy = jest.spyOn(card, "hide");
    const openModalSpy = jest.spyOn(card, "openModal");

    hideBtn.click();
    expect(hideSpy).toHaveBeenCalled();

    modalBtn.click();
    expect(openModalSpy).toHaveBeenCalled();
  });
});
