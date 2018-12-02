const fs = require("fs");
const request = require("request");
const Jimp = require("jimp");
const tzlookup = require("tz-lookup");
const moment = require("moment-timezone");

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
		
		
		// var username = 'ikita';
		// var password = 'ipq58WP5';
		// var auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

		// var header = {'Host': 'api.vrchat.cloud/api/1/auth/user', 'Authorization': auth};
		// var request = client.request('GET', '/', header);
		// console.log(request)
		
		
		// var username = "ikita";
		// var	password = "ipq58WP5";
		// var	url = "http://api.vrchat.cloud/api/1/auth/user?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
		// var	auth = "Basic " + new Buffer(username + ":" + password).toString("base64");

		// request(
			// {
				// url : url,
				// headers : {
					// "Authorization" : auth
				// }
			// },
			// function (error, response, body) {
				// console.log(body)
			// }
		// );
		
		
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
				console.log(instanceList)
				// now we loop through each instance
				for (var i=0; i<instanceList.length; i++) {
					let instanceid = instanceList[i][0];
					
					
					// we now check each instance
					// console.log(instanceid)
					request(
						{
							url : "https://api.vrchat.cloud/api/1/worlds/wrld_9727a095-38e9-4686-8dd8-dad8b6bc01af/"+instanceid+"?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
							headers : {
								"Authorization" : auth
							}
						},
						function (error, response, body) {
							// console.log(body)
							var userList = JSON.parse(body).users;
							// console.log(userList)
							// now we loop through each instance
							new Jimp(256, 256, 0xE0E0E0ff, (err, image) => {
								Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(font => {
									for (var j=0; j<userList.length; j++) {
										// JSON.parse(userList[i]).displayName;
										// let user = userList[i][0];
										// we now check each instance
										console.log(userList[j].displayName);
										writeText+=(userList[j].displayName+"\r\n")
										console.log(writeText)
										console.log(i + " " + instanceList.length)
										console.log(j + " " + userList.length)
										// if ((i == instanceList.length-1) && (j == userList.length-1)){

											
										// }
									}
									
									image.print(font, 0, 0, writeText);
									resolve(image.getBufferAsync(Jimp.MIME_PNG));
									
								});
								
							});
						}
					);
				}
				
				
				

			}
		);
		
								// if ((i == instanceList.length-1) && (j == userList.length-1)){
									// console.log("YO")
									// new Jimp(256, 256, 0xE0E0E0ff, (err, image) => {
										// Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(font => {
											// image.print(font, 0, 0, writeText);
											// resolve(image.getBufferAsync(Jimp.MIME_PNG));
										// });
									// });
								// }
		
		
		
		
		//wrld_9727a095-38e9-4686-8dd8-dad8b6bc01af
		//https://api.vrchat.cloud/api/1/worlds/[ID]/[INSTANCEID]
		
		
		// new Jimp({
			// width: 8,
			// height: 8,
			// data: Buffer.from(imageData)
		// }, (err,image)=>{
			// resolve(image.getBufferAsync(Jimp.MIME_PNG));
		// });
		

		
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