// --------------------------------
const settings = {
	port: 8080,
	path: "/testing"
};
// --------------------------------

const express = require("express");
const TimeInImage = require(__dirname+"/time-in-image");

var app = express();

var timeInImage = new TimeInImage(app, settings.path);
timeInImage.onRequest = req=>{
	let ip = req.ip.split(":")[3];
	console.log(ip+=" requested the time");
}

app.listen((process.env.PORT || settings.port), ()=>{
	console.log("Web server open at *:"+(process.env.PORT || settings.port)+settings.path);
});