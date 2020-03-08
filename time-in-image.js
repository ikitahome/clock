const fs = require("fs");
const request = require("request");
const Jimp = require("jimp");
const tzlookup = require("tz-lookup");
const moment = require("moment-timezone");
var async = require("async");
var util = require('util');
var lineReader = require('line-reader');
var cloudscraper = require('cloudscraper');

// avatar images
var avatarImg = [
"https://api.vrchat.cloud/api/1/file/file_04a7fdd2-66f4-453f-94c8-7bb2b2f3e425/1/file",
"https://api.vrchat.cloud/api/1/file/file_6559fa28-d409-4afe-8064-a0166d90a6df/1/file",
"https://api.vrchat.cloud/api/1/file/file_d8880217-dfa9-4a65-ae6a-ccc4325aa939/1/file",
"https://api.vrchat.cloud/api/1/file/file_370ae936-d535-45e1-8c24-3dfe25c00cf3/3/file",
"https://api.vrchat.cloud/api/1/file/file_10fdd316-1055-4e62-80f8-7b088bcbe779/3/file",
"https://api.vrchat.cloud/api/1/file/file_f8708bb8-8e91-4c50-bc07-edff4f1b5423/1/file",
"https://api.vrchat.cloud/api/1/file/file_04300f4a-9155-4c6e-a50c-f5a6eadb082a/1/file",
"https://api.vrchat.cloud/api/1/file/file_fd3eea36-ecb5-40ac-8c6c-de7c1ec10cf3/1/file",
"https://api.vrchat.cloud/api/1/file/file_56b4ff79-f94a-43c9-807d-8748120e5df5/1/file",
"https://api.vrchat.cloud/api/1/file/file_05f0ce59-6585-41af-b9f0-d92e06c5856c/2/file",
"https://api.vrchat.cloud/api/1/file/file_ed1a0d01-bbbb-4936-98e5-c839ba6be47d/2/file",
"https://api.vrchat.cloud/api/1/file/file_8623a2a6-dbaf-439e-932c-997b6425240c/1/file",
"https://api.vrchat.cloud/api/1/file/file_3fc16356-cac7-4a51-8153-731b726696c2/2/file",
"https://api.vrchat.cloud/api/1/file/file_d7a45d7d-b1dc-4d1d-a16c-12873b2d97b3/6/file",
"https://api.vrchat.cloud/api/1/file/file_1976bb50-7419-4104-a5ba-1c89dd5ee44d/1/file",
"https://api.vrchat.cloud/api/1/file/file_a31834a0-3217-4256-9858-ff317d27a168/3/file",
"https://api.vrchat.cloud/api/1/file/file_0991d0d1-08db-4955-b8b4-1076a4fbfaa4/1/file",
"https://api.vrchat.cloud/api/1/file/file_0b761aea-2484-40ec-b4e0-66ffb170952d/1/file",
"https://api.vrchat.cloud/api/1/file/file_1b39b755-bd2f-4bdf-8c88-f730e22e96ae/1/file",
"https://api.vrchat.cloud/api/1/file/file_5a55622a-0aa1-44be-a816-657ad166a6b0/2/file",
"https://api.vrchat.cloud/api/1/file/file_b2cf3b56-92c2-40fc-820a-dfcf4bbe9e07/3/file",
"https://api.vrchat.cloud/api/1/file/file_9b2e3e7e-749b-45ee-9008-f423a2397952/1/file",
"https://api.vrchat.cloud/api/1/file/file_8a91911c-36ad-48a8-8dbe-4db8d86cab62/3/file",
"https://api.vrchat.cloud/api/1/file/file_46f8aad0-227d-40d3-a155-b453a1244061/1/file",
"https://api.vrchat.cloud/api/1/file/file_7eab1665-e5fb-4eb5-b944-d0cf7316b0fd/3/file",
"https://api.vrchat.cloud/api/1/file/file_fabbd06f-6da8-4446-8d6a-0ede7e54c676/1/file",
"https://api.vrchat.cloud/api/1/file/file_697a5480-dc11-4e34-985a-c275675859f6/3/file",
"https://api.vrchat.cloud/api/1/file/file_b11b78ec-30c2-4a7e-8533-010b551072a8/1/file",


];

var username = [
"ab6adfz",
"ab6adfz2",
];

var	password = "ipq58WP5";

// var worldid = ""

const make8x8ImageBufferWith4Colors = worldid=>{
	
	console.log("Start Check");
	
	var foundUsers = [];
	// foundUsers [0] = {name: "audi", img: "10"};

	
	
	return new Promise((resolve,reject)=>{
		//:path: /api/1/worlds/wrld_a8cbf00c-f2d9-43a6-b257-675be512a02d/publish?apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26

		
		

		new Jimp(600, 250, 0x0, (err, image) => {
			Jimp.loadFont(__dirname+"/newsmallclear3/newsmall.fnt").then(font => {
				image.print(font, 600-600, 250-16, "*cached and updated once every 120 seconds");
				image.print(font, 600-50, 250-16, "- by ikita");

		
		
		
		
		
				var count = [1]
				var offset = Math.floor(Math.random()*10000);
				async.forEachOf(count, function (value1, key1, callbackCount) {
					// loop all users at this offset
					var user1 = username[Math.floor(Math.random()*(username.length - 1))];
					console.log("Account: " + user1);
					var thisOffset = offset + 100*value1;
					var	url = "https://vrchat.com/api/1/users?n=100&offset=" + thisOffset.toString() + "&apiKey=JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
					var	auth = "Basic " + new Buffer(user1 + ":" + password).toString("base64");
					var writeText = "";
					
					
					// var options = {
					  // uri: url,
					  // headers: {
						// "Authorization" : auth,
					  // },
					
					// cloudscraper.get(url).then(console.log, console.error);
					
					
					request(
						{
							url : url,
							headers : {
								"Authorization" : auth,
								// "Referrer" : "https://vrchat.net/home/world/wrld_a8cbf00c-f2d9-43a6-b257-675be512a02d",
								// "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
							}
						},
						function (error, response, body) {
							console.log(user1 + "response.header" + response.headers)
							console.log(user1 + "error" + error)
							console.log(user1 + "body" + body)
							console.log(JSON.parse(body));
							
							if (body.search("Cloudflare") > 0){
								console.log('Hit by cloudflare');
								callbackCount();
							}else{
								var userList = JSON.parse(body);
								// console.log(userList);
								// if .indexOf(users.currentAvatarImageUrl)
								

								async.forEachOf(userList, function (value, key, callback) {
									
									if (((value.tags) && (((value.tags.indexOf("system_trust_trusted")) > 0) || ((value.tags.indexOf("system_trust_veteran")) > 0))) && (avatarImg.indexOf(value.currentAvatarImageUrl) > 0 ) && (foundUsers.length < 60)){
										console.log(value.displayName);
										foundUsers.push({name: value.displayName, img: value.currentAvatarThumbnailImageUrl});
									};
									// if ((value.tags) && (value.tags.indexOf("system_trust_trusted")) > 0) {
										// console.log(value.tags.indexOf("system_trust_trusted"));
									// };
									
									callback();
								}, function (err) {
									console.log('User list ' + value1.toString() + ' have been processed successfully');
									callbackCount();
								});
							};
							
							
							

							


						}
					);
						
					
				}, function (err) {
					
					console.log('All Userlists have been processed successfully, adding old users to list');
					
					
					
					lineReader.eachLine('temp.txt', function(line) {
						var repeatCheck = {name: line.split(":::")[0], img: line.split(":::")[1]};
						if ((foundUsers.length < 60) && !(foundUsers.includes(repeatCheck))) {
							console.log("reading");
							foundUsers.push({name: line.split(":::")[0], img: line.split(":::")[1]});
						};
					}, function (err) {
						fs.writeFileSync("temp.txt", "", (err) => {
							if (err) console.log(err);
							console.log("Old users cleared");
						});
						
						
						
						console.log('All Userlists have been processed successfully, building image...');
						async.forEachOf(foundUsers, function (value2, key2, callback2) {
							var name = value2.name;
							var pic = value2.img;
							image.print(font, 0+Math.floor(key2/12) *(120) + 18, 0+(key2%12)*19, name);
							console.log(name);
							fs.appendFile("temp.txt", name + ":::" + pic + "\r\n", (err) => {
								if (err) console.log(err);
								// console.log("Successfully Written to File.");
							});
							
							// callback2();
							if (typeof pic !== 'undefined' && pic !== null){
								// console.log(pic)
								var r = request(pic, function (e, response) {
									if (e) {
										console.log('error: ', e);
										callback2();
									} else {
										// console.log(response.request.uri.href); //picture path
										Jimp.read(response.request.uri.href, (err, lenna) => {
										  if (err){
											  callback2();
										  } else {
											  lenna
												.resize(16, 12) // resize
												.quality(60); // set JPEG quality
												// console.log("written"); //picture path
												
											  image.composite(lenna, 0+Math.floor(key2/12) *(120), 0+(key2%12)*19, {
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
							console.log('All users have been processed successfully');
							image.write(worldid + ".png");
							resolve(image.getBufferAsync(Jimp.MIME_PNG));
						});
						
						
						
						
						
						
						
						
					});
					





			

			
			

				});
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			});
		});
		
		
		
		
		
		
		

		
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
				console.log((d - mtime));
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