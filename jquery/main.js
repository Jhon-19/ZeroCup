function twinkle(){
    $(".twinkles").animate({
        opacity: 0
    }, 1000)
    setTimeout(function (){
        $(".twinkles").animate({
            opacity: 1
        }, 1000)
    })
}

$(document).ready(function (){
    var id = setInterval(twinkle, 2000)
})