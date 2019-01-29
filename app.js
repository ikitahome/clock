// --------------------------------
const settings = {
	port: 8080,
	path: "/testing",
	path2: "/deploy",
	path3: "/time",
};
// --------------------------------

const express = require("express");
const TimeInImage = require(__dirname+"/time-in-image");
const TimeInImageXX = require(__dirname+"/time-in-imageXX");


var app = express();
var ua = require('universal-analytics');
var timeInImage = new TimeInImage(app, settings.path2);
// No Tracking
var timeInImage2 = new TimeInImage(app, settings.path);
// for the actual time
var timeInImageXX = new TimeInImageXX(app, settings.path3);




timeInImageXX.onRequest = req=>{
	// let ip = req.ip.split(":")[3];
	let ipAddr = req.headers["x-forwarded-for"];
	if (ipAddr){
		var list = ipAddr.split(",");
		ipAddr = list[list.length-1];
	} else {
		ipAddr = req.connection.remoteAddress;
	}
	console.log(ipAddr+=" requested the time");
}


timeInImage.onRequest = req=>{
	//let ip = req.ip.split(":")[3];
	
	
	let ipAddr = req.headers["x-forwarded-for"];
	if (ipAddr){
		var list = ipAddr.split(",");
		ipAddr = list[list.length-1];
	} else {
		ipAddr = req.connection.remoteAddress;
	}
	
	
	var visitor = ua('UA-128365036-3');
	visitor.pageview({dp: "/", dt: "Toga & ikita Avatar", dh: "ikitaclock.herokuapp.com/testing", uip: ipAddr}).send();
	console.log(ipAddr+=" requested the time");
	console.log("Sent analytics")
}

timeInImage2.onRequest = req=>{
	//let ip = req.ip.split(":")[3];

	

	
	
	
	let ipAddr = req.headers["x-forwarded-for"];
	if (ipAddr){
		var list = ipAddr.split(",");
		ipAddr = list[list.length-1];
	} else {
		ipAddr = req.connection.remoteAddress;
	}
	
	
	// var visitor = ua('UA-128365036-2');
	// visitor.pageview({dp: "/", dt: "Toga & ikita Avatar", dh: "ikitaclock.herokuapp.com/testing", uip: ipAddr}).send();
	// console.log(ipAddr+=" requested the time");
	// console.log("Sent analytics")
}

var server = app.listen((process.env.PORT || settings.port), ()=>{
	console.log("Web server open at *:"+(process.env.PORT || settings.port)+settings.path);
});

server.timeout = 29000;