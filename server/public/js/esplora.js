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

var buttonDelay = 110;

function moveInsideLeft(){

    if($("#divInside").position().left - 5 > 0.000001)
    { 
        $("#divInside").animate({ 
            left: "-=5px",
        }, buttonDelay );
    }else if($("#divInside").position().left > 0.000001){
        var razlika = $("#divInside").position().left;
        $("#divInside").animate({ 
            left: "-="+razlika,
        }, buttonDelay );
    }
}

function moveInsideUp(){
    if($("#divInside").position().top - 5 > 0.000001)
    { 
        $("#divInside").animate({ 
            top: "-=5px",
        }, buttonDelay );
    }else if($("#divInside").position().top > 0.000001){
        var razlika = $("#divInside").position().top;
        $("#divInside").animate({ 
            top: "-="+razlika,
        }, buttonDelay );
    }
}

function moveInsideRight(){
    if($("#divInside").position().left + 5 + $("#divInside").width()  < $("#divOutside").width())
    { 
        $("#divInside").animate({ 
            left: "+=5px",
        }, buttonDelay );
    }else if($("#divInside").position().left + $("#divInside").width() < $("#divOutside").width()){
        var razlika = $("#divOutside").width()-$("#divInside").position().left - $("#divInside").width();
        $("#divInside").animate({ 
            left: "+="+razlika,
        }, buttonDelay );
    }
}

function moveInsideDown(){
    if($("#divInside").position().top + 5 + $("#divInside").height()  < $("#divOutside").height())
    { 
        $("#divInside").animate({ 
            top: "+=5px",
        }, buttonDelay );
    }else if($("#divInside").position().top + $("#divInside").height() < $("#divOutside").height()){
        var razlika = $("#divOutside").height()-$("#divInside").position().top - $("#divInside").height();
        $("#divInside").animate({ 
            top: "+="+razlika,
        }, buttonDelay );
    }
}

function map(unscaledNum, min, max, minAllowed, maxAllowed) {
  return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

function changeBrightness(num){

    var scaled = map(num,0,1023,0,255);

    $("#ligth").css({"background-color":"rgb(255,255,"+Math.floor(255-scaled)+")"});
}

function joystickMove(x,y,pressed){
    x=-x;
    var min = 0;
    var max = min + $("#divOutside").width() - $("#divInsideJoystick").width();

    var xConv = map(x,-512,512,min,max);

    min = 0;
    max = min + $("#divOutside").height()-$("#divInsideJoystick").height();

    var yConv = map(y,-512,512,min,max);

    var delay;
    if(pressed==0){
        delay = 110;
        $("#divInsideJoystick").css({"background-color": "#6cb78c"});
    }else{
        delay = 50;
        $("#divInsideJoystick").css({"background-color":"#cd5c5c"});
    }

    $("#divInsideJoystick").animate({ 
            top: yConv+"px",
            left: xConv+"px"
        }, delay );
}

