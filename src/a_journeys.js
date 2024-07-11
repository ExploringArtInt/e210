// journeys.js

export function journeyNewAppStart() {
  journey("New App Start", "gui", "App User Interface", "GUI initialization");
}

export function journeyMenuInteraction() {
  journey("Menu Interaction", "gui", "App User Interface", "Opening the app menu");
  journey("Menu Interaction", "gui", "App User Interface", "Focusing menu options");
  journey("Menu Interaction", "gui", "App User Interface", "Closing the app menu");
}

export function journeySaveLoadApp() {
  journey("Save/Load App", "gui", "App User Interface", "Saving the app state");
  journey("Save/Load App", "gui", "App User Interface", "Restoring the app state");
  journey("App Reset", "gui", "App User Interface", "Deleting saved app data");
}

function journey(name, module, feature, scenario) {
  return;
}
