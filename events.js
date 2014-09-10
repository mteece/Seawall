/*
* Injection
*/
function injectedMethod (tab, method, callback) {
    chrome.tabs.executeScript(tab.id, { file: 'injection.js' }, function(){
        chrome.tabs.sendMessage(tab.id, { method: method }, callback);
    });
}

/*
* Event handler(s) for button click.
*/
function browserActionClickEvent (tab) {
    injectedMethod(tab, 'browserActionClickEvent', function (response) {
            var uri = response.data;
            if(uri){
                chrome.windows.create({url: "http://"+uri, type: "normal", incognito: true, focused: true}, function(window){
                    // Callback for newly created window.
                });
            }
            return true;
    });
}

/*
* Browser Action Event listeners (Chrome)
*/
chrome.browserAction.onClicked.addListener(browserActionClickEvent);