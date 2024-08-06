import { fsmPattern } from "./patterns.js";
import { GuidUtils } from "./utilities.js";

/***

Step State Transition Table

|  State   | Event      | Next State | Actions
|----------|------------|------------|--------
| Start    | Create     | Hidden     | onCreateStep
| Hidden   | Display    | Normal     | onDisplayStep
| Normal   | Hide       | Hidden     | onHideStep
| Normal   | Disable    | Disabled   | onDisableStep
| Normal   | Update     | Normal     | onUpdateStep
| Normal   | FieldError | Error      | onFieldError
| Disabled | Enable     | Normal     | onEnableStep
| Disabled | Hide       | Hidden     | onHideStep
| Error    | Update     | Error      | onNotFixError
| Error    | Update     | Normal     | onFixError
| Normal   | Submit     | Wait       | onSubmitStep
| Wait     | StepError  | Error      | onResponseError
| Wait     | Completed  | Normal     | onCompletedStep
| Wait     | Timeout    | Error      | onTimeoutError
| Normal   | Cancel     | Hidden     | onCancelStep
| Hidden   | Delete     | (none)     | onDeleteStep

State Action Table

| State    | Enter Action    | Exit Action    | Is Final State
|----------|-----------------|----------------|---------------
| Start    | onEnterStart    | onExitStart    | No
| Hidden   | onEnterHidden   | onExitHidden   | No
| Normal   | onEnterNormal   | onExitNormal   | No
| Disabled | onEnterDisabled | onExitDisabled | No
| Error    | onEnterError    | onExitError    | No
| Wait     | onEnterWait     | onExitWait     | No
| Delete   | onEnterDelete   | onExitDelete   | Yes

***/

export class Step {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.stepId = `step-${GuidUtils.getLocalUniqueID()}`;
    this.element = this.createStepElement();

    this.fsm = fsmPattern.createMachine("Hidden", {
      Hidden: {
        enter: this.onEnterHidden.bind(this),
        exit: this.onExitHidden.bind(this),
        Display: {
          target: "Normal",
          actions: this.onDisplayStep.bind(this),
        },
      },
      Normal: {
        enter: this.onEnterNormal.bind(this),
        exit: this.onExitNormal.bind(this),
        Hide: {
          target: "Hidden",
          actions: this.onHideStep.bind(this),
        },
        Disable: {
          target: "Disabled",
          actions: this.onDisableStep.bind(this),
        },
        Update: {
          target: "Normal",
          actions: this.onUpdateStep.bind(this),
        },
        FieldError: {
          target: "Error",
          actions: this.onFieldError.bind(this),
        },
        Submit: {
          target: "Wait",
          actions: this.onSubmitStep.bind(this),
        },
        Cancel: {
          target: "Hidden",
          actions: this.onCancelStep.bind(this),
        },
      },
      Disabled: {
        enter: this.onEnterDisabled.bind(this),
        exit: this.onExitDisabled.bind(this),
        Enable: {
          target: "Normal",
          actions: this.onEnableStep.bind(this),
        },
        Hide: {
          target: "Hidden",
          actions: this.onHideStep.bind(this),
        },
      },
      Error: {
        enter: this.onEnterError.bind(this),
        exit: this.onExitError.bind(this),
        Update: [
          {
            target: "Error",
            actions: this.onNotFixError.bind(this),
          },
          {
            target: "Normal",
            actions: this.onFixError.bind(this),
          },
        ],
      },
      Wait: {
        enter: this.onEnterWait.bind(this),
        exit: this.onExitWait.bind(this),
        StepError: {
          target: "Error",
          actions: this.onResponseError.bind(this),
        },
        Completed: {
          target: "Normal",
          actions: this.onCompletedStep.bind(this),
        },
        Timeout: {
          target: "Error",
          actions: this.onTimeoutError.bind(this),
        },
      },
    });
  }

  createStepElement() {
    const step = document.createElement("div");
    step.id = this.stepId;
    step.className = "step hidden";
    this.parentElement.appendChild(step);
    return step;
  }

  // State enter/exit methods
  onEnterHidden() {
    this.element.classList.add("hidden");
  }

  onExitHidden() {
    this.element.classList.remove("hidden");
  }

  onEnterNormal() {
    this.element.classList.add("normal");
  }

  onExitNormal() {
    this.element.classList.remove("normal");
  }

  onEnterDisabled() {
    this.element.classList.add("disabled");
  }

  onExitDisabled() {
    this.element.classList.remove("disabled");
  }

  onEnterError() {
    this.element.classList.add("error");
  }

  onExitError() {
    this.element.classList.remove("error");
  }

  onEnterWait() {
    this.element.classList.add("wait");
  }

  onExitWait() {
    this.element.classList.remove("wait");
  }

  // Transition action methods
  onDisplayStep() {
    // Logic for displaying step
  }

  onHideStep() {
    // Logic for hiding step
  }

  onDisableStep() {
    // Logic for disabling step
  }

  onUpdateStep() {
    // Logic for updating step
  }

  onFieldError() {
    // Logic for handling field error
  }

  onEnableStep() {
    // Logic for enabling step
  }

  onNotFixError() {
    // Logic for handling unresolved error
  }

  onFixError() {
    // Logic for handling resolved error
  }

  onSubmitStep() {
    // Logic for submitting step
  }

  onResponseError() {
    // Logic for handling response error
  }

  onCompletedStep() {
    // Logic for handling completed step
  }

  onTimeoutError() {
    // Logic for handling timeout error
  }

  onCancelStep() {
    // Logic for canceling step
  }

  // Public methods for triggering transitions
  display() {
    this.fsm.transition("Display");
  }

  hide() {
    this.fsm.transition("Hide");
  }

  disable() {
    this.fsm.transition("Disable");
  }

  enable() {
    this.fsm.transition("Enable");
  }

  update() {
    this.fsm.transition("Update");
  }

  fieldError() {
    this.fsm.transition("FieldError");
  }

  submit() {
    this.fsm.transition("Submit");
  }

  cancel() {
    this.fsm.transition("Cancel");
  }

  stepError() {
    this.fsm.transition("StepError");
  }

  completed() {
    this.fsm.transition("Completed");
  }

  timeout() {
    this.fsm.transition("Timeout");
  }
}

export function createStep(parentElement) {
  const step = new Step(parentElement);

  // Add any additional setup or event listeners here

  // Initially display the step
  step.display();

  return step;
}
