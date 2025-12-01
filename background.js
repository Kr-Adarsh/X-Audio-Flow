chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "TURN_ON_LIGHT") {
        // Set a small ON badge on the default extension icon
        chrome.action.setBadgeText({ text: "ON", tabId: sender.tab.id });
        chrome.action.setBadgeBackgroundColor({ color: "#4CAF50", tabId: sender.tab.id });
    } 
    else if (request.action === "TURN_OFF_LIGHT") {
        chrome.action.setBadgeText({ text: "", tabId: sender.tab.id });
    }
});