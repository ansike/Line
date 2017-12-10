
function Line(val) {
	var Line = this;
	Line.$box = val;
	Line.candidate = 23;
	Line.candidated = [];
	Line.w = 17;
	Line.h = 12;
	Line.boxSize = 204;
	Line.size = 150;
	Line.selected = [];
	Line.init();
}
Line.prototype={
	init:function () {
		var that = this;
		this.initArr(function (arr) {
			//洗牌
			that.candidated = shuffle(arr);
			that.createDom(that.$box, that.candidated);
			that.bindEvent();
			console.log(that.candidated);

		});
	},
	initArr:function (cb) {
		//盒子放入尺寸比待选的倍数
		var times = Math.floor(this.size/this.candidate);
		//剩余
		var remain = Math.floor(this.size%this.candidate)/2;
		var temp = [], temps = [];

		for(var i = 0; i < this.candidate; i++){
			temp.push(i)
		}
		for(var i = 0; i < times; i++){
			temps = temps.concat(temp);
		}
		//22 * 6 = 138
		this.candidated = temps;

		temp = [],temps = [];
		for(var i = 0; i < remain; i++){
			temp.push(random(0,23));
		}
		//150
		temps = this.candidated.concat(temp, temp);
		this.candidated = temps;
		console.log(this.candidated)
		cb && cb(this.candidated);
	},
	createDom:function ($dom,arr) {
		var that = this;
		var index = 0;
		$dom.html('');
		for(var i = 0; i < this.h; i++){
			for(var j = 0; j <this.w; j++){
				if(i == 0 || i == this.h-1 || j == 0 || j ==this.w-1){
					var $item = $("<div class='items'></div>");
				}else{
					if(arr[index] >= 0){
						var $item = $("<div class='items line' data-index="+index+" data-candidate="+arr[index]+"><img src='./img/pieces/"+arr[index]+".gif'></div>");
					}else{
						var $item = $("<div class='items line'></div>");
					}
					index++;
				}
				$dom.append($item);
			}
		}
	},
	bindEvent:function () {
		var that = this;
		that.$box.delegate(".line","click",function () {
			var $this = $(this);
			var di = $(this).attr('data-index');
			var dc = $(this).attr('data-candidate');
			$this.addClass('selected');
			if(that.selected.length == 0){
				that.selected.push({
					di:di,
					dc:dc
				})
				return;
			}else{
				if(that.selected[0].dc == dc){
					console.log(that.selected[0].di,di);
					that.calcRoute(that.selected[0].di,di);
					debugger
					// that.candidated.splice(that.selected[0].di,1,false);
					// that.candidated.splice(di,1,false);
					// that.selected = [];
					// that.createDom(that.$box,that.candidated);
					console.log('1');
				}else{
					that.selected.splice(0, 1, {
						di:di,
						dc:dc
					})
					$this.siblings().removeClass("selected");
					console.log('2');
				}
			}
		})
	},
	calcRoute:function (prev,cur) {
		var t1 = {
			x : Math.floor(prev / 15),
			y : prev % 15
		};
		var t2 = {
			x : Math.floor(cur / 15),
			y : cur % 15
		};
		console.log(t1,t2)
	}

}

var $con = $("#container");
var line = new Line($con);