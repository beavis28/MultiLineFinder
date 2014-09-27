chrome.extension.onRequest.addListener(function(request, sender, callback) {
    if (request.action == "getSource") {
        callback(document.getElementsByTagName('body')[0].innerHTML);
    }
});