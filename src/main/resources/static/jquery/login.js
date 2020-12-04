canv=document.getElementById("bubble-background");
    context=canv.getContext("2d");
    bubbles=[];
    iterationVar=0;
    maxBubbles=0;
    window.onresize=recalculateCanvasWidth;
    window.setTimeout(recalculateCanvasWidth,1);
    window.setInterval(function(){
        if(bubbles.length<=maxBubbles&&Math.random()>0.98){
            addBubble();
        }
        renderBubbles();
    },1);
    function recalculateCanvasWidth(){
        canv.width=canv.clientWidth;
        canv.height=canv.clientHeight;
        maxBubbles=Math.round(canv.clientHeight*canv.clientWidth/1000);
    }
    function addBubble(){
        value=(Math.round(Math.random()*200+55)).toString(16);
        bubble=
            {
                color:"#00"+value+""+value,
                radius:Math.round(Math.random()*50),
                speed:Math.random()*0.8+0.2,
                x:Math.random()*canv.clientWidth,
                y:canv.clientHeight
            }
        bubble.y+=bubble.radius;
        bubbles.push(bubble);
    }
    function renderBubbles(){
        iterationVar+=2*Math.PI/1000;
        iterationVar=iterationVar>=2*Math.PI?iterationVar-2*Math.PI:iterationVar;
        context.beginPath();
        context.fillStyle="#000000";
        context.fillRect(0,0,canv.clientWidth,canv.clientHeight);
        context.closePath();
        for(var i=0;i<bubbles.length;i++){
            var temp=bubbles[i];
            temp.y-=temp.speed;
            temp.x-=Math.sin(iterationVar)*temp.speed;
            if(temp.y<-temp.radius||temp.x<-temp.radius){
                bubbles.splice(i,1);
                i--;
            }
            context.beginPath();
            context.fillStyle=temp.color;
            context.arc(temp.x,temp.y,temp.radius,-Math.PI/2,3*Math.PI/2,true);
            context.fill();
            context.closePath();
        }
    }