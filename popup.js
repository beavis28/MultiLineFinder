
var text_area = "";
var contents = "";
var result = "";

function takeComparison(ts, s)
{
	var lines = ts.split("\n");
	for(var i = 0; i < lines.length; i ++)
	{
		var line = lines[i].trim();
		if (line != null)
		{
			var re = new RegExp(line, "i");
			var ret = s.search(re);
			if (ret != -1)
			{
				result = result + line + "\n";
			}
		}
	}
}

chrome.extension.onMessage.addListener(function(request, sender) {
	  if (request.action == "getSource") {
		  contents = request.source;
	      takeComparison(text_area, contents);
	      document.write(result);
	  }
	});

function clickHandler(e) 
{
	text_area = document.getElementById('lines').value;
	chrome.tabs.executeScript(null, {
	    file: "contentscript.js"
	  }, function() {
	    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
	    if (chrome.extension.lastError) {
	      message.innerText = 'There was an error injecting script : \n' + chrome.extension.lastError.message;
	    }
	  });
}

document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById('doComparison').addEventListener('click', clickHandler);
})
