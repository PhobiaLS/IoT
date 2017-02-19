function sendRGB(){
    var redC = $("#rangeRed").val();
    var greenC = $("#rangeGreen").val();
    var blueC = $("#rangeBlue").val();
    var pauseC = $("#rangePause").val();
    var signalC = $("#rangeSignal").val();
    var colors = {red:redC,green:greenC,blue:blueC,pause:pauseC,signal:signalC};
    socket.emit("sendEsplora", {"RGB": colors});
    $("#RGB").css("background-color","rgb("+redC+","+greenC+","+blueC+")");
}

function moveInsideLeft(){
    console.log($("#divInside").position().left+" ");
    
    console.log($("#divOutside").position().left);
    console.log('\n');
    if($("#divInside").position().left - 5 > 0.000001)
    { 
        $("#divInside").animate({ 
            left: "-=5px",
        }, 200 );
    }else if($("#divInside").position().left > 0.000001){
        var razlika = $("#divInside").position().left;
        $("#divInside").animate({ 
            left: "-="+razlika,
        }, 200 );
    }
}

function moveInsideUp(){
    console.log('\n');
    if($("#divInside").position().top - 5 > 0.000001)
    { 
        $("#divInside").animate({ 
            top: "-=5px",
        }, 200 );
    }else if($("#divInside").position().top > 0.000001){
        var razlika = $("#divInside").position().top;
        $("#divInside").animate({ 
            top: "-="+razlika,
        }, 200 );
    }
}

function moveInsideRight(){
    if($("#divInside").position().left + 5 + $("#divInside").width()  < $("#divOutside").width())
    { 
        $("#divInside").animate({ 
            left: "+=5px",
        }, 200 );
    }else if($("#divInside").position().left + $("#divInside").width() < $("#divOutside").width()){
        var razlika = $("#divOutside").width()-$("#divInside").position().left - $("#divInside").width();
        $("#divInside").animate({ 
            left: "+="+razlika,
        }, 200 );
    }
}

function moveInsideDown(){
    if($("#divInside").position().top + 5 + $("#divInside").height()  < $("#divOutside").height())
    { 
        $("#divInside").animate({ 
            top: "+=5px",
        }, 200 );
    }else if($("#divInside").position().top + $("#divInside").height() < $("#divOutside").height()){
        var razlika = $("#divOutside").height()-$("#divInside").position().top - $("#divInside").height();
        $("#divInside").animate({ 
            top: "+="+razlika,
        }, 200 );
    }
}

function map(unscaledNum, min, max, minAllowed, maxAllowed) {
  return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

function joystickMove(x,y,pressed){
    var min = $("#divOutside").position().left;
    var max = $("#divOutside").position().left + $("#divOutside").width() - $("#divInsideJoystick").width();

    var xConv = map(x,-512,512,min,max);
    var trenX = $("#divInsideJoystick").position().left;

    min = $("#divOutside").position().top;
    max = min + $("#divOutside").position().top - $("#divInsideJoystick").height();

    var yConv = map(y,-512,512,min,max);
    var trenY = $("#divInsideJoystick").position().top;

    var delay;
    if(pressed==0){
        delay = 200;
        $("#divInsideJoystick").css({"background-color": "#6cb78c"});
    }else{
        delay = 500;
        $("#divInsideJoystick").css({"background-color":"#cd5c5c"});
    }

    $("#divInsideJoystick").animate({ 
            top: yConv+"px",
            left: xConv+"px"
        }, delay );
}