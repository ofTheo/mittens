(function(){

var xpath = "descendant-or-self::text()[contains(., 'mitt ') or contains(., 'Mitt ')]";
var regex = /(M)itt /ig;
var replacement = '$1ittens ';

function traverseSubtree(base) {
	var list = document.evaluate(xpath, base, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, node = null; (node = list.snapshotItem(i)); i++) {
        	node.nodeValue = node.nodeValue.replace(regex, replacement);
	}
}

traverseSubtree(document);

document.body.addEventListener('DOMNodeInserted', function(event) {
	traverseSubtree(event.target);
}, false);

document.body.addEventListener('DOMCharacterDataModified', function(event) {
	if (event.newValue.match(regex)) {
		event.target.nodeValue = event.newValue.replace(regex, replacement);
	}
}, false);

})();

