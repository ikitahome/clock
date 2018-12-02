// --------------------------------
const settings = {
	port: 8080,
	path: "/testing"
};
// --------------------------------

const express = require("express");
const TimeInImage = require(__dirname+"/time-in-image");

var app = express();
var ua = require('universal-analytics');
var timeInImage = new TimeInImage(app, settings.path);


timeInImage.onRequest = req=>{
	//let ip = req.ip.split(":")[3];
	
	
	let ipAddr = req.headers["x-forwarded-for"];
	if (ipAddr){
		var list = ipAddr.split(",");
		ipAddr = list[list.length-1];
	} else {
		ipAddr = req.connection.remoteAddress;
	}
	
	
	var visitor = ua('UA-128365036-2');
	visitor.pageview({dp: "/", dt: "Toga & ikita Avatar", dh: "ikitaclock.herokuapp.com/testing", uip: ipAddr}).send();
	console.log(ipAddr+=" requested the time");
	console.log("Sent analytics")
}

app.listen((process.env.PORT || settings.port), ()=>{
	console.log("Web server open at *:"+(process.env.PORT || settings.port)+settings.path);
});