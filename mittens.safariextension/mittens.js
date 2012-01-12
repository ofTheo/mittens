
function findAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        // Throw error here if you want...
        return;
    }
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'g') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,style,link,meta,script,object,iframe';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(regex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}

function htmlreplace(a, b, element) {    
    if (!element) element = document.body;    
    var nodes = element.childNodes;
    for (var n=0; n<nodes.length; n++) {
        if (nodes[n].nodeType == Node.TEXT_NODE) {
            var r = new RegExp(a, 'gi');
            nodes[n].textContent = nodes[n].textContent.replace(r, b);
        } else {
            htmlreplace(a, b, nodes[n]);
        }
    }
}

function newTheOlds(node) {
    node = node || document.body;
    if(node.nodeType == 3) {
        // Text node
        node.nodeValue = node.nodeValue.split('Mitt ').join('Mittens ');
    } else {
        var nodes = node.childNodes;
        if(nodes) {
            var i = nodes.length;
            while(i--) newTheOlds(nodes[i]);
        }
    }
}


var i = 0;
var c = 0;

function checkMittens(data){
    
    i = setInterval(doReplace, 1000);

    //findAndReplace('Mitt ','Mittens ', document.body);
    
    //document.body.innerHTML = document.body.innerHTML.replace('Mitt','Mittens');
    //alert("checkMittens called");
}

function doReplace(){
    findAndReplace('Mitt ','Mittens ', document.body);
    htmlreplace('Mitt ' , 'Mittens ', document.body);
    newTheOlds(document.body);
    
    if( c > 10 ){
        clearInterval(i);
    }
    c++;
}


if(window.attachEvent) {

  window.attachEvent('onload', checkMittens);

} else {

  if(window.onload) {

    var curronload = window.onload;

    var newonload = function() {

      checkMittens;

    };

    window.onload = newonload;

  } else {

    window.onload = checkMittens;

  }

}

