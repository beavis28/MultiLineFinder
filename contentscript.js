chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "getSource") {
        callback(document.documentElement.outerHTML);
    	//callback(document.getElementsByTagName('html')[0].innerHTML);
    }
});