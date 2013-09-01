function getElementByTagAndAttribute(element, tagname, attname, attvalue){
    var elems = element.getElementsByTagName(tagname), i;
    for (i in elems) {
        if (elems[i].getAttribute && elems[i].getAttribute(attname) && elems[i].getAttribute(attname).indexOf(attvalue) != -1) {
            return elems[i];
        }
    }
    return undefined;
}

function getCookie(c_name){
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) 
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

function setCookie(c_name, value, expiredays){
	//console.log("set cookie:" + c_name + "," + value);
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
    ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getAccountCookieKey(account, url) {
	//alert("get account cookie key:" + url);
	return account + "#" + url;
}
