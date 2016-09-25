//bug:如果选中.作为一个reg对象，会作为通配符把所有内容进行替换

(function (window, document) {
    var injectSpanClassName = "Extensionhihglight"
    var injectSpanStyle = "background:RGB(51,139,247)"
    var SelectString;
    function getSelectString() {

        return document.getSelection() || null
    }
    /**
     * 希望能设置高亮的范围，比如当前代码段
     */
    function highlight(SelectionObject) {

        if (!SelectionObject || SelectionObject.toString().length == 0) {
            return;
        }
        SelectString = SelectionObject.toString()
        var needToReplaceNode = SelectionObject.anchorNode.parentNode.parentNode

        var replaceRe = new RegExp(SelectString, 'g');
        //console.log("selectNode:" + SelectionObject.anchorNode.nodeName + "parentNode" + needToReplaceNode.tagName)
        highlightSpan = "<span class=\"" + injectSpanClassName + "\" style=\"" + injectSpanStyle + "\">" + SelectString + "</span>"
        needToReplaceNode.innerHTML = needToReplaceNode.innerHTML.replace(replaceRe, highlightSpan)
        return;
    }
    function removeHighlight(){
        var injectElements = document.querySelectorAll('.Extensionhihglight')
        injectElements.forEach(item=>{
            item.removeAttribute("style");
        })
    }
    document.body.addEventListener('mouseup', () => {
        removeHighlight()
        var SelectionObject = getSelectString()
        highlight(SelectionObject)
    }, false)




})(window, document)