//alert("exec buy js");
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
	//alert("buy js receive message");
	var buybtn = getElementByTagAndAttribute(document,"a","class","J_ClickCatcher J_LinkBuy");
	alert(buybtn);
	var ulElement = getElementByTagAndAttribute(document,"ul","data-property",'颜色分类');
	if(ulElement) {
		//alert("has color");
		ulElement.getElementsByTagName("a")[0].click();
	}
	if(!buybtn) {
		alert("buy failed");
		return;
	}
	buybtn.click();
});

function getElementByTagAndAttribute(element,tagname,attname,attvalue) {
    var elems = element.getElementsByTagName(tagname), i;
    for (i in elems) {
		if(elems[i].getAttribute(attname) && elems[i].getAttribute(attname).indexOf(attvalue) != -1) {
			return elems[i];
		}
    }
	return undefined;
}