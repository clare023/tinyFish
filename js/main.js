//canvas
var can1;
var can2;

//场景
var ctx1;
var ctx2;

var canWidth;
var canHeight;

//解决fps
var lastTime;//上一帧被执行时间
var deltaTime;//两帧时间间隔

//背景图片
var bgPic = new Image();

var ane;
var fruit;
var mom;
var baby;

//鼠标位置
var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlu = [];

var data;
var wave;
var halo;

var dust;
var dustPic = [];

document.body.onload = game;//body加载完后执行game，作为主入口
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
function init(){
	//获得canvas context 画布 画笔
	can1 = document.getElementById("canvas1");//fishes,dust,UI,circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById("canvas2");//background,ane,fruits
	ctx2 = can2.getContext('2d');
	
	//获取鼠标位置
	can1.addEventListener('mousemove',onMouseMove,false);
	
	bgPic.src = "src/background.jpg";//背景图片
	//canvas大小
	canWidth = can1.width;
	canHeight = can1.height;
	//海葵
	ane = new aneObj();
	ane.init();
	//果实
	fruit = new fruitObj();
	fruit.init();
	//大鱼
	mom = new momObj();
	mom.init();
	
	baby = new babyObj();
	baby.init();
	
	//鼠标在canvas中间
	mx = canWidth *0.5;
	my = canHeight * 0.5;
	
	for(var i = 0;i < 8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "src/babyTail" + i +".png";
	}
		for(var i = 0;i < 2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "src/babyEye" + i +".png";
	}
		for(var i = 0;i < 20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "src/babyFade" + i +".png";
	}
		for(var i = 0;i < 8; i++){
		momTail[i] = new Image();
		momTail[i].src = "src/bigTail" + i +".png";
	}
		for(var i = 0;i < 2; i++){
		momEye[i] = new Image();
		momEye[i].src = "src/bigEye" + i +".png";
	}
		
	data = new dataObj();
	for(var i = 0;i < 8; i++){
		momBodyOra[i] = new Image();
		momBodyOra[i].src = "src/bigSwim" + i +".png";
		momBodyBlu[i] = new Image();
		momBodyBlu[i].src = "src/bigSwimBlue" + i +".png";
	}
	//分数
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";
	
	wave = new waveObj();
	wave.init();
	
	halo = new haloObj();
	halo.init();
	
	for(var i = 0;i < 7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = "src/dust" + i +".png";
	}
	dust = new dustObj();
	dust.init();
}
//游戏循环，每帧刷新
function gameloop(){
	window.requestAnimFrame(gameloop);//相对于setInterval,setTimeout更科学,问题：fps：frame per second
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40) deltaTime = 40;//维持匀速运动
	
	drawBackground();
	ane.draw();
	fruitMontior();//监测屏幕上果实数量
	fruit.draw();
	momFruitsCollision();//吃果实
	momBabyCollision();
	
	//清空前一帧的内容
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	baby.draw();
	
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offsetX || e.layerX){
		mx = e.offsetX == undefined ? e.layerX : e.offsetX;
		my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}	
}
