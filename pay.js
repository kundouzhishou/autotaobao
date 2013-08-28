chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	var orderbtn = document.getElementById("J_Go");
	if(!orderbtn) {
		alert("order btn not exit !");
		return;
	}
	orderbtn.click();
});