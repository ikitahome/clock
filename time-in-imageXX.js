const fs = require("fs");
const request = require("request");
const Jimp = require("jimp");
const tzlookup = require("tz-lookup");
const moment = require("moment-timezone");

const make8x8ImageBufferWith4ColorsXX = c=>{
	return new Promise((resolve,reject)=>{
		let imageData = [];
		for (var i=0; i<4096; i++) {
			let colorIndex = 18;

			if ((i%64) < 8){	
				if (i < 512) {
					colorIndex = 0;
				}
				else if (i <1024) {
					colorIndex = 8;
				}
				else if (i < 1536) {
					colorIndex = 16;
				};
			}
			else if ((i%64) < 16){
				if (i < 512) {
					colorIndex = 1;
				}
				else if (i <1024) {
					colorIndex = 9;
				}
				else if (i < 1536){
					colorIndex = 17;
				};
			}
			else if ((i%64) < 24){
				if (i < 512) {
					colorIndex = 2;
				}
				else if (i <1024) {
					colorIndex = 10;
				}
				else if (i < 1536){
					// colorIndex = 18;
				};
			}
			else if ((i%64) < 32){
				if (i < 512) {
					colorIndex = 3;
				}
				else if (i <1024) {
					colorIndex = 11;
				}
				else if (i < 1536){
					// colorIndex = 19;
				};
			}
			else if ((i%64) < 40){
				if (i < 512) {
					colorIndex = 4;
				}
				else if (i <1024) {
					colorIndex = 12;
				}
				else if (i < 1536){
					// colorIndex = 20;
				};
			}
			else if ((i%64) < 48){
				if (i < 512) {
					colorIndex = 5;
				}
				else if (i <1024) {
					colorIndex = 13;
				};

			}
			else if ((i%64) < 56){
				if (i < 512) {
					colorIndex = 6;
				}
				else if (i <1024) {
					colorIndex = 14;
				};

			}
			else if ((i%64) < 65){
				if (i < 512) {
					colorIndex = 7
				}
				else if (i <1024){
					colorIndex = 15;
				};
				
			};
			// if (i<8192) {
				// colorIndex = (i%128<64)? 0: 1;
			// } else {
				// colorIndex = (i%128<64)? 2: 3;
			// }

			// console.log(i + " " + colorIndex);
			
			imageData = imageData.concat([
				c[colorIndex][0],
				c[colorIndex][0],
				c[colorIndex][0],
			]);
		}

		new Jimp({
			width: 64,
			height: 64,
			data: Buffer.from(imageData)
		}, (err,image)=>{
			resolve(image.getBufferAsync(Jimp.MIME_PNG));
		});
	});
}

const makeTimeImageBufferXX = (time)=>{ // 24,60,60
	return new Promise((resolve,reject)=>{
		
		//

		let h = ((time[0])/24)*255;
		let m = ((time[1])/60)*255;
		let s = ((time[2])/60)*255;
		let hbin = time[0].toString(2);
		let mbin = time[1].toString(2);
		let sbin = time[2].toString(2);
		// console.log("sub: " + Number(hbin.substring(0, 1)));
		
		if (hbin.length == 0){
			hbin = "000000" + hbin
		}
		else if (hbin.length == 1){
			hbin = "00000" + hbin
		}
		else if (hbin.length == 2){
			hbin = "0000" + hbin
		}
		else if (hbin.length == 3){
			hbin = "000" + hbin
		}
		else if (hbin.length == 4){
			hbin = "00" + hbin
		}
		else if (hbin.length == 5){
			hbin = "0" + hbin
		};
		
		
		if (mbin.length == 0){
			mbin = "000000" + mbin
		}
		else if (mbin.length == 1){
			mbin = "00000" + mbin
		}
		else if (mbin.length == 2){
			mbin = "0000" + mbin
		}
		else if (mbin.length == 3){
			mbin = "000" + mbin
		}
		else if (mbin.length == 4){
			mbin = "00" + mbin
		}
		else if (mbin.length == 5){
			mbin = "0" + mbin
		};
		
		
		
		
		if (sbin.length == 0){
			sbin = "000000" + sbin
		}
		else if (sbin.length == 1){
			sbin = "00000" + sbin
		}
		else if (sbin.length == 2){
			sbin = "0000" + sbin
		}
		else if (sbin.length == 3){
			sbin = "000" + sbin
		}
		else if (sbin.length == 4){
			sbin = "00" + sbin
		}
		else if (sbin.length == 5){
			sbin = "0" + sbin
		};
		
		
		
		let h1 = Number(hbin.substring(0, 1))*255;
		let h2 = Number(hbin.substring(1, 2))*255;
		let h3 = Number(hbin.substring(2, 3))*255;
		let h4 = Number(hbin.substring(3, 4))*255;
		let h5 = Number(hbin.substring(4, 5))*255;
		let h6 = Number(hbin.substring(5, 6))*255;
		let m1 = Number(mbin.substring(0, 1))*255;
		let m2 = Number(mbin.substring(1, 2))*255;
		let m3 = Number(mbin.substring(2, 3))*255;
		let m4 = Number(mbin.substring(3, 4))*255;
		let m5 = Number(mbin.substring(4, 5))*255;
		let m6 = Number(mbin.substring(5, 6))*255;
		let s1 = Number(sbin.substring(0, 1))*255;
		let s2 = Number(sbin.substring(1, 2))*255;
		let s3 = Number(sbin.substring(2, 3))*255;
		let s4 = Number(sbin.substring(3, 4))*255;
		let s5 = Number(sbin.substring(4, 5))*255;
		let s6 = Number(sbin.substring(5, 6))*255;
		
		// console.log("s: " + time[0]);
	    // console.log("h: " + hbin);
		// console.log(h1);
		// console.log(h2);
		// console.log(h3);
		// console.log(h4);
		// console.log(h5);
		// console.log(h6);
		
		// console.log("s: " + time[1]);
		// console.log("m: " + mbin);
		// console.log(m1);
		// console.log(m2);
		// console.log(m3);
		// console.log(m4);
		// console.log(m5);
		// console.log(m6);
		
		
		
		// console.log("s: " + time[2]);
		// console.log("s: " + sbin);
		// console.log(s1);
		// console.log(s2);
		// console.log(s3);
		// console.log(s4);
		// console.log(s5);
		// console.log(s6);
		
		
		make8x8ImageBufferWith4ColorsXX([
			[h1,0,0],
			[h2,0,0],
			[h3,0,0],
			[h4,0,0],
			[h5,0,0],
			[h6,0,0],
			[m1,0,0],
			[m2,0,0],
			[m3,0,0],
			[m4,0,0],
			[m5,0,0],
			[m6,0,0],
			[s1,0,0],
			[s2,0,0],
			[s3,0,0],
			[s4,0,0],
			[s5,0,0],
			[s6,0,0],
			[0,0,0],

		]).then(buffer=>{
			resolve(buffer);
		});
	});
};

const generateCharactersXX = (amount)=>{
	let out = "";
	let choice = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");
	for (var i=0; i<amount; i++) {
		out+=choice[Math.floor(Math.random()*choice.length)];
	}
	return out;
}

// var cachedTzs = {};
// setInterval(()=>{
	// cachedTzs = {};
// }, 1000*60*60*24*7);
// every 7 days clear

const TimeInImageXX = function (app,path) {
	this.onRequest = ()=>{};

	app.get(path+"/:random", (req,res)=>{
		this.onRequest(req);

		res.header({"Content-Type": "image/png"});

		let ipAddr = req.headers["x-forwarded-for"];
		if (ipAddr){
			var list = ipAddr.split(",");
			ipAddr = list[list.length-1];
		} else {
			ipAddr = req.connection.remoteAddress;
		}
		
		
		let ip = (ipAddr.split(":")[3]);
		console.log("ipAddr: " + ipAddr);
		// if (cachedTzs[ip]) {
			// let time = moment().tz(cachedTzs[ip]).format("HH:mm:ss")
				// .split(":").map(x=>parseInt(x));

			// makeTimeImageBufferXX(time).then(buffer=>{
				// res.end(buffer);
			// });

			// return;
		// }

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
				console.log("ip: " + ip);
				body = body
					.split("ipinfo.io</a>")[1].split("</table>")[0]
					.split("<tr>")[4].split("<td>");

				let tz = tzlookup(
					body[3].split("</")[0],
					body[4].split("</")[0]
				);

				// cachedTzs[ip] = tz;

				let time = moment().tz(tz).format("HH:mm:ss")
					.split(":").map(x=>parseInt(x));

				makeTimeImageBufferXX(time).then(buffer=>{
					res.end(buffer);
				});
			} catch(err) {
				console.log(err);
				res.send();
			}
		});
	});

	app.get(path, (req,res)=>{
		res.redirect(path+"/"+generateCharactersXX(8)+".png");
	});
}

module.exports = TimeInImageXX;