var aneObj = function(){
	//start point,control point,end point(sin)
	this.rootx = [];//
	this.headx = [];
	this.headyfirst = [];
	this.heady = [];
	this.amp = [];
	this.alpha = 0;
}
aneObj.prototype.num = 50;//海葵数量

aneObj.prototype.init = function(){
	for(var i = 0;i < this.num; i++){
		this.rootx[i] = i*16 + Math.random()*20;//间隔16，[0,1)更随机
		this.headx[i] = this.rootx[i];//海葵高度
		this.headyfirst[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 30;
	}
}
//从底部画上去
aneObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);//[-1,1]
	//样式只在save,restore中起作用
	ctx2.save();
	ctx2.globalAlpha = 0.5;//透明度
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";//线条终点样式
	ctx2.strokeStyle = "#753575";
	for(var i=0; i < this.num; i++){
		//beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
		ctx2.beginPath();//开始路径
		ctx2.moveTo(this.rootx[i],canHeight);//起始点
		this.headx[i] = this.rootx[i] + l * this.amp[i];
		this.heady[i] = canHeight-100-Math.sqrt((canHeight-this.headyfirst[i]-100)*(canHeight-this.headyfirst[i]-100)-this.amp[i]*l*this.amp[i]*l);
		ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100,this.headx[i],this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}
