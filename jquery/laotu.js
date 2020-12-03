
//fox图标
var fox
//进入图标
var enterBut

//text文本
var theText = '这武大老图书馆里面藏\n' +
    '着通识经典教材，\n' +
    '快去帮我找找吧~~'

var introduceText

//加载文字动画
function loadText(text) {
    introduceText.css('visibility', 'visible')

    var index = 0
    var str = ''
    //每70ms加载一个字
    var id = setInterval(function (){
        if (index === text.length){
            clearInterval(id)
        }else{
            str += text.charAt(index)
            introduceText.val(str)
        }
        index++
    }, 70)
    setInterval(function () {
        enterBut.css('visibility', 'visible')
    }, 2700)
}

//开始介绍
function start() {
    // 等待一秒开始介绍
    setTimeout(
    function(){
        // 预置介绍性文字
        introduceText.val('')
        introduceText.css('font-size', '30px')
        loadText(theText)
    },2500)
}

$(document).ready(
    function () {
        //初始化元素
        fox = $('#fox')
        enterBut = $('#enterBut')
        introduceText = $('#introductionText')
        fox.animate(
            {
                width: '100px',
                height: '100px'
            }, 1500)

        start()
    }
)
