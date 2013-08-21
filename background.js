chrome.browserAction.onClicked.addListener(function(tab) {
	url = "https://login.taobao.com/member/login.jhtml";
	chrome.tabs.create( { url:url }, function(){
		login();
	});
});

function login() {
	chrome.tabs.executeScript(null,{file:"login.js"},function(){
		//chrome.tabs.onUpdated.addListener(updateTab);
		window.open("https://login.taobao.com/member/login.jhtml");
	});
}

function updateTab( tabId, info, tab ) {	
	//alert("update tab");
	chrome.tabs.getSelected(null, function(tab) {
		if( info.status=="complete" ){ 
			//alert("update complete");
			chrome.tabs.onUpdated.removeListener(updateTab);
		}
    });
}

function getValue(key) {
	return localStorage.getItem(key);
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.type == 'localStorage'){
		//alert("save -- username:" + request.name + ",password:" + request.value);
        localStorage.setItem(request.name, request.value);
    }
});