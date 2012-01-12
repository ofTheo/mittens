function newTheOlds(node) {
    node = node || document.body;
    if(node.nodeType == 3) {
        // Text node
        node.nodeValue = node.nodeValue.split('Mitt ').join('Mittens ');
        node.nodeValue = node.nodeValue.split('mitt ').join('mittens ');
    } else {
        var nodes = node.childNodes;
        if(nodes) {
            var i = nodes.length;
            while(i--) newTheOlds(nodes[i]);
        }
    }
}

function replaceText() {
    $("*").each(function() { 
        if($(this).children().length==0) { 
            $(this).text($(this).text().replace('Mitt ', 'Mittens ')); 
            $(this).text($(this).text().replace('mitt ', 'mittens ')); 
        } 
    });

	newTheOlds();

}


$(document).ready(replaceText);
$("html").ajaxStop(replaceText);