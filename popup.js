
var text_area = "";

function clickHandler(e) 
{
	text_area = document.getElementById('lines').value;
    chrome.extension.sendMessage({directive: "comparisonClick"}, function(response) 
    {
        //this.close(); // close the popup when the background finishes processing request
    });
    var bg = chrome.extension.getBackgroundPage();
	var cont = bg.result;
	if (cont != null)
	{
		document.write("found result:");
    	document.write(cont);
	}
	else
	{
		document.write("not found");
	}
}

document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById('doComparison').addEventListener('click', clickHandler);
})
