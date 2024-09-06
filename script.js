document.getElementById('inputRazaoSocial').addEventListener('paste', function(event) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    
    selection.collapseToEnd();
})

document.getElementById('inputObservacao').addEventListener('paste', function(event) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');

    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(text));
    
    selection.collapseToEnd();
})