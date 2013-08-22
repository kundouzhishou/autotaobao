chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	var usernameTI = document.getElementById('TPL_username_1');
	var passwordTI = document.getElementById('TPL_password_1');
	var submitBtn = document.getElementById('J_SubmitStatic');
	
	if(!usernameTI || !passwordTI || !submitBtn) {
		alert("login failed");
		return;
	}
	
	var account = mgs;
	usernameTI.value = account.username;
	passwordTI.value = account.password;
	submitBtn.click();
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
        alert("change complete");
    }
});