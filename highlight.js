//bug:如果选中.作为一个reg对象，会作为通配符把所有内容进行替换
/**
 *  2016年10月4日18:59:15 改进代码参考了https://github.com/qishibo/highlightCode/blob/master/highLight.js
 * 
 * */
(function (window, document) {
    var injectSpanClassName = "ChromeExtensionHighlight"

    function removeHighlight(){
        var highlightNodes = document.querySelectorAll('span.'+injectSpanClassName);
        for(var i = 0;i<highlightNodes.length;i++){
            var highlightNode =  highlightNodes[i]
            var parentNode = highlightNode.parentNode
            parentNode.replaceChild(highlightNode.firstChild,highlightNode)
            parentNode.normalize()
        }
    }

    function getSelectString() {

        return document.getSelection().toString() || ""
    }





    function RegExpHandle(string){
        return new RegExp(string,'i')
    }
    function createHighlightNode(){
        var node = document.createElement('span');
        node.className = injectSpanClassName
        return node
    }
    function mapNode(node, keyWord) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.data.replace(/(\s)/g, '') != '') {
                highlight(node, keyWord);
            }
        }

        else if (
            (node.nodeType === Node.ELEMENT_NODE) &&
            node.childNodes &&
            !/(script|style)/i.test(node.tagName) &&
            !(node.tagName === 'SPAN' && node.className === injectSpanClassName)
        ) {
            for (var i = 0; i < node.childNodes.length; i++) {
                mapNode(node.childNodes[i], keyWord);
            }
        }
    }
    function highlight(textNode,selectString) {

        var match = textNode.data.match(RegExpHandle(selectString))
        if(match === null){
            return ;
        }
        console.log("节点匹配到数据")
        var haveSelectStringNode = textNode.splitText(match.index);
        haveSelectStringNode.splitText(match[0].length);
        var selectStringNode = haveSelectStringNode
        var highlightNode = createHighlightNode()
        highlightNode.appendChild(selectStringNode.cloneNode(true))
        selectStringNode.parentNode.replaceChild(highlightNode,selectStringNode)  
    }


     function init(){
         document.body.addEventListener('dblclick', (event) => {
             var selectString = getSelectString();
             if(selectString!=""&&selectString.length>0){
                 console.log(selectString)
                 removeHighlight()
                 mapNode(document.body,selectString)
             }

         }, false)
     }


init()

})(window, document)