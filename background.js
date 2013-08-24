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

var urls = new Array("http://item.taobao.com/item.htm?spm=a230r.1.14.1.WAd0cO&id=20595363875&_u=n24q2sl2a48");
						 
function sendMessage(msg) {
	//alert("send message");
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
	// 删除 cookie
	//removeTaobaoCookie();
	//alert("execLogin");
	
	if(index > accounts.length - 1) {
		alert("finish");
		return;
	}
	//alert("index:" + index + ",accounts:" + accounts);
	var account = accounts[index];
	index++;
	//alert("index:" + index + ",username:" + account.username + ",pay:" + account.paypassword);
	
	url = "https://login.taobao.com/member/login.jhtml";
	chrome.tabs.update(lastTabId, { url:url }, function(tab){
		chrome.tabs.executeScript(tab.id,{file:"login.js"},function(){
			//alert("login url complete");
			sendMessage(account);
		});
	});
}

/**
 * 删除所有cookie
 * TODO 执行有问题,会影响调用方的后续代码
 */
function removeTaobaoCookie() {
	alert("remove taobao cookie");
	chrome.cookies.getAll({domain:"taobao.com"}, function(cookies) {
		alert(cookies);
		/*for (var cookie in cookies) {
			var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
  			chrome.cookies.remove({"url": url, "name": cookie.name});
		}*/
	});
}

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.create({url: "http://www.google.com"}, function(tab) {
		//alert("action clicked");
		//removeTaobaoCookie();
		lastTabId = tab.id;
		start();
  	});
})

chrome.tabs.onUpdated.addListener(function(tabid, info, tab) {
	if(info.status == "complete") {
		if(tab.url.indexOf("i.taobao.com") != -1) {
			//alert("login success");
			// TODO
			var url = urls[0];
			chrome.tabs.update(tab.id, { url:url }, function(tab){
				chrome.tabs.executeScript(tab.id,{file:"buy.js"},function(){
					sendMessage({});
				});
			});
		}
	}
	
})