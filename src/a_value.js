// a_value.js - list of valJourneys focus on "what" is valuable to users and stakeholders

// GUI Mode ValJourneys
export function simpleHTMLValJourney() {
  valJourney("SimpleHTML", "GUI", "TopMenuAndCrumbs", "DisplayUsingSimpleHTML");
}

export function canvasOverlayValJourney() {
  valJourney("CanvasOverlay", "GUI", "2DOverlay", "Display2DCanvasOverlay");
  valJourney("CanvasOverlay", "GUI", "3DOverlay", "Display3DCanvasOverlay");
}

// Dev Demo ValJourney
export function devDemoValJourney() {
  valJourney("DevDemo", "GUI", "SplitLayout", "CreateSplitLayoutWithDifferentGUIModes");
  valJourney("DevDemo", "GUI", "CrossModeNavigation", "EnableTabNavigationAcrossAllGUIModes");
}

function valJourney(name, module, feature, scenario) {
  // Implementation of the valJourney function
  // console.log(`ValJourney: ${name}, Module: ${module}, Feature: ${feature}, Scenario: ${scenario}`);
}
