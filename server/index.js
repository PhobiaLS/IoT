var express = require('express');
var SerialPort = require('serialPort');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var events = require('events');
var eventEmitter = new events();
var komanda;

app.use(express.static('public'));

server.listen(3000,function(){
	console.log("Server started....")
});

var request = function(command){
	this.command = command;
};

var requestArray = [];
var currentRequest = null;

eventEmitter.once("start",function(){ // Ovaj pokrece beskonacnu petlju za uzimanje komandi ;
	console.log("Event started...");
	repeat();
	repeatForUsers();
});



var port = new SerialPort('/COM9', { parser: SerialPort.parsers.readline('\n') }, function (err) {
	if (err){
		return console.log('Error on create : ', err.message);
	}

	port.on('error', function(err){
		console.log('Any Error: ', err.message);
	});

	port.on('data', function(data){
		//console.log("Odradjen request: %s", data);
		obradiData(data);
	});

});


io.on('connection', function (socket) {
	eventEmitter.emit("start");
  socket.on('sendEsplora',function(req){
  	obradiRequest(req);
  });
});

function repeat(){ // Uzima po fifo, ako nema 
	currentRequest = requestArray.shift();
	if(currentRequest == null) // ako requesta, samo vrati na pocetak ;)
		setTimeout(repeat,1000);
	else { // Ako postoji komanda, posalji je na obradu ;)
		port.write(currentRequest.command,function(err){
			if (err){
				console.log('Error on write: ', err.message);
			}
		});
	}
}

function repeatForUsers(){ // Vraca useru na svaki minut temperaturu i ostale status u prostoriji
	if(io.sockets.server.eio.clientsCount > 0) { // Ako ima konektovanih klijenaata
		requestArray.push(new request("M"));
		requestArray.push(new request("T"));
		requestArray.push(new request("Q"));
		requestArray.push(new request("S"));
		requestArray.push(new request("A"));
	}
	setTimeout(repeatForUsers,500);
}

function obradiRequest(req){
	if(req.RGB){
        komanda = "LO"+clr(req.RGB.red.toString(),3) + clr(req.RGB.green.toString(),3) + clr(req.RGB.blue.toString(),3) + clr(req.RGB.pause.toString(),4) + clr(req.RGB.signal.toString(),4);
		//console.log(komanda);
		//console.log(komanda);
	} else if(req.PiezoPlay) {
		var tone = 0;
        switch (req.PiezoPlay){
			case "C":
				tone = 262;
				break;
			case "C#":
				tone = 277;
				break;
			case "D":
				tone = 294;
				break;
			case "D#":
				tone = 311;
				break;
			case "E":
				tone = 330;
				break;
			case "F":
				tone = 349;
				break;
			case "F#":
				tone = 370;;
				break;
			case "G":
				tone = 392;
				break;
			case "G#":
				tone = 415;
				break;
			case "A":
				tone = 440;
				break;
			case "A#":
				tone = 466;
				break;
			case "B":
				tone = 494;
				break;
			case "C1":
				tone = 523;
				break;
		}
		komanda = "BO"+clr(tone.toString(),4)+"0300";
    }
    //console.log("Odradjeno: ",komanda);
    requestArray.push(new request(komanda));
}

function obradiData(data){
	io.sockets.emit("results",data);
	repeat();
}

function clr(data,length){
	for(var i=data.length;i<length;i++)
		data = '0' + data;
	return data;
}
