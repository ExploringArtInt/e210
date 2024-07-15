// architectural patterns and software design patterns

/*** Creation Patterns
- Singleton Pattern
***/

/*** Structural Patterns

Both the Adaptor Pattern and the Facade Pattern simplify client code by providing a more convenient interface and  promote loose coupling between components.

***/

/*** Adaptor pattern

The Adapter pattern allows incompatible interfaces to work together. It converts the interface of a service into another interface that clients expect. It enables services with incompatible interfaces to collaborate, making them compatible without changing their existing code.

***/

/*** Facade pattern

The Facade pattern simplifies and organizes an interface to a complex set of subsystems by hiding its complexities. It improves the readability and usability.

***/

/*** Behavioral Patterns
 ***/

/*** Finite State Machine (FSM) pattern
This pattern is used to represent and control the behavior of systems that can be in one of a finite number of states. It organizes complex logic into manageable, discrete states. It clearly defines transitions between states based on specific inputs or events. See patterns.test.js for an example of a state transition table.

***/

export const fsmPattern = {
  createMachine(initialState, states) {
    let currentState = initialState;

    const executeActions = (actions, event) => {
      if (Array.isArray(actions)) {
        actions.forEach((action) => action(event));
      } else if (typeof actions === "function") {
        actions(event);
      }
    };

    return {
      transition(event) {
        const currentStateHandler = states[currentState];
        if (currentStateHandler && currentStateHandler[event]) {
          const { target, actions } = currentStateHandler[event];

          // Execute exit actions of the current state
          if (currentStateHandler.exit) {
            executeActions(currentStateHandler.exit, event);
          }

          // Execute transition actions
          if (actions) {
            executeActions(actions, event);
          }

          // Execute enter actions of the new state
          if (states[target].enter) {
            executeActions(states[target].enter, event);
          }

          currentState = target;
          return target;
        }
        return currentState;
      },

      getState() {
        return currentState;
      },

      canTransition(event) {
        const currentStateHandler = states[currentState];
        return !!(currentStateHandler && currentStateHandler[event]);
      },

      isInFinalState() {
        const currentStateHandler = states[currentState];
        return currentStateHandler && currentStateHandler.isFinal === true;
      },
    };
  },
};
