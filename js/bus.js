//区间获取一个随机数
function fnMath(min,max){
	return Math.round( Math.random()*(max-min) )+min;
}

//随机获取一个6位数颜色
function fnColor(){
	var str="0123456789abcdef"
	var color="#";
	for(var i=1;i<=6;i++){
		color+=str.charAt( fnMath(0,15) );
	}
	return color;
}
//数组去重
function fnSpace(arr){
	var newarr=[];
	for(var i = 0;i<arr.length;i++){
	if(newarr.indexOf(arr[i])==-1 ){
		newarr.push( arr[i] );
	}
	}
	return newarr;
}
//随机获取一个数字的4位数验证码
function fnMathround(){
	 var str=""
	for(var i=0;i<4;i++){
		str+=fnMath(0,9)
	}
	return	str;
}
//随机获取一个包含数字字母的6位数验证码
function fnround(){
	var str="";
	for(var i=0;i<6;i++){
		var code=fnMath(48,122)
		if(code>=58 && code<=64 || code>=91 && code<=96){
			i--
		}else{
			str+=String.fromCharCode(code);
		}
	}
	return str;
}
//统计字符出现的次数
function fnCount(str){
	for(var code=32;code<=127;code++){
		var chi = String.fromCharCode(code);
		var count=0;
	for(var i=0;i<str.length;i++){
		if( chi==str.charAt(i) ){
			count++;
		}
	}	
	if(count>0){
 		document.write("字符"+chi+"出现了"+count+"次" +"<br />");
	}
	}
}
//获取id
function $id(id){
		return document.getElementById(id);
	}

//转换时间成中文显示方式
function dateToString(d){
	var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	var _y = d.getFullYear();
	var _m = d.getMonth()+1;
	var _d = d.getDate();
	var _h = toTwo( d.getHours() );
	var _mi =toTwo( d.getMinutes() );
	var _s =toTwo( d.getSeconds() );
	var str = _y + "年" + _m + "月" + _d + "日" + " ";
		str += _h + ":" + _mi + ":" + _s;
		str += " " + arr[ d.getDay() ]
		return str;
}
//判断时间如果小于10 前面拼接0
function toTwo(v){
	return v < 10 ? "0" + v : v;
}
//时间差
function diff(start,end){
	return (end.getTime() - start.getTime())/1000;
}
//倒计时函数

/*	var end=new Date("2018-03-2 22:25:00");//未来的时间
	var now=new Date();//获取现在的时间
	var t = diff(now,end);//获取时间差
	function showTime(now,end){
	if( t < 0){
		$id("time").innerHTML="商品过期了";
	}
	//剩余小时数
	var h = parseInt(t/3600);
	var m= parseInt( (t-h*3600)/60 );//分钟数
	var s  = parseInt( t-h*3600-m*60 );//秒数
	$id("time").innerHTML=h+":"+m+":"+s;//把时间上传到页面
	}
	showTime(now,end);
	var timer=setInterval(function(){//定义一个定时器
		t--;
		if(t<0){
			$id("time").innerHTML="商品过期了";
			clearInterval(timer);//清除定时器
		}else{
			showTime(now,end);//调用函数商品过期
		}
	},1000);*/
	//创建元素
	function create(ele){
 	return	document.createElement(ele);

}

//缓冲--多物体
//obj  要操作的元素
//json  {attr : target}
//callback 回调函数

function fnMove(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;//定时器中 定义一个开关变量 值为true时  可以停止运动
		var current = 0;
		for( var attr in json ){  //target: json[attr]
			if( attr == "opacity" ){
				current = parseFloat( getStyle(obj,attr) ) * 100;
			}else if( attr == "zIndex" ){
				current =parseInt( getStyle(obj,attr) ) ;
			}else{
				current =parseInt( getStyle(obj,attr) ) ;
			}
			var speed = (json[attr]-current)/10;
			speed = speed>0?Math.ceil(speed) : Math.floor(speed);
			if( current != json[attr] ){ //没有达到目标值
				flag = false;
			}
			//继续设置attr的值
			if( attr == "opacity" ){
				obj.style[attr] = (current + speed) / 100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
		
		//循环执行后  判断flag值如果为true  就停止定时器
		if( flag ){
			clearInterval(obj.timer);
			//上一个动作完成 进入到下一个动作
			if( callback ){
//				callback(); 
			}
		}
	},30)
}
function getStyle(obj,attr){
	if( window.getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}


//ajax函数封装
function fnAjax(url,callback,data){
		var ajax = null;
		if( window.XMLHttpRequest ){
			ajax = new XMLHttpRequest();
		}else{
			ajax = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if( data ){
			url = url + "?" + data;
		}
		ajax.open("GET",url);
		ajax.send();	 
		 
		ajax.onreadystatechange = function(){
			if( ajax.status == 200 && ajax.readyState == 4 ){
				callback(ajax.responseText);
			}
		}
	}
