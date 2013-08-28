function getElementByTagAndAttribute(element,tagname,attname,attvalue) {
    var elems = element.getElementsByTagName(tagname), i;
    for (i in elems) {
		if(elems[i].getAttribute && elems[i].getAttribute(attname) && elems[i].getAttribute(attname).indexOf(attvalue) != -1) {
			return elems[i];
		}
    }
	return undefined;
}