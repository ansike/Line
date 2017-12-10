
//洗牌算法，保证每个数都有调动
function shuffle(arr) {
	var len = arr.length;
	arr.reduce(function (prev, cur, index, arr) {
		var temp = cur;
		var ri = random(0, len);
		var rd = arr[ri];
		arr.splice(ri, 1, cur);
		arr.splice(index, 1, rd);
	}, 0);
	return arr;
}
//随机start---(end-1)
function random(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}





// var arr=[1,2,3,4,5,6];

// var res=shuffle(arr);
// console.log(res);