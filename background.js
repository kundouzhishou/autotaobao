var index = 0;

var lastTabId = -1;

var accounts = new Array({
	username: "jinsuiyong",
	password: "jsyjsy19861108",
	paypassword: "11"
},{
	username: "jinsuiyong",
	password: "jsyjsy19861108",
	paypassword: "22"
});
						 
function sendMessage(msg) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    lastTabId = tabs[0].id;
    chrome.tabs.sendMessage(lastTabId, msg);
  });
}

function start() {
	//alert("start");
	execLogin();
}

function execLogin() {
	// É¾³ý cookie
	removeTaobaoCookie();
	alert("execLogin");
	return;
	
	if(index > accounts.length - 1) {
		alert("finish");
		return;
	}
	//alert("index:" + index + ",accounts:" + accounts);
	var account = accounts[index];
	index++;
	alert("index:" + index + ",username:" + account.username + ",pay:" + account.paypassword);
	
	url = "https://login.taobao.com/member/login.jhtml";
	chrome.tabs.update(lastTabId, { url:url }, function(tab){
		chrome.tabs.executeScript(tab.id,{file:"login.js"},function(){
			//alert("login url complete");
			sendMessage(account);
		});
	});
}

/**
 * É¾³ýËùÓÐcookie
 */
function removeTaobaoCookie() {
	alert("remove taobao cookie");
	chrome.cookies.getAll({domain: "taobao.com"}, function(cookies) {
		alert(cookies);
		for (var cookie in cookies) {
			var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
  			chrome.cookies.remove({"url": url, "name": cookie.name});
		}
	});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({url: ""}, function(tab) {
		//alert("action clicked");
		removeTaobaoCookie();
		lastTabId = tab.id;
		start();
  	});
});