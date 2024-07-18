// src/__tests__/utilities.test.js

import { CookieUtils, DataUtils, GuidUtils, MathUtils, TimeUtils } from "../../utilities.js";

// Mock document and its cookie property
global.document = {
  cookie: "",
};

describe("Utilities", () => {
  describe("MathUtils", () => {
    test("randomRange", () => {
      expect(true).toBe(true); // stub
    });
  });

  describe("TimeUtils", () => {
    test("getTime", () => {
      expect(TimeUtils.getTime()).toBeDefined();
    });

    test("calculateDeltaTime", () => {
      expect(TimeUtils.calculateDeltaTime(performance.now())).toBeDefined();
    });
  });

  describe("DataUtils", () => {
    test("deepClone", () => {
      expect(DataUtils.deepClone({ a: 1, b: { c: 2 } })).toBeDefined();
    });
  });

  describe("CookieUtils", () => {
    beforeEach(() => {
      global.document.cookie = "";
    });

    test("bake", () => {
      const result = CookieUtils.bake("testCookie", "testValue", 1);
      expect(result).toContain("testCookie=");
      expect(result).toContain(encodeURIComponent(JSON.stringify("testValue")));
    });

    test("save", () => {
      CookieUtils.save("testCookie", "testValue");
      expect(global.document.cookie).toContain("testCookie=");
      expect(global.document.cookie).toContain(encodeURIComponent(JSON.stringify("testValue")));
    });

    test("get string value", () => {
      const testValue = "testValue";
      global.document.cookie = `testCookie=${encodeURIComponent(JSON.stringify(testValue))}`;
      const result = CookieUtils.get("testCookie");
      expect(result).toBe(testValue);
    });

    test("get object value", () => {
      const testValue = { key: "value" };
      global.document.cookie = `testCookie=${encodeURIComponent(JSON.stringify(testValue))}`;
      const result = CookieUtils.get("testCookie");
      expect(result).toEqual(testValue);
    });

    test("toss", () => {
      global.document.cookie = "testCookie=testValue";
      CookieUtils.toss("testCookie");
      expect(global.document.cookie).toContain("testCookie=;");
      expect(global.document.cookie).toContain("expires=Thu, 01 Jan 1970 00:00:00 UTC");
    });
  });

  describe("GuidUtils", () => {
    test("getGlobalUniqueID returns a number between 1 billion and 2 billion", () => {
      const id = GuidUtils.getGlobalUniqueID();
      expect(id).toBeGreaterThanOrEqual(1e9);
      expect(id).toBeLessThan(2e9);
      expect(Number.isInteger(id)).toBe(true);
    });

    test("getGlobalUniqueID returns different values on subsequent calls", () => {
      const id1 = GuidUtils.getGlobalUniqueID();
      const id2 = GuidUtils.getGlobalUniqueID();
      expect(id1).not.toBe(id2);
    });

    test("getGlobalUniqueID returns a number within the correct range over multiple calls", () => {
      for (let i = 0; i < 10; i++) {
        const id = GuidUtils.getGlobalUniqueID();
        expect(id).toBeGreaterThanOrEqual(1e9);
        expect(id).toBeLessThan(2e9);
        expect(Number.isInteger(id)).toBe(true);
      }
    });

    test("getLocalUniqueID returns a number between 1 thousand and 10 thousand", () => {
      const id = GuidUtils.getLocalUniqueID();
      expect(id).toBeGreaterThanOrEqual(1e3);
      expect(id).toBeLessThan(1e4);
      expect(Number.isInteger(id)).toBe(true);
    });

    test("getLocalUniqueID returns different values on subsequent calls", () => {
      const id1 = GuidUtils.getLocalUniqueID();
      const id2 = GuidUtils.getLocalUniqueID();
      expect(id1).not.toBe(id2);
    });

    test("getLocalUniqueID returns a number within the correct range over multiple calls", () => {
      for (let i = 0; i < 10; i++) {
        const id = GuidUtils.getLocalUniqueID();
        expect(id).toBeGreaterThanOrEqual(1e3);
        expect(id).toBeLessThan(1e4);
        expect(Number.isInteger(id)).toBe(true);
      }
    });
  });
});
