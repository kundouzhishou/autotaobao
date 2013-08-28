var index = 1;

var homeTab = null;
var lastTabId = -1;

var password = "qq625123";
var paypassword = "625123qwe";
var accounts = new Array(
"tanglonger123",
"kundou123",
"zhangxuwe1236",
"qq3097485",
"huadan0625",
"hu7312hu",
"linzm1927",
"yangwencai01");

var buyurl = "http://item.taobao.com/item.htm?spm=a1z10.3.w4002-2087605589.16.HOl1OT&id=22191655680";
						 
function sendMessage(msg){
	//alert("send message");
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs){
		lastTabId = tabs[0].id;
		chrome.tabs.sendMessage(lastTabId, msg);
	});
}

function execLogin() {
	if(index > accounts.length - 1) {
		alert("finish");
		return;
	}
	//alert("index:" + index + ",accounts:" + accounts +",accounts:" + accounts[index]);
	var account = {"username":accounts[index],"password":password,"paypassword":paypassword};
	index++;
	//alert("index:" + index + ",username:" + account.username + ",pay:" + account.paypassword);
	
	url = "https://login.taobao.com/member/login.jhtml";
	chrome.tabs.create({"url":url}, function(tab){
		lastTabId = tab.id;
		chrome.tabs.executeScript(tab.id,{file:"login.js"},function(){
			//alert("login url complete");
			sendMessage(account);
		});
	});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	//alert("brower click");
	homeTab = tab;
	start();
});

function start() {
	//alert("start");
	var home_url = chrome.extension.getURL("home.html");
	var window = chrome.windows.getCurrent;
	
	chrome.tabs.getAllInWindow(window.id, function(tabs) {
		//alert("tabs:" + tabs);
		for(i in tabs) {
			if(tabs[i].id != homeTab.id) {
				chrome.tabs.remove(tabs[i].id);
			}
		}
		
		chrome.tabs.update(homeTab.id, {"selected":true,"url":home_url}, function(tab) {
			//alert("update home success !");
			removeAllCookies();
			//execLogin();
			setTimeout(execLogin,1000); 
		});
	});
}

chrome.tabs.onUpdated.addListener(function(tabid, info, tab) {
	if(info.status == "complete") {
		if(tabContains(tab,"i.taobao.com")) {
			//alert("login success");
			var url = buyurl;
			chrome.tabs.update(tab.id, { url:url }, function(tab){
				//alert("to buy");
				chrome.tabs.executeScript(tab.id,{file:"buy.js"},function(){
					sendMessage({});
				});
			});
		}else if(tabContains(tab,"buy.taobao.com")) {
			chrome.tabs.executeScript(tab.id,{file:"order.js"},function(){
				sendMessage({});
			});
		}else if(tabContains(tab,"cashier.alipay.com")) {
			chrome.tabs.executeScript(tab.id,{file:"pay.js"},function(){
				sendMessage({});
			});
		}else if(tabContains(tab,"trade.taobao.com")) {
			start();
		}
	}
});

function tabContains(tab, url) {
	if(tab.url.indexOf(url) != -1) return true;
	return false;
}

function removeAllCookies() {
	//alert("removeAllCookies");
	chrome.cookies.getAll({}, function(cookies) {
    	for(i in cookies) {
			//alert("remove cookie:" + cookies[i]);
			removeCookie(cookies[i]);
		}
		chrome.cookies.getAll({}, function(cookies) {
			alert("after rm cookie:" + cookies);
		});
  	});
}

function removeCookie(cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
  chrome.cookies.remove({"url": url, "name": cookie.name});
}