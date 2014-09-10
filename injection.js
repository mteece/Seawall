/*
*  Inject script on page only once.
*/
var injection = injection || (function(){

    var methods = {};

    methods.browserActionClickEvent = function(){
        var r = /seacoastonline/i,
            p = document.documentURI.replace(document.domain, '').replace('http://', '');
        if(r.test(document.domain)) {
            return document.domain + p;
        } else {
            return false;
        }
    };

    // Listen for messages from the extension.
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var data = {};
        if (methods.hasOwnProperty(request.method)) {
            data = methods[request.method]();
            sendResponse({ data: data });
        }
        return true;
    });

    return true;
})();



