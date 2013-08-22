//alert("exec buy js ");
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	alert("buy js receive message");
	var buybtn = document.getElementById('J_ClickCatcher J_LinkBuy');
	
	var propertyBtn = undefined;
	if(document.getElementById('tb-txt')) {
		propertyBtn = document.getElementById('tb-txt');
	}else if(document.getElementById('J_ClickCatcher')) {
		propertyBtn = document.getElementById('J_ClickCatcher');
	}
	alert(buybtn);
	if(!buybtn) {
		alert("buy failed");
		return;
	}
	if(!propertyBtn) {
		//propertyBtn.click();
		alert("click property");
	}
	alert("buy..");
	buybtn.click();
});