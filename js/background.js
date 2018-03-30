// Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version
// http://developer.chrome.com/extensions/runtime.html#event-onInstalled
chrome.runtime.onInstalled.addListener(function (details) {

    // good place to set default options
    function setDefaults(callback) {
        storage.area.get(function (stored_options) {
            var default_options = storage.default_options,
                option,
                new_options = {};
            for (option in default_options) {
                if (!stored_options.hasOwnProperty(option)) {
                    new_options[option] = default_options[option];
                }
            } 
            if (Object.keys(new_options).length !== 0) {
                // save to area if new default options is appeared
                storage.area.set(new_options, function () {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            } else {
                if (typeof callback === 'function') {
                    callback();
                }
            }
        });
    }

    switch (details.reason) {
    case 'update':
        setDefaults();
        break;
    default:
        break;
    }
});

chrome.runtime.onUpdateAvailable.addListener(function (details) {
    // when an update is available - reload extension
    // update will be install immediately
    chrome.runtime.reload();
});


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     chrome.tabs.query(
//         { currentWindow: true, active: true },
//         function (tabArray) {

//    if (tabArray.length !== 0 && tabArray[0].status == 'complete') {   
// debugger;
//             chrome.tabs.executeScript(tabArray[0].id, {
//                 file: 'js/content_script.js'
//              }, function() { 

//             })
//         }

//         }
//     );
// }); 