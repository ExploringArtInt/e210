import { fsmPattern } from "./patterns.js";
import { activateButtons, createSpinner, deleteSpinner } from "./gui.js";
import { createContent } from "./content.js";

/***

App State Transition Table

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

export class App {
  constructor(options = {}) {
    // Define default values
    const defaults = {
      sessionKey: 123456789,
      msUntilTimeOut: 20000,
      routeURL: "/",
    };

    // Merge provided options with defaults
    const config = { ...defaults, ...options };

    // Assign merged config to instance properties
    Object.assign(this, config);

    this.fsm = fsmPattern.createMachine("Start", {
      Start: {
        enter: this.enterStartState.bind(this),
        exit: this.exitStartState.bind(this),
        Initialize: {
          target: "Loading",
          actions: this.onAppInitialized.bind(this),
        },
      },
      Loading: {
        enter: this.enterLoadingState.bind(this),
        exit: this.exitLoadingState.bind(this),
        "Content Loaded": {
          target: "Idle",
          actions: this.onCreatePage.bind(this),
        },
      },
      Idle: {
        enter: this.enterIdleState.bind(this),
        exit: this.exitIdleState.bind(this),
        "Request Action": {
          target: "Idle",
          actions: this.onPerformAction.bind(this),
        },
        Pause: {
          target: "Paused",
          actions: this.onPauseApp.bind(this),
        },
      },
      Paused: {
        enter: this.enterPausedState.bind(this),
        exit: this.exitPausedState.bind(this),
        Unpause: {
          target: "Idle",
          actions: this.onResumeApp.bind(this),
        },
        isFinal: true,
      },
    });
  }

  start() {
    this.fsm.transition("Initialize");
  }

  enterStartState() {
    // console.log("Entering Start state");
  }

  exitStartState() {
    // console.log("Exiting Start state");
  }

  onAppInitialized() {
    // console.log("App initialized");
  }

  enterLoadingState() {
    // console.log("Entering Loading state");
    createSpinner();

    // Simulate content loading
    setTimeout(() => this.fsm.transition("Content Loaded"), 1000);
  }

  exitLoadingState() {
    // console.log("Exiting Loading state");
    deleteSpinner();
  }

  onCreatePage() {
    // console.log("Creating page");
    createContent();
    activateButtons();
  }

  enterIdleState() {
    // console.log("Entering Idle state");
  }

  exitIdleState() {
    // console.log("Exiting Idle state");
  }

  onPerformAction() {
    // console.log("Performing action");
  }

  onPauseApp() {
    // console.log("Pausing app");
  }

  enterPausedState() {
    // console.log("Entering Paused state");
  }

  exitPausedState() {
    // console.log("Exiting Paused state");
  }

  onResumeApp() {
    // console.log("Resuming app");
  }
}

// Initialize the app when the DOM is loaded
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    app.start();
  });
}
