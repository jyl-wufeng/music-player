/*jyl---2017/04/29----歌词同步js*/
class LyricSynchronization {
	constructor() {
		this.gty = "N";
		this.musicTime = null;
	};
	static getmusicTime() {
		return this.musicTime;
	}
	static Initialization(lrc, id) { //初始化歌词   lrc 歌词  id渲染容器id
		let objs = this.parseLyric(lrc);
		let i = 0;
		let lis = '';
		for (var key in objs) {
			i++
			if (i < 7) {
				lis = lis + `<li id=${'rr'+key}>${objs[key]}</li>`;
				console.log('&' + '' + key + '=' + objs[key] + '')
			} else {
				lis = lis + `<li id=${'rr'+key} style="display:none;">${objs[key]}</li>`;
			}
		}
		$('#' + id).append(lis);
		return objs;
	}
	static clear(timens) { //清除任务 timens任务数组
		for (var i in timens) {
			clearInterval(timens[i]);
		}
		// console.log(deArry);
		timens = [];
		this.gty = "Y";
	}


	static srt(objs) { //定时任务 开始同步 objs解析后的歌词对象
		let j = 0;
		let timens = [];
		for (let i in objs) {

			var a = setTimeout(() => {
				this.con("rr" + i)
			}, i * 1000 - implTime + 1000);
			timens[j] = a;
			j++;
		}
		return timens
	}
	static parseLyric(lrc) { //解析歌词
		var lyrics = lrc.split("\n");
		var lrcObj = {};
		for (var i = 0; i < lyrics.length; i++) {
			var lyric = decodeURIComponent(lyrics[i]);
			var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
			var timeRegExpArr = lyric.match(timeReg);
			if (!timeRegExpArr) continue;
			var clause = lyric.replace(timeReg, '');
			for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
				var t = timeRegExpArr[k];
				var min = Number(String(t.match(/\[\d*/i)).slice(1)),
					sec = Number(String(t.match(/\:\d*/i)).slice(1));
				//    hec=Number(String(t.match(/\.\d*/i)).slice(1));
				var time = min * 60 + sec //+'.'+hec;
				this.musicTime = time;
				if (clause != undefined && clause != '') {
					lrcObj[time] = clause;
				}

			}
		}
		return lrcObj;
	}
	static showhide(deDom, neDom, opacity = 80) {
		let prevDom = deDom.prev();
		let Popacity = opacity;
		let nextDom = neDom.next();
		prevDom.css({
			"filter": "alpha(Opacity=" + Popacity + ")",
			"opacity": Popacity / 100,
			"text-decoration": ""
		});
		if (Popacity > 40) {
			prevDom.show();
		} else {
			prevDom.hide();
		}


		nextDom.show();
		nextDom.css({
			"filter": "alpha(Opacity=" + opacity + ")",
			"opacity": opacity / 100
		});
		Popacity = Popacity - 10;
		if (opacity > 40) {
			this.showhide(prevDom, nextDom, Popacity);
		}

	}

	static con(d) { //同步歌词方法 
		let sr = $("[id=" + "'" + d + "'" + "]");
		if (this.gty == "Y") {
			$("li").hide();
		}
		sr.show();
		// console.log( $("[id="+"'"+currentKey+"'"+"]").next()[0].id);
		sr.css({
			"text-decoration": "underline"
		});
		sr.css({
			"filter": "alpha(Opacity=100)",
			"opacity": "1"
		})
		this.showhide(sr, sr);

	}
}