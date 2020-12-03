//提示性文字
var tips = '\n\n      寻找所有小狐狸\n' +
    '\n        点击此处开始'

//介绍文字
var introduction = '武汉大学万林艺术博物馆由泰康人寿董事长陈东升先生在母校武汉大学2013年120周年校庆之际，' +
    '出资一亿元人民币捐建，由当代著名建筑师朱锫担纲设计。博物馆以陈东升先生父亲的名字命名，' +
    '既缅怀先辈，又符合武汉大学十年树木、百年树人的教育氛围。\n' +
    '整座建筑造型似一块飞来之石，周围绿树环绕，毗邻武大中心湖，傲立珞珈山旁，山、水、林、石互见互注。' +
    '博物馆建筑设计的灵感来源于这样一个典故：陈东升先 生大学毕业时在珞珈山顶一块巨石上刻下了一个“始”字，寓意“千里之行，始于足下”。\n' +
    '博物馆总体建筑面积 8410.3平米，地下一层，地上三层，高达28米。2012年10月奠基，2014年12月完工。' +
    '这座建筑的落成，成就了一个“国内第一”的建筑难度， 建筑总长度为78米，前端悬挑跨度达48米，' +
    '放眼望去，整个建筑的大半楼体都处于悬空状态。' +
    '建筑的外立面用铝合金一块一块人工浇筑、敲打而成，通过光线的漫反射与周围的自然环境相融合；' +
    '而其凹凸的手工感，像一块从天外飞来的巨大陨石，因此有人把这座建筑称为“飞来石”。\n' +
    '博物馆于2015年5月9日开馆，并举办了“聚变：1930年代以来的中国现当代艺术”展览。' +
    '陈东升先生在开馆之际又捐赠给博物馆40余件、总价值3000万元人民币的中国现当代艺术精品，以启动博物馆的馆藏建设。\n' +
    '博物馆开馆以后，泰康人寿旗下的泰康空间每年将在此举办一至两次当代艺术展，其它时间则由博物馆自主策划展览。' +
    '博物馆负一层将设置两个固定展厅和一个流动展厅，固定展厅展示武汉大学 120多年办学历史积累下的文物、艺术品和动物标本，' +
    '以及武汉大学以两次“全国十大考古发现”为代表的考古与博物馆学学科成果；' +
    '流动展厅展示武大教职工、校友、社会捐赠的藏品和公益性的临时展览。\n' +
    '万林艺术博物馆已成为武汉大学新的地标建筑，为以山水、园林、近代建筑闻名的“全国最美丽的校园之一”的武汉大学增添了新的景观，' +
    '也必将成为武汉大学历史文化教育、艺术教育的重要基地。\n'

//介绍性文本框
var introduceText
//各fox图标
var fox0
var fox1
var fox2
var fox3
//两个预览按钮
var panorama//全景
var glimpse//掠影
var returnMap//返回地图
var panoramaFrame//全景div
var glimpseFrame//掠影div

$(document).ready(function () {
    var isFirstClick = false//文本框只允许点击一次
    var isFoxClicked = [false, false, false, false]
    //初始化各元素
    introduceText = $('#introductionText')
    fox0 = $('#fox0')
    fox1 = $('#fox1')
    fox2 = $('#fox2')
    fox3 = $('#fox3')
    panorama = $('#panorama')
    glimpse = $('#glimpse')
    returnMap = $('#returnMap')
    panoramaFrame = $('#panoramaFrame')
    glimpseFrame = $('#glimpseFrame')

    //修改鼠标图样
    introduceText.hover(function () {
        introduceText.css('cursor', 'pointer')
    }, function () {
        introduceText.css('cursor', 'default')
    })

    //显示提示性文字
    introduceText.val(tips)
    introduceText.click(function () {
        if (!isFirstClick) {
            isFirstClick = true//不允许再点击
            introduceText.css('display', 'none')
            //将鼠标改回原来样子
            introduceText.hover(function () {
                introduceText.css('cursor', 'default')
            }, function () {
                introduceText.css('cursor', 'default')
            })
            //显示fox
            fox0.css('display', 'inline')
            fox1.css('display', 'inline')
            fox2.css('display', 'inline')
            fox3.css('display', 'inline')
        }
    })
    //添加点击事件
    fox0.click(function () {
        fox0.css('filter', 'grayScale(80%)')
        isFoxClicked[0] = true
        judgeClicked(isFoxClicked)
    })
    fox1.click(function () {
        fox1.css('filter', 'grayScale(80%)')
        isFoxClicked[1] = true
        judgeClicked(isFoxClicked)
    })
    fox2.click(function () {
        fox2.css('filter', 'grayScale(80%)')
        isFoxClicked[2] = true
        judgeClicked(isFoxClicked)
    })
    fox3.click(function () {
        fox3.css('filter', 'grayScale(80%)')//点击则灰度化
        isFoxClicked[3] = true
        judgeClicked(isFoxClicked)
    })

})

//判断是否全部被点击
function judgeClicked(isFoxClicked) {
    var isAllClicked = true
    for (var i = 0; i < isFoxClicked.length; i++) {
        isAllClicked = isAllClicked && isFoxClicked[i]
    }
    //全部被点击，则展示对万林的介绍
    if (isAllClicked) {
        start()
        introduceText.hover(function () {
            introduceText.css('cursor', 'default')
        }, function () {
            introduceText.css('cursor', 'default')
        })
        //让fox渐渐消失
        fox0.animate({
            opacity: 0
        }, 500)
        fox1.animate({
            opacity: 0
        }, 500)
        fox2.animate({
            opacity: 0
        }, 500)
        fox3.animate({
            opacity: 0
        }, 500)
        fox0.css('display', 'none')
        fox1.css('display', 'none')
        fox2.css('display', 'none')
        fox3.css('display', 'none')
        $.ajax({
            method:"post",
            url:"setdata",
            data:{
                "type":"wanLin"
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

//加载文字动画
function loadText(text) {
    var index = 0
    var str = ''
    //每20ms加载一个字
    var id = setInterval(function () {
        if (index === text.length) {
            clearInterval(id)
        } else {
            str += text.charAt(index)
            introduceText.val(str)
            var scrollHeight = introduceText[0].scrollHeight
            introduceText.scrollTop(scrollHeight)
        }
        index++
    }, 20)
}

function start() {
    //文本框过渡
    introduceText.val('')
    introduceText.css('opacity', '0')
    introduceText.css('display', 'inline')
    introduceText.css('font-size', '30px')
    introduceText.animate({
        opacity: 1
    }, 1000)
    setTimeout(introduce, 1500)

    function introduce() {
        loadText(introduction)
    }

    //介绍加载结束开始显示预览按钮和返回地图按钮
    setTimeout(showPreview, 20000)
}

function showPreview() {
    var isPanorama = false
    var isGlimpse = false
    //去除文本框
    introduceText.animate({
        opacity: 0
    }, 1000)

    var id
    var index = 0
    setTimeout(function () {
        introduceText.css('display', 'none')
        //显示各按钮
        panorama.css('display', 'inline')
        glimpse.css('display', 'inline')
        returnMap.css('display', 'inline')
        //动态修改背景图片
        id = setInterval(function () {
            index++
            if (index >= 3) {
                index = index % 3
            }
            var path = 'url("../images/WanlinPics/background' + index + '.jpg")'
            $('#backgroundImage').animate({
                opacity: 0.75
            }, 1000)
            setTimeout(function () {
                $('#backgroundImage').animate({
                    opacity: 1
                }, 1000)
                $('#backgroundImage').css('background-image', path)
            }, 1000)
        }, 5000)
    }, 1000)
    //为各按钮添加点击事件
    panorama.click(function () {
        if (isGlimpse) {
            glimpseFrame.css('display', 'none')
        }
        if (!isPanorama) {
            moveDownButton()
            panoramaFrame.css('display', 'inline')
            isPanorama = true
        } else {
            panoramaFrame.css('display', 'none')
            moveUpButton()
            isPanorama = false
        }
    })
    glimpse.click(function () {
        if (isPanorama) {
            panoramaFrame.css('display', 'none')
        }
        if (!isGlimpse) {
            moveDownButton()
            glimpseFrame.css('display', 'inline')
            isGlimpse = true
        } else {
            glimpseFrame.css('display', 'none')
            moveUpButton()
            isGlimpse = false
        }
    })
    returnMap.click(function () {
        // alert(glimpseFrame.css('display'))
        // alert(panoramaFrame.css('display'))
        clearInterval(id)
        if (isGlimpse) {
            glimpseFrame.css('display', 'none')
        }
        if (isPanorama) {
            panoramaFrame.css('display', 'none')
        }
        moveUpButton()
    })
}

//各按钮下移
function moveDownButton() {
    panorama.animate({
        top: '600px',
        left: '220px'
    })
    glimpse.animate({
        top: '600px',
        left: '440px'
    })
    returnMap.animate({
        top: '600px',
        left: '660px'
    })
}

//各按钮上移
function moveUpButton() {
    panorama.animate({
        top: '230px',
        left: '440px'
    })
    glimpse.animate({
        top: '330px',
        left: '440px'
    })
    returnMap.animate({
        top: '430px',
        left: '440px'
    })
}