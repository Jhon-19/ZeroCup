canv = document.getElementById("game");
    context = canv.getContext("2d");
    complete = false;
    progress = 0;
    intro = document.getElementById("intro").innerText;
    window.onresize = renderCanvas;
    window.onload = function () {
        canv.className = "game";
        document.getElementById("loading").remove();
        document.getElementById("text").innerHTML = "";
        canv.ontouchstart = function (e) {
            doclick({x: e.touches[0].clientX, y: e.touches[0].clientY});
        }
        renderCanvas();
    }

    function displayIntro() {
        progress++;
        if (progress > intro.length)
            progress = intro.length;
        document.getElementById("text").innerText = intro.substring(0, progress);
    }

    function renderCanvas() {
        w = canv.width = canv.clientWidth;
        h = canv.height = canv.clientHeight;
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, w, h);
        renderBackgroundImg(document.getElementById("paifang_bg"));
        context.fillStyle = "#FFFFFF70";
        context.fillRect(0, 0, w, h);
        if (complete)
            return;
        ispc = canv.width > canv.height;
        if (ispc) {
            drawImagePortion(document.getElementById("paifang_choice1"), 0.05, 0.05, 0.2);
            drawImagePortion(document.getElementById("paifang_choice2"), 0.35, 0.05, 0.2);
            drawImagePortion(document.getElementById("paifang_choice3"), 0.65, 0.05, 0.2);
            drawImagePortion(document.getElementById("paifang_choice4"), 0.65, 0.5, 0.2);
            drawImagePortion(document.getElementById("paifang_intro"), 0.05, 0.5, 0.4);
        } else {
            drawImagePortion(document.getElementById("paifang_choice1"), 0.05, 0.05, 0.4);
            drawImagePortion(document.getElementById("paifang_choice2"), 0.55, 0.05, 0.4);
            drawImagePortion(document.getElementById("paifang_choice3"), 0.05, 0.35, 0.4);
            drawImagePortion(document.getElementById("paifang_choice4"), 0.55, 0.35, 0.4);
            drawImagePortion(document.getElementById("paifang_intro"), 0.05, 0.65, 0.8);
        }
    }

    function drawImagePortion(img, px, py, pw, ph) {
        if (isNaN(ph)) {
            context.drawImage(img, px * canv.width, py * canv.height, pw * canv.width, img.height * pw * canv.width / img.width);
        } else {
            context.drawImage(img, px * canv.width, py * canv.height, pw * canv.width, ph * canv.height);
        }
    }

    function renderBackgroundImg(bg_img) {
        w = canv.width;
        h = canv.height;
        renderwidth = w;
        renderheight = h;
        if (bg_img.width / bg_img.height > w / h) {
            renderwidth = bg_img.width * h / bg_img.height;
            context.drawImage(bg_img, (w - renderwidth) / 2, 0, renderwidth, renderheight);
        } else {
            renderheight = bg_img.height * w / bg_img.width;
            context.drawImage(bg_img, 0, (h - renderheight) / 2, renderwidth, renderheight);
        }
    }

    function doclick(e) {
        if (complete)
            return;
        ispc = canv.width > canv.height;
        if (ispc) {
            if (isInPortion(e.x, e.y, 0.05, 0.05, 0.2) || isInPortion(e.x, e.y, 0.65, 0.05, 0.2) || isInPortion(e.x, e.y, 0.65, 0.5, 0.4)) {
                alert("这都能猜错？不会吧不会吧");
            } else if (isInPortion(e.x, e.y, 0.35, 0.05, 0.2)) {
                complete = true;
                renderCanvas();
                window.setInterval(displayIntro, 50);
                $.ajax({
                    method: "post",
                    url: "../setdata",
                    data: {
                        "type": "paiFang"
                    },
                    success: function (data) {
                        if (data === "成功")
                            console.log("成功上传数据。");
                        else
                            console.log("上传数据失败：" + data);
                    }
                });
            }
        } else {
            if (isInPortion(e.x, e.y, 0.05, 0.05, 0.4) || isInPortion(e.x, e.y, 0.05, 0.35, 0.4) || isInPortion(e.x, e.y, 0.55, 0.35, 0.4)) {
                alert("这都能猜错？不会吧不会吧");
            } else if (isInPortion(e.x, e.y, 0.55, 0.05, 0.4)) {
                complete = true;
                renderCanvas();
                window.setInterval(displayIntro, 50);
                $.ajax({
                    method: "post",
                    url: "setdata",
                    data: {
                        "type": "paiFang"
                    },
                    success: function (data) {
                        if (data === "成功")
                            console.log("成功上传数据。");
                        else
                            console.log("上传数据失败：" + data);
                    }
                });
            }
        }
    }

    function isInPortion(x0, y0, px, py, pw) {
        return isIn(x0, y0, px * canv.width, py * canv.height, pw * canv.width, 300 * pw * canv.width / 400);
    }

    function isIn(x0, y0, x, y, w, h) {
        return x0 > x && x0 < (x + w) && y0 > y && y0 < (y + h);
    }