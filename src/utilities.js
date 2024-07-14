// js/utilities.js

// MathUtils Functions
const MathUtils = {
  randomRange: (min, max) => Math.random() * (max - min) + min,

  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
};

// Time Functions
const TimeUtils = {
  getTime: () => performance.now(),

  calculateDeltaTime: (lastTime) => {
    const currentTime = TimeUtils.getTime();
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    return { deltaTime, currentTime };
  },
};

// Data Structure Operations
const DataUtils = {
  deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
};

// Browser Cookie Management
const CookieUtils = {
  MAX_COOKIE_SIZE: 4096, // bytes

  bake: (name, value, days) => {
    if (value === undefined || value === null) {
      throw new Error("Cookie value cannot be undefined or null");
    }

    let cookieString;
    try {
      const stringifiedValue = JSON.stringify(value);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + (days || 0));
      cookieString = `${name}=${encodeURIComponent(stringifiedValue)}; expires=${expirationDate.toUTCString()}; path=/`;
    } catch (error) {
      throw new Error(`Failed to stringify cookie value: ${error.message}`);
    }

    const size = new TextEncoder().encode(cookieString).length;
    if (size > CookieUtils.MAX_COOKIE_SIZE) {
      throw new Error(`Cookie size (${size} bytes) exceeds maximum allowed size (${CookieUtils.MAX_COOKIE_SIZE} bytes)`);
    }

    return cookieString;
  },

  save: (name, value, days = 400) => {
    try {
      const cookieString = CookieUtils.bake(name, value, days);
      document.cookie = cookieString;
    } catch (error) {
      console.debug(`Failed to save cookie: ${error.message}`);
    }
  },

  get: (name) => {
    const nameEQ = `${name}=`;
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        const rawValue = decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
        try {
          return JSON.parse(rawValue);
        } catch (e) {
          // If parsing fails, return the raw string
          return rawValue;
        }
      }
    }
    return null;
  },

  toss: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};

export { MathUtils, TimeUtils, DataUtils, CookieUtils };
