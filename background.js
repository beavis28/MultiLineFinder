
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "comparisonClick":
            try {
                chrome.tabs.getSelected(null, function (tab) {
                    chrome.tabs.sendRequest(tab.id, {action: "getSource"}, function(source) {
                        alert(source);
                    });
                });
            }
            catch (ex) {
                alert(ex);
            }

            sendResponse({}); // sending back empty response to sender
            break;
        default:
            // helps debug when request directive doesn't match
            alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
);