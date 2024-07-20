chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === 'getCurrentTabUrl'){
        sendResponse({ url: window.location.href });
    }
});