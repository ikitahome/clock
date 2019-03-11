const fs = require("fs");
const request = require("request");
const Jimp = require("jimp");
const tzlookup = require("tz-lookup");
const moment = require("moment-timezone");
var async = require("async");
var util = require('util')

// var worldid = ""

const make8x8ImageBufferWith4Colors = worldid=>{
	return new Promise((resolve,reject)=>{
		//:path: /api/1/worlds/wrld_a8cbf00c-f2d9-43a6-b257-675be512a02d/publish?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26
		var username = "armadiliea";
		var	password = "ipq58WP5";
		var count = Math.random();
		
		if (count > 0.95){
			username = "armadiliea";
		} else if (count > 0.9){
			username = "armadilloe";
		} else if (count > 0.86){
			username = "LamKee2";
		} else if (count > 0.82){
			username = "moonkay";
		} else if (count > 0.77){
			username = "Gorao";
		} else if (count > 0.74){
			username = "umaro";
		} else if (count > 0.7){
			username = "umotim";
		} else if (count > 0.65){
			username = "postmanmiller";
		} else if (count > 0.6){
			username = "opomarim";
		} else if (count > 0.55) {
			username = "rushkill";
		} else if (count > 0.5){
			username = "karmataser";
		} else if (count >= 0.45){
			username = "opatm";
		} else if (count >= 0.4){
			username = "imomi";
		} else if (count >= 0.35){
			username = "koratn";
		} else if (count >= 0.3){
			username = "poupa";
		} else if (count >= 0.25){
			username = "atyath";
		} else if (count >= 0.2){
			username = "takaleth";
		} else if (count >= 0.15){
			username = "cihyhy";
		} else if (count >= 0.1){
			username = "bocac";
		} else if (count >= 0.05){
			username = "tupotin";
		} else if (count >= 0){
			username = "fenil";
		};

		
		
		
		console.log("Account: " + username);
		
		var	url = "https://vrchat.net/api/1/worlds/" + worldid + "?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
		// var	url = "https://api.vrchat.cloud/api/1/worlds/wrld_9727a095-38e9-4686-8dd8-dad8b6bc01af?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
		// To check name of user:
		// var	url = "https://api.vrchat.cloud/api/1/users/usr_bc6d0b9f-b603-4734-b3d8-30def84d3151?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
		var	auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
		
		var writeText = "";
		
		request(
			{
				url : url,
				headers : {
					"Authorization" : auth,
					"Referrer" : "https://vrchat.net/home/world/wrld_a8cbf00c-f2d9-43a6-b257-675be512a02d",
					"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
					
				}
			},
			function (error, response, body) {
				// console.log("response.header");
				// console.log(response.headers)
				// console.log(error)
				// console.log(JSON.parse(body));
				var instanceList = JSON.parse(body).instances;
				instanceList.length = Math.min(instanceList.length,5);
				console.log(instanceList)
				new Jimp(600, 250, 0x0, (err, image) => {
					Jimp.loadFont(__dirname+"/newsmallclear3/newsmall.fnt").then(font => {
						image.print(font, 600-600, 250-16, "*cached and updated once every 120 seconds");
						image.print(font, 600-50, 250-16, "- by ikita");
						if (instanceList.length == 0){
							console.log("Account FAIL !!!!! : " + username);
							image.print(font, 600-440, 250-170, "VRChat having issues listing instances for us right now");
							image.print(font, 600-440, 250-158, "We will be back shortly");
						};
						async.forEachOf(instanceList, function (value, key, callback) {
							// console.log('Processing: ' + value + ", key: " + key);
							// The instance id as heading:
							var heading = value[0];
							image.print(font, 0+key*(120), 0, "WORLD " + heading + ":");
						
							request(
								{
									// url : "https://api.vrchat.cloud/api/1/worlds/wrld_9727a095-38e9-4686-8dd8-dad8b6bc01af/"+heading+"?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
									url : "https://vrchat.net/api/1/worlds/" + worldid + "/"+heading+"?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26",
									headers : {
										"Authorization" : auth,
										"Referrer" : "https://vrchat.net/home/world/wrld_a8cbf00c-f2d9-43a6-b257-675be512a02d",
										"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
										
									}
								},
								
								function (error, response, body) {
									var userList = JSON.parse(body).users;
									userList.length = Math.min(userList.length,15);
									async.forEachOf(userList, function (value2, key2, callback2) {
										// console.log('  Inside Processing: ' + value2 + ", key: " + key2);
										// The instance id as heading:
										var name = value2.displayName;
										// var nameSize = measureText(value2.displayName);
										// if (nameSize > 100) {
											// name = name.substring(0,Math.Floor(name.length*100/nameSize));
										// }
										// console.log(name)
										// var x = 0;
										// var y = 0;
										image.print(font, 0+key*(120) + 18, 20+key2*16, name);
										
										// console.log(image.measureText(font, name));
										var pic = value2.currentAvatarThumbnailImageUrl;
										// callback2();
 										if (typeof pic !== 'undefined' && pic !== null){
											// console.log(pic)
											var r = request(pic, function (e, response) {
												if (e) {
													console.log('error: ', e);
													callback2();
												} else {
													console.log(response.request.uri.href); //picture path
													Jimp.read(response.request.uri.href, (err, lenna) => {
													  if (err){
														  callback2();
													  } else {
														  lenna
															.resize(16, 12) // resize
															.quality(60); // set JPEG quality
															// console.log("written"); //picture path
															
														  image.composite(lenna, 0+key*(120), 20+key2*16, {
																mode: Jimp.BLEND_SOURCE_OVER,
																opacityDest: 1,
																opacitySource: 1
															}); // save
														  callback2();
													  };
													});
												};
											})
										} else {
											console.log("pic path undef")
											callback2();
										}; 

									}, function (err) {
										console.log('  Current instance processed.');
										callback();
									});
									
								}
							);
						
						
						}, function (err) {
							console.log('All instances have been processed successfully');
							image.write(worldid + ".png");
							resolve(image.getBufferAsync(Jimp.MIME_PNG));
						});
				
					});
				});

			}
		);
		
	});
}

const makeTimeImageBuffer = (worldid)=>{ // 24,60,60
	return new Promise((resolve,reject)=>{	        
	
		fs.access(worldid + '.png', (err) => {
			if (!err) {
				console.log('myfile exists');
				var stats = fs.statSync(worldid + '.png');
				var mtime = new Date(util.inspect(stats.mtime));
				console.log(stats.mtime.getTime());
				var d = new Date();
				console.log(d.getTime());
				
				if ((d - mtime) < 60000) {
					console.log('recent image');
					Jimp.read('./' + worldid + '.png')
					.then(image => {
						console.log('RESOLVE IMAGE !!!!!');
						resolve( image.getBufferAsync(Jimp.MIME_PNG));
					})
					.catch(err => {
						console.log('READ IMAGE ERROR');
						make8x8ImageBufferWith4Colors(worldid).then(buffer=>{
							resolve(buffer);
						});
					});
				};
				if ((d - mtime) >= 60000) {
					console.log('old image');
					make8x8ImageBufferWith4Colors(worldid).then(buffer=>{
						resolve(buffer);
					});
				};
				
				
				
				
				
				
				
			// return;
		}
			if (err) {
				console.log('myfile does not exist');
				make8x8ImageBufferWith4Colors(worldid).then(buffer=>{
					resolve(buffer);
				});
			}
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

const TimeInImage = function (app,path) {
	this.onRequest = ()=>{};
	var worldid = "";
	app.get(path+"/:random", (req,res)=>{
		
		try {
			// if (req.query.world){
				console.log("param")
				console.log(req.params)
				console.log("query")
				console.log(req.query)
			// }
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
			
			
			if (true) {
				// let time = moment().tz(cachedTzs[ip]).format("HH:mm:ss")
					// .split(":").map(x=>parseInt(x));

				makeTimeImageBuffer(req.query.world).then(buffer=>{
					res.end(buffer);
				});

				return;
			}
		} catch (error) {
			console.log("error");
			res.status(500).json({ error: error.toString() });
			
			return;
		}
		


	});

	app.get(path, (req,res)=>{
		// console.log(req.params)
		if (req.query.world){
			console.log("Read world id as: " + req.query.world);
			worldid = req.query.world;
		}
		res.redirect(path+"/"+generateCharacters(8)+".png"+('?world=' + worldid));
	});
}




module.exports = TimeInImage;