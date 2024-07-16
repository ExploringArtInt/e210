import { fsmPattern } from "./patterns.js";
import { guiCreatePage, initializeButtons } from "./gui.js";

/***

App State Transition Table

| Current State | Event | Next State | Actions
|---------------|-------|------------|--------
| init          | exit  | normal     | exitInitState


State Action Table

| State    | Enter Action     | Exit Action    | Is Final State
|----------|------------------|----------------|---------------
| init     | enterInitState   | exitInitState  | No
| normal   | enterNormalState |                | Yes

***/

export class App {
  constructor() {
    this.state = "init";
    this.fsm = fsmPattern.createMachine("init", {
      init: {
        enter: this.enterInitState.bind(this),
        exit: {
          target: "normal",
          actions: this.exitInitState.bind(this),
        },
      },
      normal: {
        enter: this.enterNormalState.bind(this),
      },
    });
  }

  start() {
    this.fsm.transition("enter");
  }

  enterInitState() {
    console.log("Entering init state");
    this.fsm.transition("exit");
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
    app.enterInitState();
  });
}
