// EntityInput.js

import { fsmPattern } from "./patterns.js";
import { GuidUtils } from "./utilities.js";

/***

Entity Input State Transition Table

|  State      | Event      | Next State  | Actions
|-------------|------------|-------------|--------
| Start       | Create     | HiddenNew   | onCreateInput
| HiddenNew   | Display    | Untouched   | onDisplayInput
| HiddenOld   | Display    | Inactive    | onDisplayInput
| Untouched   | Hide       | HiddenNew   | onHideInput
| Untouched   | Disable    | DisabledNew | onDisableInput
| Untouched   | Touch      | Active      | onTouchInput
| Active      | Hide       | HiddenOld   | onHideInput
| Active      | UpdateIn   | Active      | onUpdateInput
| Active      | UpdateOut  | Inactive    | onUpdateInput
| Active      | Error      | Error       | onError
| Inactive    | Hide       | HiddenOld   | onHideInput
| Inactive    | Disable    | DisabledOld | onDisableInput
| Inactive    | Touch      | Active      | onTouchInput
| Inactive    | Error      | Error       | onError
| DisabledNew | Enable     | Untouched   | onEnableInput
| DisabledNew | Hide       | HiddenNew   | onHideInput
| DisabledOld | Enable     | Inactive    | onEnableInput
| DisabledOld | Hide       | HiddenOld   | onHideInput
| Error       | Update     | Error       | onNotFixError
| Error       | UpdateIn   | Active      | onFixError
| Error       | UpdateOut  | Inactive    | onFixError
| HiddenNew   | Delete     | (none)      | onDeleteInput
| HiddenOld   | Delete     | (none)      | onDeleteInput

State Action Table

Note: New is before touch, Old is after touch
Note: Inactive and Error are after touch
Note: Mask does not change State. It is a flag that impacts display based on Entity Input State.

| State       | Enter Action       | Exit Action       | Is Final State
|-------------|--------------------|-------------------|---------------
| Start       | onEnterStart       | onExitStart       | No
| HiddenNew   | onEnterHiddenNew   | onExitHiddenNew   | No
| HiddenOld   | onEnterHiddenOld   | onExitHiddenOld   | No
| DisabledNew | onEnterDisabledNew | onExitDisabledNew | No
| DisabledOld | onEnterDisabledOld | onExitDisabledOld | No
| Untouched   | onEnterUntouched   | onExitUntouched   | No
| Active      | onEnterActive      | onExitActive      | No
| Inactive    | onEnterInactive    | onExitInactive    | No
| Error       | onEnterError       | onExitError       | No
| Delete      | onEnterDelete      | onExitDelete      | Yes

Input types:
  - Checkbox toggle
  - Radio button set
  - Text

***/

export class EntityInput {
  constructor(parentElement, options = {}) {
    const defaults = {};
    const mergedOptions = { ...defaults, ...options };
    Object.assign(this, mergedOptions);

    this.parentElement = parentElement;
    this.inputId = `entity-input-${GuidUtils.getLocalUniqueID()}`;
    this.element = null;

    this.fsm = fsmPattern.createMachine("Start", {
      Start: {
        enter: this.onEnterStart.bind(this),
        exit: this.onExitStart.bind(this),
        Create: {
          target: "HiddenNew",
          actions: this.onCreateInput.bind(this),
        },
      },
      HiddenNew: {
        enter: this.onEnterHiddenNew.bind(this),
        exit: this.onExitHiddenNew.bind(this),
        Display: {
          target: "Untouched",
          actions: this.onDisplayInput.bind(this),
        },
        Delete: {
          target: "Delete",
          actions: this.onDeleteInput.bind(this),
        },
      },
      HiddenOld: {
        enter: this.onEnterHiddenOld.bind(this),
        exit: this.onExitHiddenOld.bind(this),
        Display: {
          target: "Inactive",
          actions: this.onDisplayInput.bind(this),
        },
        Delete: {
          target: "Delete",
          actions: this.onDeleteInput.bind(this),
        },
      },
      Untouched: {
        enter: this.onEnterUntouched.bind(this),
        exit: this.onExitUntouched.bind(this),
        Hide: {
          target: "HiddenNew",
          actions: this.onHideInput.bind(this),
        },
        Disable: {
          target: "DisabledNew",
          actions: this.onDisableInput.bind(this),
        },
        Touch: {
          target: "Active",
          actions: this.onTouchInput.bind(this),
        },
      },
      Active: {
        enter: this.onEnterActive.bind(this),
        exit: this.onExitActive.bind(this),
        Hide: {
          target: "HiddenOld",
          actions: this.onHideInput.bind(this),
        },
        UpdateIn: {
          target: "Active",
          actions: this.onUpdateInput.bind(this),
        },
        UpdateOut: {
          target: "Inactive",
          actions: this.onUpdateInput.bind(this),
        },
        Error: {
          target: "Error",
          actions: this.onError.bind(this),
        },
      },
      Inactive: {
        enter: this.onEnterInactive.bind(this),
        exit: this.onExitInactive.bind(this),
        Hide: {
          target: "HiddenOld",
          actions: this.onHideInput.bind(this),
        },
        Disable: {
          target: "DisabledOld",
          actions: this.onDisableInput.bind(this),
        },
        Touch: {
          target: "Active",
          actions: this.onTouchInput.bind(this),
        },
        Error: {
          target: "Error",
          actions: this.onError.bind(this),
        },
      },
      DisabledNew: {
        enter: this.onEnterDisabledNew.bind(this),
        exit: this.onExitDisabledNew.bind(this),
        Enable: {
          target: "Untouched",
          actions: this.onEnableInput.bind(this),
        },
        Hide: {
          target: "HiddenNew",
          actions: this.onHideInput.bind(this),
        },
      },
      DisabledOld: {
        enter: this.onEnterDisabledOld.bind(this),
        exit: this.onExitDisabledOld.bind(this),
        Enable: {
          target: "Inactive",
          actions: this.onEnableInput.bind(this),
        },
        Hide: {
          target: "HiddenOld",
          actions: this.onHideInput.bind(this),
        },
      },
      Error: {
        enter: this.onEnterError.bind(this),
        exit: this.onExitError.bind(this),
        Update: {
          target: "Error",
          actions: this.onNotFixError.bind(this),
        },
        UpdateIn: {
          target: "Active",
          actions: this.onFixError.bind(this),
        },
        UpdateOut: {
          target: "Inactive",
          actions: this.onFixError.bind(this),
        },
      },
      Delete: {
        enter: this.onEnterDelete.bind(this),
        exit: this.onExitDelete.bind(this),
        isFinal: true,
      },
    });

    this.fsm.transition("Create");
  }

  // State enter and exit methods
  onEnterStart() {}
  onExitStart() {}
  onEnterHiddenNew() {
    this.hide();
  }
  onExitHiddenNew() {}
  onEnterHiddenOld() {
    this.hide();
  }
  onExitHiddenOld() {}
  onEnterDisabledNew() {
    this.disable();
  }
  onExitDisabledNew() {}
  onEnterDisabledOld() {
    this.disable();
  }
  onExitDisabledOld() {}
  onEnterUntouched() {
    this.show();
  }
  onExitUntouched() {}
  onEnterActive() {
    this.show();
  }
  onExitActive() {}
  onEnterInactive() {
    this.show();
  }
  onExitInactive() {}
  onEnterError() {
    this.showError();
  }
  onExitError() {
    this.hideError();
  }
  onEnterDelete() {
    this.remove();
  }
  onExitDelete() {}

  // Action methods
  onCreateInput() {
    this.createElement();
  }
  onDisplayInput() {
    this.show();
  }
  onHideInput() {
    this.hide();
  }
  onDisableInput() {
    this.disable();
  }
  onTouchInput() {
    this.markAsTouched();
  }
  onUpdateInput() {
    this.updateValue();
  }
  onError(error) {
    this.showError(error);
  }
  onEnableInput() {
    this.enable();
  }
  onNotFixError() {
    // Implement error persistence logic
  }
  onFixError() {
    this.hideError();
  }
  onDeleteInput() {
    this.remove();
  }

  // Helper methods
  createElement() {
    /*
    const { type = "text", label = "", placeholder = "" } = this.options;
    this.element = document.createElement("div");
    this.element.className = "entity-input";
    this.element.innerHTML = `
      <label for="${this.inputId}">${label}</label>
      <input type="${type}" id="${this.inputId}" placeholder="${placeholder}">
      <div class="error-message" style="display: none;"></div>
    `;
    this.parentElement.appendChild(this.element);
    */
  }

  show() {
    if (this.element) {
      this.element.style.display = "block";
    }
  }

  hide() {
    if (this.element) {
      this.element.style.display = "none";
    }
  }

  disable() {
    const input = this.element.querySelector("input");
    if (input) {
      input.disabled = true;
    }
  }

  enable() {
    const input = this.element.querySelector("input");
    if (input) {
      input.disabled = false;
    }
  }

  markAsTouched() {
    this.element.classList.add("touched");
  }

  updateValue() {
    // Implement value update logic
  }

  showError(error) {
    const errorElement = this.element.querySelector(".error-message");
    if (errorElement) {
      errorElement.textContent = error || "An error occurred";
      errorElement.style.display = "block";
    }
  }

  hideError() {
    const errorElement = this.element.querySelector(".error-message");
    if (errorElement) {
      errorElement.style.display = "none";
    }
  }

  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export function createEntityInput(parentElement, options = {}) {
  const entityInput = new EntityInput(parentElement, options);
  entityInput.fsm.transition("Display");
  return entityInput;
}
