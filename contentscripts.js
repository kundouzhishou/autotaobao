alert("empty contenst scirpt");chrome.extension.sendRequest({url:"https://login.taobao.com/member/login.jhtml"}, function(response) {	alert("send request");	$(".TPL_username_1 input").val("jinsuiyong");	$(".TPL_password_1 input").val("jsyjsy19861108");	//$("#J_SubmitStatic").click();});