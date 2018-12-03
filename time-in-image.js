const fs = require("fs");
const request = require("request");
const Jimp = require("jimp");
const tzlookup = require("tz-lookup");
const moment = require("moment-timezone");
var async = require("async");
const make8x8ImageBufferWith4Colors = c=>{
	return new Promise((resolve,reject)=>{
		let imageData = [];
		for (var i=0; i<64; i++) {
			let colorIndex;

			if (i<32) {
				colorIndex = (i%8<4)? 0: 1;
			} else {
				colorIndex = (i%8<4)? 2: 3;
			}

			imageData = imageData.concat([
				c[colorIndex][0],
				c[colorIndex][1],
				c[colorIndex][2],
			]);
		}

		//https://api.vrchat.cloud/api/1/worlds/wrld_9727a095-38e9-4686-8dd8-dad8b6bc01af
		
		
	// Jimp.read('https://api.vrchat.cloud/api/1/file/file_ee5690e5-59d2-4a1f-9c43-0425a2a3a21d/1/file', (err, lenna) => {
	  // if (err) throw err;
	  // lenna
		// .resize(256, 256) // resize
		// .quality(60) // set JPEG quality
		// .greyscale() // set greyscale
		// .write('lena-small-bw.jpg'); // save
	// });
		// var r = request("https://api.vrchat.cloud/api/1/file/file_ee5690e5-59d2-4a1f-9c43-0425a2a3a21d/1/file", function (e, response) {
			// console.log(response.request.uri.href); //picture path
			// Jimp.read('https://api.vrchat.cloud/api/1/file/file_ee5690e5-59d2-4a1f-9c43-0425a2a3a21d/1/file', (err, lenna) => {
			  // if (err) throw err;
			  // lenna
				// .resize(256, 256) // resize
				// .quality(60) // set JPEG quality
				// .greyscale() // set greyscale
				// .write('lena-small-bw.jpg'); // save
			// });
		// })
		// request('https://api.vrchat.cloud/api/1/file/file_ee5690e5-59d2-4a1f-9c43-0425a2a3a21d/1/file', function (error, response, body) {
			// console.log('error:', error); // Print the error if one occurred
			// console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			// console.log('body:', body); // Print the HTML for the Google homepage.
		// });
		
// #!/usr/bin/env python3

// import json
// import requests
// from requests.auth import HTTPBasicAuth

// API    = "https://api.vrchat.cloud/api/1"
// APIKEY = "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26"

// user = "USERNAME"
// pw   = "PASSWORD"

// ret = requests.get("{}/auth/user?apiKey={}".format(API, APIKEY),
                   // auth=HTTPBasicAuth(user, pw))

// print(ret.status_code) # returns 200
// print(json.loads(ret.text).keys()) 
// # returns ['id', 'username', 'displayName', 'pastDisplayNames', 'hasEmail', 
// # 'hasPendingEmail', 'obfuscatedEmail', 'obfuscatedPendingEmail', 'emailVerified', 
// # 'hasBirthday', 'unsubscribe', 'friends', 'friendGroupNames', 'blueprints', 
// # 'currentAvatarBlueprint', 'events', 'currentAvatar', 'currentAvatarImageUrl', 
// # 'currentAvatarAssetUrl', 'currentAvatarThumbnailImageUrl', 'status', 
// # 'statusDescription', 'acceptedTOSVersion', 'steamDetails', 'hasLoggedInFromClient', 
// # 'homeLocation', 'tags', 'developerType'])
		
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
							console.log('Processing: ' + value + ", key: " + key);
							// The instance id as heading:
							var heading = value[0];
							image.print(font, 0+key*(200+18), 0, "ID: " + heading);
						
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
										console.log('  Inside Processing: ' + value2 + ", key: " + key2);
										// The instance id as heading:
										
										var name = value2.displayName;
										console.log(name)
										image.print(font, 0+key*(200+18) + 18, 16+key2*16, name);
										
										var pic = value2.currentAvatarImageUrl;
										
										
										
										var r = request(pic, function (e, response) {
											console.log(response.request.uri.href); //picture path
											Jimp.read(response.request.uri.href, (err, lenna) => {
											  if (err) throw err;
											  lenna
												.resize(16, 12) // resize
												.quality(60); // set JPEG quality
												console.log("written"); //picture path
												
											  image.composite(lenna, 0+key*200, 16+key2*16, {
													mode: Jimp.BLEND_SOURCE_OVER,
													opacityDest: 1,
													opacitySource: 1
												}); // save
											  
												callback2();
											});
										})
										
										
										
										
										
										
										
										
										
										
										
										
										
										// const watermark = Jimp.read(pic);
										
										// var logo = new jimp(pic, function (err, img) {
												// err ? console.log('logo err' + err) : console.log('logo created and ready for use');
												// return img.opacity(0.3);
											// });
										
										// Jimp.read(pic, function (err, lenna) {
											// if (err) throw err;
											// lenna.resize(256, 256)            // resize
												 // .composite(image, 0, 0, {
													// mode: Jimp.BLEND_SOURCE_OVER,
													// opacityDest: 1,
													// opacitySource: 0.5
												// }); // save
											// callback2();
										// });

										
										// image.composite(watermark, 0, 0, {
											// mode: Jimp.BLEND_SOURCE_OVER,
											// opacityDest: 1,
											// opacitySource: 0.5
										// });

										
										
										
										// callback2();
									
									}, function (err) {
										console.log('  Inside: All files have been processed successfully');
										callback();
									});
									

								}
							);
						
						
						}, function (err) {
							console.log('Outside: All files have been processed successfully');
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
		let h = ((time[0])/24)*255;
		let m = ((time[1])/60)*255;
		let s = ((time[2])/60)*255;
	        
		make8x8ImageBufferWith4Colors([
			[h,m,s],
			[s,h,m],
			[m,s,h],
			[0,0,0]
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