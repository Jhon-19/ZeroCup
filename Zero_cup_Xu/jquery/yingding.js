//提示文字
var tip = '\n\n\t    开始探险'

//text文本
var introduceText

// 游戏盒
var gameBox
// 狐狸
var fox
// 花
var f1
var f4
// 答案区域
var anserBox
// 气泡中的文本
var bubble
// 答案
var answer

// 返回按钮
var returnMap

// 诗句
var introduction0 = '至若林海闻涛，珞珈翠览。\n' +
                    '空弥淡馥，秋桂之芳袭盈盈；\n' +
                    '霞散朱丹，春樱之枝繁累累。\n' +
                    '殿宇琳玢，楼台列次。\n' +
                    '中外纷呈，古今咸萃。\n' +
                    '信能气吐身轻，心驰神醉。\n' +
                    '鹏志与高天，涵荆楚之厚地。'
var introduction1 = "江城多山，珞珈独秀；\n" +
                    "山上有黉，武汉大学。"
var introductions = [introduction0, introduction1]
var question = "告诉珞珞这里\n一共有多少朵樱花吧~~"

//加载文字动画
function loadText(destination,text) {
    var index = 0
    var str = ''
    //每70ms加载一个字
    var id = setInterval(function (){
        if (index === text.length){
            clearInterval(id)
        }else{
            str += text.charAt(index)
            destination.val(str)
        }
        index++
    }, 70)
}
//开始介绍
function start(){
    // 等待两秒开始介绍
    setTimeout(introduce, 1000)
    // 0.5s时播放背景音乐
    // setTimeout(function (){
    //     bgm.play()
    // }, 500)

    var index = 0
    function introduce() {
        // 预置介绍性文字
        if (index === 0) {
            introduceText.val('')
            introduceText.css('font-size', '30px')
            loadText(introduceText,introductions[0])
        }

        //10s逐渐一次改变介绍文字和fox
        var id = setInterval(changeIntroduction, 7500)

        function changeIntroduction() {
            index++
            loadText(introduceText,introductions[index])
            if (index >= 1) { // 播放完后开始游戏
                clearInterval(id)
                setTimeout(function (){
                    introduceText.css("visibility", "hidden")
                    // 逐渐显现游戏盒
                    gameBox.css('visibility', 'visible')
                    gameBox.css('opacity', '0')
                    gameBox.animate({
                        opacity: 1
                    }, 1500)
                    // 显示字
                    loadText(bubble, question)
                }, 3000)
            }
        }
    }
}

$(document).ready(
    function () {
        var isStart = false
        gameBox = $('#gameBox')
        fox = $('#fox')
        f1 = $('#f1')
        f4 = $('#f4')
        anserBox = $('#answerBox')
        bubble = $('#bubbleText')
        returnMap = $('#returnMap')
        introduceText = $('#introductionText')
        introduceText.val(tip)//显示提示文字
        introduceText.css('font-size', '50px')//设置提示文字字体
        //修改鼠标光标位置
        introduceText.hover(function (){
            introduceText.css('cursor', 'pointer')
        }, function (){
            introduceText.css('cursor', 'default')
        })
        //为文本添加点击一次事件，触发则开始介绍
        introduceText.click(function (){
            if(!isStart){ // 如果没有开始，就开始播放字幕
                isStart = true
                start()
            }
        })

        //验证答案
        answer=$('#answer')
        answer.blur(function (){
            var num = answer.val()
            if (num > 6){
                loadText(bubble, "太大了哦！")
            }else if (num < 6){
                loadText(bubble, "太小了哦！")
                setTimeout(function (){
                    f4.css('transform', 'translate(0px,-100px)')
                }, 200)
            }else {
                loadText(bubble, "你答对啦！")
                setTimeout(function (){
                    // 狐狸和气泡慢慢消失
                    anserBox.animate({
                        opacity: 0
                    }, 1500)
                    fox.animate({
                        opacity: 0
                    }, 1500)
                }, 1200)
                // 花瓣来个花里胡哨
                setTimeout(function (){
                    f1.css('transform', 'translate(450px, -200px) rotate(180deg) scale(15) skew(-30deg)')
                }, 2900)
                setTimeout(function (){
                    gameBox.animate({
                        opacity: 0
                    }, 2000)
                }, 3000)
                setTimeout(function (){
                    // 让按钮缓缓出现
                    returnMap.css('visibility', 'visible')
                    returnMap.css('opacity', '0')
                    returnMap.animate({
                        opacity: 1
                    }, 1500)
                },5000)
            }
        })

        //为returnMap添加返回功能
        returnMap.click(function (){
            $(location).attr('href', '#')
        })
    }
)
