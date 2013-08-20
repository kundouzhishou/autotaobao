function click(e) {
	var username = document.getElementById('usernameLabel').value;
	var password = document.getElementById('passwordLabel').value;
	var bg = chrome.extension.getBackgroundPage();
	saveStorage("tb-username", username);
	saveStorage("tb-password", password);
	bg.openLoginUrl();
}

function saveStorage(name, value) {
	chrome.runtime.sendMessage({
		type: 'localStorage',
		name: name,
		value: value
	});
}

document.addEventListener('DOMContentLoaded', function () {
	var btn = document.getElementById("loginInput");
	btn.addEventListener('click', click);
})

