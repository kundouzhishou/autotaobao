//alert("exec login js ");
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	//alert("login js receive message");
	var usernameTI = document.getElementById('TPL_username_1');
	var passwordTI = document.getElementById('TPL_password_1');
	var submitBtn = document.getElementById('J_SubmitStatic');
	
	//alert(usernameTI + passwordTI + submitBtn);
	if(!usernameTI || !passwordTI || !submitBtn) {
		alert("login failed");
		return;
	}
	
	var account = msg;
	usernameTI.value = account.username;
	passwordTI.value = account.password;
	submitBtn.click();
});