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
                flush(uri);
            }
            return true;
    });
}

/*
* Functions.
*/
function browserWindow (uri) {
    chrome.windows.create({url: "http://"+uri, type: "normal", incognito: true, focused: true}, function(window){
        // todo window
    });

    return true;
}

function flush (uri){
    chrome.cookies.getAll({url: "http://www.seacoastonline.com"}, function(cookies) {
        for (var i = 0; i < cookies.length; i++) {
            chrome.cookies.remove({url: cookies[i].domain, name: cookies[i].name}, function(details) {
                //todo details
            });
        }
        browserWindow(uri);
    });
}

/*
* Browser Action Event listeners (Chrome)
*/
chrome.browserAction.onClicked.addListener(browserActionClickEvent);