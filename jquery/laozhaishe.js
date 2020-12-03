//提示文字
var tip = '\n\n\t    开始探险'

//介绍性文字
var introduction0 = '老斋舍，狮子山南坡位于图书馆前，\n' +
    '是武汉大学最早的学生宿舍，也是校园早期建筑群之一。\n' +
    '于1930年3月开工建设，1931年9月竣工。'

var introduction1 = '老斋舍最早是男生寄宿宿舍，挨着老斋舍的是学生饭厅及俱乐部，' +
    '学生饭厅一楼前后都是落地长窗，室内光线充足。' +
    '\n二楼改造成为学生俱乐部，其内部装饰极富民族特色，' +
    '房梁上有“宝葫芦插三戟”，祝福学生连升三级。' +
    '\n房梁角的木纹上雕刻有“蝠（福）在眼前”，蝙蝠睁大眼睛，看着下巴前的铜钱。'

var introduction2 = '老斋舍依狮子山而建，共有四栋，' +
    '由山脚走道入口处的三座罗马券拱门联为一体。' +
    '\n每栋宿舍由两个大天井将宿舍分割为前、中、后三排，依山势高低分为四层。' +
    '\n每栋每层分别以《千字文》中的“天地玄黄，宇宙洪荒，日月盈昃，辰宿列张”命名。'

var introduction3 = '别看老斋舍历史悠久，现代化生活设施可不少。\n' +
    '无线网覆盖，中央空调，智能用电系统……为了不影响建筑外观，' +
    '老斋舍使用了中央空调，保证了居住的舒适度。' +
    '\n水房、浴室和卫生间一应俱全，浴室和卫生间分区设计，为学生生活增添便利。\n'

var introductions = [introduction0, introduction1, introduction2, introduction3]

//fox图片路径
var path = '../images/LaozhaishePics/'

//背景音乐对象
var bgm
//fox图标
var fox
//text文本
var introduceText
//返回地图按钮
var returnMap

//修改fox的动画
function changeFox(index) {
    //让上一个fox 1s内逐渐消失
    fox.animate({
        opacity: 0
    }, 1000)
    //上一个fox消失后，1s内逐渐显示下一个fox
    setTimeout(function (){
        fox.attr('src', path + 'fox' + index + '.png')
        fox.animate({
            opacity: 1
        }, 1000)
    }, 1000)
}

//加载文字动画
function loadText(text) {
    var index = 0
    var str = ''
    //每20ms加载一个字
    var id = setInterval(function (){
        if (index === text.length){
            clearInterval(id)
        }else{
            str += text.charAt(index)
            introduceText.val(str)
        }
        index++
    }, 20)
}

//开始介绍
function start(){
    // 等待两秒开始介绍
    setTimeout(introduce, 1000)
    // 0.5s时播放背景音乐
    setTimeout(function (){
        bgm.play()
    }, 500)

    var index = 0
    function introduce() {
        // 预置介绍性文字
        if (index === 0) {
            introduceText.val('')
            introduceText.css('font-size', '30px')
            loadText(introductions[0])
        }

        //5s逐渐一次改变介绍文字和fox
        var id = setInterval(changeIntroduction, 5000)

        function changeIntroduction() {
            index++
            changeFox(index)
            loadText(introductions[index])
            if (index >= 3) {
                clearInterval(id)//清除改变动画
                setTimeout(function (){
                    bgm.pause()//2s后关闭背景音乐
                }, 2000)
                $.ajax({
                    method:"post",
                    url:"setdata",
                    data:{
                        "type":"laoZhaiShe"
                    },
                    success:function(data){
                        if(data==="成功")
                            console.log("成功上传数据。");
                        else
                            console.log("上传数据失败："+data);
                    }
                })
            }
        }
    }
}

$(document).ready(
    function () {
        var isStart = false

        //初始化元素
        fox = $('#fox')
        introduceText = $('#introductionText')
        returnMap = $('#returnMap')
        //第一只fox 2s内逐渐进入
        fox.animate(
            {
                width: '120px',
                height: '150px'
            }, 2000)
        bgm = $('#bgm')[0]//获取bgm对象
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
            if(!isStart){
                isStart = true
                start()
            }
        })

        //为returnMap添加返回功能
        returnMap.click(function (){
            $(location).attr('href', 'main.html')
        })
    }
)
