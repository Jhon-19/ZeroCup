canv = document.getElementById("game");
    context = canv.getContext("2d");
    drag = false;
    progress = 0;
    time = 0;
    intro = document.getElementById("intro").innerText;
    prevpos = {x: 0, y: 0};
    fox = {x: -1, y: -1, img: document.getElementById("aochang_player")};
    flag = {x: -1, y: -1, img: document.getElementById("aochang_target")};
    window.onresize = renderCanvas;
    window.onload = function () {
        canv.className = "game";
        document.getElementById("loading").remove();
        document.getElementById("text").innerHTML = "";
        w = canv.width = canv.clientWidth;
        h = canv.height = canv.clientHeight;
        canv.ontouchstart = function (e) {
            mousedown({x: e.touches[0].clientX, y: e.touches[0].clientY});
        }
        canv.ontouchend = function (e) {
            mouseup({x: e.touches[0].clientX, y: e.touches[0].clientY});
        }
        canv.ontouchmove = function (e) {
            mousemove({x: e.touches[0].clientX, y: e.touches[0].clientY});
        }
        pos = generateRandomPosition();
        fox.x = pos.x;
        fox.y = pos.y;
        pos = generateRandomPosition();
        flag.x = pos.x;
        flag.y = pos.y;
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
        renderBackgroundImg(document.getElementById("aochang_bg"));
        context.fillStyle = "#FFFFFF70";
        context.fillRect(0, 0, w, h);
        if (time > 10)
            return;
        ispc = canv.width > canv.height;
        if (ispc) {
            drawImagePortion(document.getElementById("aochang_intro"), 0.05, 0.5, 0.4);
            context.drawImage(fox.img, fox.x, fox.y, 0.1 * w, 0.1 * w * fox.img.height / fox.img.width);
            context.drawImage(flag.img, flag.x, flag.y, 0.1 * w, 0.1 * w * flag.img.height / flag.img.width);
        } else {
            drawImagePortion(document.getElementById("aochang_intro"), 0.05, 0.65, 0.8);
            context.drawImage(fox.img, fox.x, fox.y, 0.2 * w, 0.2 * w * fox.img.height / fox.img.width);
            context.drawImage(flag.img, flag.x, flag.y, 0.2 * w, 0.2 * w * flag.img.height / flag.img.width);
        }
    }

    function generateRandomPosition() {
        ispc = canv.width > canv.height;
        result = {x: -1, y: -1};
        if (ispc) {
            result.x = canv.width * generateSpecRand(9);
            result.y = canv.height * generateSpecRand(4);
        } else {
            result.x = canv.width * generateSpecRand(4) * 2;
            result.y = canv.height * generateSpecRand(2) * 2;
        }
        return result;
    }

    function generateSpecRand(lim) {
        return Math.round(Math.random() * lim) / 10;
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

    function mousedown(e) {
        if (time > 10)
            return;
        ispc = canv.width > canv.height;
        if (ispc) {
            if (isIn(e.x, e.y, fox.x, fox.y, 0.1 * w, 0.1 * w * fox.img.height / fox.img.width)) {
                drag = true;
                prevpos.x = e.x;
                prevpos.y = e.y;
            }
        } else {
            if (isIn(e.x, e.y, fox.x, fox.y, 0.2 * w, 0.2 * w * fox.img.height / fox.img.width)) {
                drag = true;
                prevpos.x = e.x;
                prevpos.y = e.y;
            }
        }
    }

    function mouseup(e) {
        drag = false;
    }

    function mouseout(e) {
        drag = false;
    }

    function mousemove(e) {
        if (!drag)
            return;
        if (time > 10)
            return;
        fox.x += e.x - prevpos.x;
        fox.y += e.y - prevpos.y;
        prevpos.x = e.x;
        prevpos.y = e.y;
        if (Math.abs(fox.x - flag.x) < 0.1 * canv.width && Math.abs(fox.y - flag.y) < 0.1 * canv.height) {
            time++;
            pos = generateRandomPosition();
            flag.x = pos.x;
            flag.y = pos.y;
            if (time > 10) {
                window.setInterval(displayIntro, 50);
                $.ajax({
                    method: "post",
                    url: "../setdata",
                    data: {
                        "type": "aoChang"
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
        renderCanvas();
    }

    function isIn(x0, y0, x, y, w, h) {
        return x0 > x && x0 < (x + w) && y0 > y && y0 < (y + h);
    }