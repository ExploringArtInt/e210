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
    document.body.innerHTML = '<div id="parent"></div>';
    parentDiv = document.getElementById("parent");

    mockFsm = {
      transition: jest.fn(),
    };
    fsmPattern.createMachine.mockReturnValue(mockFsm);
  });

  test("constructor initializes with default values when no options are provided", () => {
    card = new Card(parentDiv);
    expect(card.cardId).toBe("card-1234");
    expect(card.cardPaddingTop).toBe(0);
    expect(card.cardPaddingRight).toBe(0);
    expect(card.cardPaddingBottom).toBe(0);
    expect(card.cardPaddingLeft).toBe(0);
    expect(card.cardMarginTop).toBe(0);
    expect(card.cardMarginRight).toBe(0);
    expect(card.cardMarginBottom).toBe(0);
    expect(card.cardMarginLeft).toBe(0);
    expect(card.lastElementBeforeModal).toBe(0);
    expect(card.zIndex).toBe(0);
    expect(card.flexDirection).toBe(0);
    expect(card.flexJustify).toBe(0);
    expect(card.flexAlign).toBe(0);
    expect(card.flexContent).toBe(0);
    expect(card.flexGrow).toBe(0);
    expect(card.borderRadius).toBe(0);
    expect(card.shadowZ).toBe(0);
  });

  test("constructor initializes with custom values when all options are provided", () => {
    const customOptions = {
      cardPaddingTop: 10,
      cardPaddingRight: 20,
      cardPaddingBottom: 30,
      cardPaddingLeft: 40,
      cardMarginTop: 5,
      cardMarginRight: 15,
      cardMarginBottom: 25,
      cardMarginLeft: 35,
      lastElementBeforeModal: 1,
      zIndex: 100,
      flexDirection: 1,
      flexJustify: 2,
      flexAlign: 3,
      flexContent: 4,
      flexGrow: 1,
      borderRadius: 5,
      shadowZ: 2,
    };

    card = new Card(parentDiv, customOptions);

    Object.entries(customOptions).forEach(([key, value]) => {
      expect(card[key]).toBe(value);
    });
  });

  test("constructor initializes with a mix of custom and default values", () => {
    const partialOptions = {
      cardPaddingTop: 10,
      cardMarginRight: 15,
      zIndex: 100,
      flexGrow: 1,
    };

    card = new Card(parentDiv, partialOptions);

    // Check custom values
    Object.entries(partialOptions).forEach(([key, value]) => {
      expect(card[key]).toBe(value);
    });

    // Check default values for unspecified options
    expect(card.cardPaddingRight).toBe(0);
    expect(card.cardPaddingBottom).toBe(0);
    expect(card.cardPaddingLeft).toBe(0);
    expect(card.cardMarginTop).toBe(0);
    expect(card.cardMarginBottom).toBe(0);
    expect(card.cardMarginLeft).toBe(0);
    expect(card.lastElementBeforeModal).toBe(0);
    expect(card.flexDirection).toBe(0);
    expect(card.flexJustify).toBe(0);
    expect(card.flexAlign).toBe(0);
    expect(card.flexContent).toBe(0);
    expect(card.borderRadius).toBe(0);
    expect(card.shadowZ).toBe(0);
  });

  // ... (rest of the tests remain the same)
});

describe("createCard", () => {
  let parentDiv;
  let card;

  beforeEach(() => {
    document.body.innerHTML = '<div id="parent"></div>';
    parentDiv = document.getElementById("parent");
  });

  test("createCard returns a Card instance with default values when no options are provided", () => {
    card = createCard(parentDiv);
    expect(card).toBeInstanceOf(Card);
    expect(card.cardPaddingTop).toBe(0);
    expect(card.cardPaddingRight).toBe(0);
    expect(card.cardPaddingBottom).toBe(0);
    expect(card.cardPaddingLeft).toBe(0);
    expect(card.cardMarginTop).toBe(0);
    expect(card.cardMarginRight).toBe(0);
    expect(card.cardMarginBottom).toBe(0);
    expect(card.cardMarginLeft).toBe(0);
    expect(card.lastElementBeforeModal).toBe(0);
    expect(card.zIndex).toBe(0);
    expect(card.flexDirection).toBe(0);
    expect(card.flexJustify).toBe(0);
    expect(card.flexAlign).toBe(0);
    expect(card.flexContent).toBe(0);
    expect(card.flexGrow).toBe(0);
    expect(card.borderRadius).toBe(0);
    expect(card.shadowZ).toBe(0);
  });

  test("createCard returns a Card instance with custom values when options are provided", () => {
    const customOptions = {
      cardPaddingTop: 10,
      cardMarginRight: 15,
      zIndex: 100,
      flexGrow: 1,
    };

    card = createCard(parentDiv, customOptions);

    expect(card).toBeInstanceOf(Card);

    // Check custom values
    Object.entries(customOptions).forEach(([key, value]) => {
      expect(card[key]).toBe(value);
    });

    // Check default values for unspecified options
    expect(card.cardPaddingRight).toBe(0);
    expect(card.cardPaddingBottom).toBe(0);
    expect(card.cardPaddingLeft).toBe(0);
    expect(card.cardMarginTop).toBe(0);
    expect(card.cardMarginBottom).toBe(0);
    expect(card.cardMarginLeft).toBe(0);
    expect(card.lastElementBeforeModal).toBe(0);
    expect(card.flexDirection).toBe(0);
    expect(card.flexJustify).toBe(0);
    expect(card.flexAlign).toBe(0);
    expect(card.flexContent).toBe(0);
    expect(card.borderRadius).toBe(0);
    expect(card.shadowZ).toBe(0);
  });

  test.skip("createCard adds event listeners", () => {
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
