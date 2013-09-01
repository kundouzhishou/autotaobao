var intervalId = 0;

chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	//alert("recive refresh message");
	refreshAccountTable();
});

function start(){
	// 重置cookie状态, 不存在正在执行,只有完成和未执行
	resetCookieState();
	
	var url = select("#targetUrl").value;
	//alert("start:" + url);
    chrome.runtime.sendMessage({
        start:true,
		url:url
    });
	
	//clearInterval(intervalId);
	//intervalId = setInterval(refreshAccountTable(),1000);
}

function select(selector) {
  return document.querySelector(selector);
}

function refreshAccountTable(){
    resetTable();
    var table = select("#accouts");
	var index = 1;
	
    accounts.forEach(function(account){
        var row = table.insertRow(-1);
		
        row.insertCell(-1).innerText = index++;
		row.insertCell(-1).innerText = account;
		
		var isCurrent = false;
		
		var url = select("#targetUrl").value;
		var stateCookie = getCookie(getAccountCookieKey(account,url));
		//alert("cookie state: " + account + "," + stateCookie);
		var state = "未执行";
		if(stateCookie != undefined && stateCookie != "") {
			if(stateCookie == 1) {
				state = "正执行";
				isCurrent = true;
			}else if(stateCookie == 2) {
				state = "已执行";
			}
		}
		row.insertCell(-1).innerText = state;
		
		var curState  = "    ";
		if(isCurrent) {
			curState = " <- ";
			//alert("current accont");
		}
		row.insertCell(-1).innerText = curState;
    });
}

function resetTable(){
    var table = select("#accouts");
    while (table.rows.length > 1) {
        table.deleteRow(table.rows.length - 1);
    }
}

/**
 * 清除正在执行的中间状态
 */
function resetCookieState() {
	accounts.forEach(function(account){
		var url = select("#targetUrl").value;
		var key = getAccountCookieKey(account,url);
		var stateCookie = getCookie(key);
		if(stateCookie != 2) {
			setCookie(key, "");
		}
    });
}

document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#startBtn').addEventListener('click', start);
	//refreshAccountTable();
});
