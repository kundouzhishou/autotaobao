//alert("exec order js");
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	//alert("order js receive message");
	var orderbtn = document.getElementById("J_Go");
	if(!orderbtn) {
		//alert("order btn not exit !");
		return;
	}
	orderbtn.click();
});