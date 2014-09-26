function clickHandler(e) 
{
    chrome.extension.sendMessage({directive: "comparisonClick"}, function(response) 
    {
        //this.close(); // close the popup when the background finishes processing request
    });
}

document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById('doComparison').addEventListener('click', clickHandler);
})
