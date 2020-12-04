//各地点
var paiFang
var aoChang
var yingDing
var laoTu
var wanLin
var laoZhaiShe

//各地点地标
var paiFangB
var aoChangB
var yingDingB
var laoTuB
var wanLinB
var laoZhaiSheB

//地图
var map

var isAllFinished = true//判断是否闯关成功

// 五朵花
var flo1, flo2, flo3, flo4, flo5
var flos = [flo1, flo2, flo3, flo4, flo5]
// 成功图片
var success

//闪烁动画
function twinkle() {
    $(".twinkles").animate({
        opacity: 0
    }, 1000)
    setTimeout(function () {
        $(".twinkles").animate({
            opacity: 1
        }, 1000)
    })
}

//请求数据
function getAll() {
    $.ajax({
        method: "post",
        url: "../getdata",
        success: function (data) {
            $.each(JSON.parse(data), function (index, item) {
                switch (index) {
                    case("paiFang"):
                        if (item) {
                            paiFang.css('display', 'none')
                        }
                        isAllFinished = isAllFinished && item
                        break
                    case("aoChang"):
                        if (item) {
                            aoChang.css('display', 'none')
                        }
                        isAllFinished = isAllFinished && item
                        break
                    case("yingDing"):
                        if (item) {
                            yingDing.css('display', 'none')
                        }
                        isAllFinished = isAllFinished && item
                        break
                    case("laoTu"):
                        if (item) {
                            laoTu.css('display', 'none')
                        }
                        isAllFinished = isAllFinished && item
                        break
                    case("wanLin"):
                        if (item) {
                            wanLin.css('display', 'none')
                        }
                        isAllFinished = isAllFinished && item
                        break
                    case("laoZhaiShe"):
                        if (item) {
                            laoZhaiShe.css('display', 'none')
                        }
                        isAllFinished = isAllFinished && item
                        break
                }
            })
        }
    })
}

$(document).ready(function () {
    //初始化各变量
    paiFang = $('#twinkle4')
    aoChang = $('#twinkle1')
    yingDing = $('#twinkle6')
    laoTu = $('#twinkle2')
    wanLin = $('#twinkle5')
    laoZhaiShe = $('#twinkle3')

    paiFangB = $('#plot4')
    aoChangB = $('#plot1')
    yingDingB = $('#plot6')
    laoTuB = $('#plot2')
    wanLinB = $('#plot5')
    laoZhaiSheB = $('#plot3')

    map = $('#backgroundImage')

    for(var i = 1; i < 6; i++){
        flos[i-1] = $('#flo' + i)
        // 一开始花瓣不飘
        flos[i-1].css('animation-play-state', 'paused')
        document.styleSheets[0].addRule('#flo'+i+'::after',
        'animation-play-state:' + 'paused !important');
    }
    success = $('#success')

    //接收后台数据
    getAll()

    var isEnlarged = false//判断是否被放大

    var width0 = map.width()
    var height0 = map.height()

    //记录各地点的偏移量
    var top1 = parseInt(paiFang.css("top").replace(/[^0-9]/ig, ""));
    var left1 = parseInt(paiFang.css("left").replace(/[^0-9]/ig, ""));
    var top2 = parseInt(aoChang.css("top").replace(/[^0-9]/ig, ""));
    var left2 = parseInt(aoChang.css("left").replace(/[^0-9]/ig, ""));
    var top3 = parseInt(yingDing.css("top").replace(/[^0-9]/ig, ""));
    var left3 = parseInt(yingDing.css("left").replace(/[^0-9]/ig, ""));
    var top4 = parseInt(laoTu.css("top").replace(/[^0-9]/ig, ""));
    var left4 = parseInt(laoTu.css("left").replace(/[^0-9]/ig, ""));
    var top5 = parseInt(wanLin.css("top").replace(/[^0-9]/ig, ""));
    var left5 = parseInt(wanLin.css("left").replace(/[^0-9]/ig, ""));
    var top6 = parseInt(laoZhaiShe.css("top").replace(/[^0-9]/ig, ""));
    var left6 = parseInt(laoZhaiShe.css("left").replace(/[^0-9]/ig, ""));

    var top1B = parseInt(paiFangB.css("top").replace(/[^0-9]/ig, ""));
    var left1B = parseInt(paiFangB.css("left").replace(/[^0-9]/ig, ""));
    var top2B = parseInt(aoChangB.css("top").replace(/[^0-9]/ig, ""));
    var left2B = parseInt(aoChangB.css("left").replace(/[^0-9]/ig, ""));
    var top3B = parseInt(yingDingB.css("top").replace(/[^0-9]/ig, ""));
    var left3B = parseInt(yingDingB.css("left").replace(/[^0-9]/ig, ""));
    var top4B = parseInt(laoTuB.css("top").replace(/[^0-9]/ig, ""));
    var left4B = parseInt(laoTuB.css("left").replace(/[^0-9]/ig, ""));
    var top5B = parseInt(wanLinB.css("top").replace(/[^0-9]/ig, ""));
    var left5B = parseInt(wanLinB.css("left").replace(/[^0-9]/ig, ""));
    var top6B = parseInt(laoZhaiSheB.css("top").replace(/[^0-9]/ig, ""));
    var left6B = parseInt(laoZhaiSheB.css("left").replace(/[^0-9]/ig, ""));

    //地图添加点击事件
    map.click(function (e) {
        var x = e.offsetX
        var y = e.offsetY

        if (!isEnlarged) {
            var width = 3 * width0
            var height = 3 * height0
            isEnlarged = true

            offsetX = width0 / 2 - x
            offsetY = height0 / 2 - y

            moveX = -width0 + offsetX * 3
            moveY = -height0 + offsetY * 3

            map.animate({
                backgroundSize: width,
                backgroundPositionX: moveX,
                backgroundPositionY: moveY
            }, 1000)

            paiFang.animate({
                width: 90,
                left: left1*3+moveX,
                top: top1*3+moveY
            }, 1000)
            paiFangB.animate({
                width: 90,
                left: left1B*3+moveX,
                top: top1B*3+moveY
            }, 1000)

            aoChang.animate({
                width: 90,
                left: left2*3+moveX,
                top: top2*3+moveY
            }, 1000)
            aoChangB.animate({
                width: 90,
                left: left2B*3+moveX,
                top: top2B*3+moveY
            }, 1000)

            yingDing.animate({
                width: 90,
                left: left3*3+moveX,
                top: top3*3+moveY
            }, 1000)
            yingDingB.animate({
                width: 90,
                left: left3B*3+moveX,
                top: top3B*3+moveY
            }, 1000)

            laoTu.animate({
                width: 90,
                left: left4*3+moveX,
                top: top4*3+moveY
            }, 1000)
            laoTuB.animate({
                width: 90,
                left: left4B*3+moveX,
                top: top4B*3+moveY
            }, 1000)

            wanLin.animate({
                width: 90,
                left: left5*3+moveX,
                top: top5*3+moveY
            }, 1000)
            wanLinB.animate({
                width: 90,
                left: left5B*3+moveX,
                top: top5B*3+moveY
            }, 1000)

            laoZhaiShe.animate({
                width: 90,
                left: left6*3+moveX,
                top: top6*3+moveY
            }, 1000)
            laoZhaiSheB.animate({
                width: 90,
                left: left6B*3+moveX,
                top: top6B*3+moveY
            }, 1000)
        } else {
            var width = width0
            var height = height0
            isEnlarged = false

            map.animate({
                backgroundSize: width,
                backgroundPositionX: 0,
                backgroundPositionY: 0
            }, 1000)

            paiFang.animate({
                width: 30,
                left: left1,
                top: top1
            }, 1000)
            paiFangB.animate({
                width: 30,
                left: left1B,
                top: top1B
            }, 1000)

            aoChang.animate({
                width: 30,
                left: left2,
                top: top2
            }, 1000)
            aoChangB.animate({
                width: 30,
                left: left2B,
                top: top2B
            }, 1000)

            yingDing.animate({
                width: 30,
                left: left3,
                top: top3
            }, 1000)
            yingDingB.animate({
                width: 30,
                left: left3B,
                top: top3B
            }, 1000)

            laoTu.animate({
                width: 30,
                left: left4,
                top: top4
            }, 1000)
            laoTuB.animate({
                width: 30,
                left: left4B,
                top: top4B
            }, 1000)

            wanLin.animate({
                width: 30,
                left: left5,
                top: top5
            }, 1000)
            wanLinB.animate({
                width: 30,
                left: left5B,
                top: top5B
            }, 1000)

            laoZhaiShe.animate({
                width: 30,
                left: left6,
                top: top6
            }, 1000)
            laoZhaiSheB.animate({
                width: 30,
                left: left6B,
                top: top6B
            }, 1000)

        }

    })

    setTimeout(function (){
        //闯关完成
        if (isAllFinished) {
            //插入结束动画
            for(var i = 1; i < 6; i++){
                flos[i-1] = $('#flo' + i)
                // 一开始花瓣不飘
                flos[i-1].css('animation-play-state', 'running')
                document.styleSheets[0].addRule('#flo'+i+'::after',
                    'animation-play-state:' + 'running !important');
            }
            success.animate({
                opacity: 1
            }, 1500)
        } else {
            var id = setInterval(twinkle, 2000)

            //为各地点添加点击事件
            paiFang.click(function () {
                clearInterval(id)
                $(location).attr('href', 'paifang.html')
            })

            aoChang.click(function () {
                clearInterval(id)
                $(location).attr('href', 'aoChang.html')
            })

            yingDing.click(function () {
                clearInterval(id)
                $(location).attr('href', 'yingding.html')
            })

            laoTu.click(function () {
                clearInterval(id)
                $(location).attr('href', 'laotu.html')
            })

            wanLin.click(function () {
                clearInterval(id)
                $(location).attr('href', 'wanlin.html')
            })

            laoZhaiShe.click(function () {
                clearInterval(id)
                $(location).attr('href', 'laozhaishe.html')
            })
        }
    }, 2000)


})
