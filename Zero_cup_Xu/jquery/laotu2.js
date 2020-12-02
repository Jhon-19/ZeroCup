// 搜寻书的按钮
var findBut;

// 书架
var bookshelf

// 书
var book

// 返回按钮
var returnMap

$(document).ready(
    function () {
        // 初始化元素
        findBut = $('#findBut')
        bookshelf = $('#bookshelf')
        // 点击了寻找箭头
        findBut.click(function (){
            findBut.css("visibility", "hidden")
            console.log("搜寻书的按钮被点击了")
            // 让书架缓缓出现
            bookshelf.css('visibility', 'visible')
            bookshelf.css('opacity', '0')
            bookshelf.animate({
                opacity: 1
            }, 1500)

        })

        book = $('#book')
        returnMap = $('#returnMap')
        book.click(function (){
            // 让书先放大，再与书架一同消失
            book.css("transform", "scale(1.5)")
            setTimeout(function (){
                bookshelf.animate({
                    opacity: 0
                }, 1500)
                setTimeout(function (){
                    bookshelf.css('visibility', 'hidden')
                },1500)
            }, 1500)
            setTimeout(function (){
                // 让按钮缓缓出现
                returnMap.css('visibility', 'visible')
                returnMap.css('opacity', '0')
                returnMap.animate({
                    opacity: 1
                }, 1500)
            },3000)
        })

        //为returnMap添加返回功能
        returnMap.click(function (){
            $(location).attr('href', '#')
        })

    }
)
