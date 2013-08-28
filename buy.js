//alert("exec buy js");
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	//alert("buy js receive message");
	
	var ulElement = getElementByTagAndAttribute(document,"ul","data-property",'颜色分类');
	if(ulElement) {
		//alert("has color");
		ulElement.getElementsByTagName("a")[0].click();
	}
	
	var sizeElement = getElementByTagAndAttribute(document,"ul","class",'tb-clearfix J_TSaleProp  ');
	if(sizeElement) {
		sizeElement.getElementsByTagName("a")[0].click();
	}
	
	var buybtn = getElementByTagAndAttribute(document,"a","class","J_ClickCatcher J_LinkBuy");
	var mealbuybtn = getElementByTagAndAttribute(document,"a","id","J_LinkBuy");
	var buy2btn = getElementByTagAndAttribute(document,"a","id","J_SureContinue");
	
	//console.log(mealbuybtn);
	if(!buybtn && !mealbuybtn && !buy2btn) {
		alert("buy failed");
		return;
	}
	if(buybtn) buybtn.click();
	else if(mealbuybtn) mealbuybtn.click();
	else if(buy2btn) buy2btn.click();
});