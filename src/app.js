import { fsmPattern } from "./patterns.js";
import { guiCreatePage, initializeButtons } from "./gui.js";

export class App {
  constructor() {
    this.state = "init";
    this.fsm = fsmPattern({
      init: {
        enter: this.enterInitState.bind(this),
        exit: this.exitInitState.bind(this),
      },
      normal: {
        enter: this.enterNormalState.bind(this),
      },
    });
  }

  async start() {
    await this.fsm.transition("init");
  }

  async enterInitState() {
    console.log("Entering init state");
    // Simulate some initialization process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await this.fsm.transition("normal");
  }

  exitInitState() {
    console.log("Exiting init state");
  }

  enterNormalState() {
    console.log("Entering normal state");
    guiCreatePage();
    initializeButtons();
  }
}

// Initialize the app when the DOM is loaded
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.start();
  });
}
