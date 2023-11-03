const { expect } = require('chai');

// Simulate the extension's background script
const backgroundScript = {
  darkModeEnabled: false,

  toggleDarkMode: function () {
    this.darkModeEnabled = !this.darkModeEnabled;
    return this.darkModeEnabled;
  },
};

// Simulate the content script
const contentScript = {
  sendMessageToBackground: function (message) {
    // In a real extension, this would use Chrome's messaging API to send a message to the background script
    return backgroundScript.toggleDarkMode();
  },
};

describe('Extension Integration Tests', function () {
  it('should toggle dark mode feature on and off', function () {
    // Initially, dark mode should be disabled
    expect(backgroundScript.darkModeEnabled).to.be.false;

    // Simulate enabling dark mode from the content script
    const result1 = contentScript.sendMessageToBackground('enableDarkMode');

    // Now, dark mode should be enabled
    expect(result1).to.be.true;
    expect(backgroundScript.darkModeEnabled).to.be.true;

    // Simulate disabling dark mode from the content script
    const result2 = contentScript.sendMessageToBackground('disableDarkMode');

    // Now, dark mode should be disabled again
    expect(result2).to.be.false;
    expect(backgroundScript.darkModeEnabled).to.be.false;
  });
});
