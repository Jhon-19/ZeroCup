//各地点
var paiFang
var aoChang
var yingDing
var laoTu
var wanLin
var laoZhaiShe

var isAllFinished = true//判断是否闯关成功


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
            $.each(data.result, function (index, item) {
                switch (index) {
                    case("paiFang"):
                        if (item) {
                            paiFang.css('display', 'none')
                        }
                        break
                    case("aoChang"):
                        if (item) {
                            aoChang.css('display', 'none')
                        }
                        break
                    case("yingDing"):
                        if (item) {
                            aoChang.css('display', 'none')
                        }
                        break
                    case("laoTu"):
                        if (item) {
                            laoTu.css('display', 'none')
                        }
                        break
                    case("wanLin"):
                        if (item) {
                            wanlin.css('display', 'none')
                        }
                        break
                    case("laoZhaiShe"):
                        if (item) {
                            laoZhaiShe.css('display', 'none')
                        }
                        break
                }
            })
        }
    })
}

$(document).ready(function () {
    getAll()
    var id = setInterval(twinkle, 2000)

    //初始化各变量
    paiFang = $('#twinkle4')
    aoChang = $('#twinkle1')
    yingDing = $('#twinkle6')
    laoTu = $('#twinkle2')
    wanLin = $('#twinkle5')
    laoZhaiShe = $('#twinkle3')

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

})