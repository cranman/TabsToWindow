chrome.commands.onCommand.addListener(function(command) {
    if (command !== 'tabsToWindow')
        return;

    chrome.tabs.query({highlighted:true, currentWindow:true}, function(tabs) {
        var tabsToMove = tabs.map(function(tab) { return tab.id; });

        if (tabsToMove.length == 0)
            return;

        chrome.windows.create(function(newWindow) {
            chrome.tabs.query({windowId:newWindow.id}, function(newTabs) {
                chrome.tabs.move(tabsToMove, {windowId:newWindow.id,index:-1}, function(movedTabs) {
                    chrome.tabs.remove(newTabs[0].id);
                });
            });
        });
    });
});