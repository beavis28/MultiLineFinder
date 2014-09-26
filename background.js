
/* A function creator for callbacks */
function doStuffWithDOM(domContent) {
    console.log("I received the following DOM content:\n" + domContent);
}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "comparisonClick":
             // execute the content script
            chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDOM);
            //chrome.tabs.query({'active': true}, function(tabs) {chrome.tabs.sendMessage(tab.id, { text: "report_back" }, doStuffWithDOM)});

            sendResponse({}); // sending back empty response to sender
            break;
        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);