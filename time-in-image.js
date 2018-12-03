const fs = require("fs");
const request = require("request");
const Jimp = require("jimp");
const tzlookup = require("tz-lookup");
const moment = require("moment-timezone");
var async = require("async");
const make8x8ImageBufferWith4Colors = c=>{
	return new Promise((resolve,reject)=>{

		var username = "ikitahome";
		var	password = "ipq58WP5";
		var	url = "https://api.vrchat.cloud/api/1/worlds/wrld_9727a095-38e9-4686-8dd8-dad8b6bc01af?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
		// To check name of user:
		// var	url = "https://api.vrchat.cloud/api/1/users/usr_bc6d0b9f-b603-4734-b3d8-30def84d3151?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
		var	auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
		
		var writeText = "";
		
		request(
			{
				url : url,
				headers : {
					"Authorization" : auth
				}
			},
			function (error, response, body) {
				// console.log(body)
				var instanceList = JSON.parse(body).instances;
				// console.log(instanceList)
				new Jimp(1600, 900, 0xE0E0E0ff, (err, image) => {
					Jimp.loadFont(__dirname+"/newsmallclear3/newsmall.fnt").then(font => {
						
						
						async.forEachOf(instanceList, function (value, key, callback) {
							// console.log('Processing: ' + value + ", key: " + key);
							// The instance id as heading:
							var heading = value[0];
							image.print(font, 0+key*(200), 0, "ID: " + heading);
						
							request(
								{
									url : "https://api.vrchat.cloud/api/1/worlds/wrld_9727a095-38e9-4686-8dd8-dad8b6bc01af/"+heading+"?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
									headers : {
										"Authorization" : auth
									}
								},
								function (error, response, body) {

									var userList = JSON.parse(body).users;
									

									
									async.forEachOf(userList, function (value2, key2, callback2) {
										// console.log('  Inside Processing: ' + value2 + ", key: " + key2);
										// The instance id as heading:
										
										var name = value2.displayName;
										console.log(name)
										image.print(font, 0+key*(200) + 18, 16+key2*16, name);
										
										var pic = value2.currentAvatarImageUrl;
										console.log(pic)
										
										
										var r = request(pic, function (e, response) {
											console.log(response.request.uri.href); //picture path
											Jimp.read(response.request.uri.href, (err, lenna) => {
											  // if (err) throw err;
											  lenna
												.resize(16, 12) // resize
												.quality(60); // set JPEG quality
												// console.log("written"); //picture path
												
											  image.composite(lenna, 0+key*(200), 16+key2*16, {
													mode: Jimp.BLEND_SOURCE_OVER,
													opacityDest: 1,
													opacitySource: 1
												}); // save
											  
												callback2();
											});
										})

									}, function (err) {
										console.log('  Current instance processed.');
										callback();
									});
									
								}
							);
						
						
						}, function (err) {
							console.log('All instances have been processed successfully');
							resolve(image.getBufferAsync(Jimp.MIME_PNG));
						});
				
					});
				});

			}
		);
		
	});
}

const makeTimeImageBuffer = (time)=>{ // 24,60,60
	return new Promise((resolve,reject)=>{	        
		make8x8ImageBufferWith4Colors([
		]).then(buffer=>{
			resolve(buffer);
		});
	});
};

const generateCharacters = (amount)=>{
	let out = "";
	let choice = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
	for (var i=0; i<amount; i++) {
		out+=choice[Math.floor(Math.random()*choice.length)];
	}
	return out;
}

var cachedTzs = {};
setInterval(()=>{
	cachedTzs = {};
}, 1000*60*60*24*7);
// every 7 days clear

const TimeInImage = function (app,path) {
	this.onRequest = ()=>{};

	app.get(path+"/:random", (req,res)=>{
		this.onRequest(req);

		res.header({"Content-Type": "image/png"});

		//let ip = (req.ip.split(":")[3]);
		let ip = req.headers["x-forwarded-for"];
		if (ip){
			var list = ip.split(",");
			ip = list[list.length-1];
		} else {
			ip = req.connection.remoteAddress;
		}
		
		
		if (cachedTzs[ip]) {
			let time = moment().tz(cachedTzs[ip]).format("HH:mm:ss")
				.split(":").map(x=>parseInt(x));

			makeTimeImageBuffer(time).then(buffer=>{
				res.end(buffer);
			});

			return;
		}

		request.post({
			url: "https://www.iplocation.net",
			form: { query: ip },
			headers: { referer: "https://www.iplocation.net" }
		}, (err,_,body)=>{
			if (err) {
				console.log(err);
				return res.send();
			}

			try {
				body = body
					.split("ipinfo.io</a>")[1].split("</table>")[0]
					.split("<tr>")[4].split("<td>");

				let tz = tzlookup(
					body[3].split("</")[0],
					body[4].split("</")[0]
				);

				cachedTzs[ip] = tz;

				let time = moment().tz(tz).format("HH:mm:ss")
					.split(":").map(x=>parseInt(x));

				makeTimeImageBuffer(time).then(buffer=>{
					res.end(buffer);
				});
			} catch(err) {
				console.log(err);
				res.send();
			}
		});
	});

	app.get(path, (req,res)=>{
		res.redirect(path+"/"+generateCharacters(8)+".png");
	});
}

module.exports = TimeInImage;