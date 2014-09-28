var result = "";
var html_page = "";

function takeComparison(ts, s)
{
	var lines = ts.split("\n");
	for(var i = 0; i < lines.length; i ++)
	{
		var line = lines[i];
		if (line != null)
		{
			var re = new RegExp(line, "i");
			var ret = s.match(re);
			if (ret != null)
			{
				result = result + line + "\n";
			}
		}
	}
}

function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
	}

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        switch (request.directive) {
        case "comparisonClick":
            try {
            	
            	var text = "";
            	var views = chrome.extension.getViews({type: "popup"});
                for (var i = 0; i < views.length; i++) 
                {
                    text = views[i].text_area;
                }
            	
            	//
                chrome.tabs.query ({
                	active: true,               // Select active tabs
                	currentWindow: true     // In the current window
                    }, function (tabs) {
                    var tab = tabs[0];
                    chrome.tabs.sendMessage(tab.id, {action: "getSource"}, function(source) 
                    {
                    	result = "";
                    	html_page = "";
                    	takeComparison(text, source);
                    	html_page = source;
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