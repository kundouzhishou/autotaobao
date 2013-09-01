var index = 0;

var homeWindow = null;
var homeTab = null;
var workTab = null;

var buyurl = "";

function sendMessage(msg){
    chrome.tabs.getAllInWindow(homeWindow.id, function(tabs){
        for (i in tabs) {
            if (tabs[i].id == workTab.id) {
                chrome.tabs.sendMessage(workTab.id, msg);
                //alert("sendmessage id: " + tabs[i].id);
            }
        }
    });
}

function execLogin(){
    //alert("execlogin:" + accounts);
    //console.log("execlogin:" + accounts);
    if (index > accounts.length - 1) {
        alert("finish");
        return;
    }
    
    //alert("index:" + index + ",accounts:" + accounts +",accounts:" + accounts[index]);
    var account = {
        "username": accounts[index],
        "password": password,
        "paypassword": paypassword
    };
    //alert("index:" + index + ",username:" + account.username + ",pay:" + account.paypassword);
    
    if (getCookie(getAccountCookieKey(account, buyurl)) != "") {
        alert("already done, do next");
        execLogin();
        return;
    }
    
    //alert("setcookie=1 :" + accounts[index] + "," + buyurl);
    setCookie(getAccountCookieKey(accounts[index], buyurl), 1);
    updateHomeStats();
    //alert(getCookie(getAccountCookieKey(accounts[index],buyurl)));
    
    closeTabExceptHomeTab();
    url = "https://login.taobao.com/member/login.jhtml";
    chrome.tabs.create({
        "url": url
    }, function(tab){
		workTab = tab;
        chrome.tabs.executeScript(tab.id, {
            file: "login.js"
        }, function(){
            sendMessage(account);
        });
    });
    
    ++index;
}

chrome.browserAction.onClicked.addListener(function(tab){
    //alert("brower click");
    homeTab = tab;
    chrome.windows.getCurrent(function(window) {
		homeWindow = window;
		//alert("hometab id: " + homeTab.id + ",winid:" + homeWindow.id);
		start();
	});
});

function start(){
    //alert("start");
    var home_url = chrome.extension.getURL("home.html");
    
    chrome.tabs.getAllInWindow(homeWindow.id, function(tabs){
        //alert("tabs:" + tabs);
        for (i in tabs) {
            if (tabs[i].id != homeTab.id) {
                chrome.tabs.remove(tabs[i].id);
            }
        }
        
        chrome.tabs.update(homeTab.id, {
            "selected": true,
            "url": home_url
        }, function(tab){
            //alert("update home success !");
            //removeAllCookies(); 
        });
    });
}

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse){
    if (msg.start) {
        //alert("receive start message");
        buyurl = msg.url;
        
        index = 0;
        
        closeTabExceptHomeTab();
        execLogin();
    }
});

chrome.tabs.onUpdated.addListener(function(tabid, info, tab){
    if (tab != workTab.id) {
		//alert("not tab");
		return;
	}
    
    if (info.status == "complete") {
        if (tabContains(tab, "i.taobao.com")) {
            //alert("login success");
            var url = buyurl;
            chrome.tabs.update(tab.id, {
                url: url
            }, function(tab){
                //alert("to buy");
                chrome.tabs.executeScript(tab.id, {
                    file: "buy.js"
                }, function(){
                    sendMessage({});
                });
            });
        }
        else 
            if (tabContains(tab, "buy.taobao.com")) {
                chrome.tabs.executeScript(tab.id, {
                    file: "order.js"
                }, function(){
                    sendMessage({});
                });
            }
            else 
                if (tabContains(tab, "cashier.alipay.com")) {
                    chrome.tabs.executeScript(tab.id, {
                        file: "pay.js"
                    }, function(){
                        sendMessage({});
                    });
                }
                else 
                    if (tabContains(tab, "trade.taobao.com")) {
                        // 完成购买
                        setCookie(getAccountCookieKey(accounts[index], buyurl), 2);
                        updateHomeStats();
                        start();
                    }
    }
});

function tabContains(tab, url){
    if (tab.url.indexOf(url) != -1) 
        return true;
    return false;
}

function removeAllCookies(){
    //alert("removeAllCookies");
    chrome.cookies.getAll({}, function(cookies){
        for (i in cookies) {
            //alert("remove cookie:" + cookies[i]);
            removeCookie(cookies[i]);
        }
        chrome.cookies.getAll({}, function(cookies){
            alert("after rm cookie:" + cookies);
        });
    });
}

function removeCookie(cookie){
    var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
    cookie.path;
    chrome.cookies.remove({
        "url": url,
        "name": cookie.name
    });
}

function closeTabExceptHomeTab(){
    chrome.tabs.getAllInWindow(homeWindow.id, function(tabs){
        for (i in tabs) {
            if (tabs[i].id != homeTab.id) {
                chrome.tabs.remove(tabs[i].id);
            }
        }
    });
}

function updateHomeStats(){
    //chrome.tabs.sendMessage(homeTab.id);
}
