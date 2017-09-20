var fruitObj = function(){
	this.alive = [];//bool 是否活着
	this.x = [];
	this.y = [];
	this.aneNO = [];
	this.l = [];//fruit size
	this.spd = [];//成长速度，fly速度
	this.fruitType = [];//黄，蓝
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;//果实池
fruitObj.prototype.init = function(){
	for(i = 0;i < this.num; i++){
		this.alive[i] = false;//休眠
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNO[i] = 0;
		this.spd[i] = Math.random() * 0.017 + 0.003;//[0.003,0.02)
		this.fruitType[i] = "";
		//this.born(i);//let all fruits borns
	}
	this.orange.src = "src/fruit.png";
	this.blue.src = "src/blue.png";
}
//长大=>成熟
fruitObj.prototype.draw = function(){
	for(var i = 0;i < this.num; i++){
		//draw
		//find an ane,grow,fly up
		if(this.alive[i]){
			if(this.fruitType[i] == "blue"){
				var pic = this.blue;
			}
			else{
				var pic = this.orange;
			}
			//grow
			if(this.l[i] <= 14){
				var NO = this.aneNO[i];
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.l[i] += this.spd[i] * deltaTime; //平滑生长
				
			}
			else{
				this.y[i] -= this.spd[i] * 7 * deltaTime;//成熟后向上飘
				
			}
			ctx2.drawImage(pic,this.x[i] - this.l[i] * 0.5,this.y[i] - this.l[i] * 0.5,this.l[i],this.l[i])			
			//飘出去
			if(this.y[i] < 10){
				this.alive[i]  = false;
			}
		}	
	}
}

fruitObj.prototype.born = function(i){
	this.aneNO[i] = Math.floor(Math.random() * ane.num);//随机找一个海葵出生
	this.l[i] = 0;//刚出生大小为0
	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.2){
		this.fruitType[i] = "blue";
	}
	else{
		this.fruitType[i] = "orange";
	}
}
//保持屏幕上有15个果实
function fruitMontior(){
	var num = 0;
	for(var i = 0;i <fruit.num; i++){
		if(fruit.alive[i]) num++;
	}
	if(num < 15){
		//send fruit
		sendFruit();
		return;
	}
}
//每次send一个fruit
function sendFruit(){
	for(var i = 0;i <fruit.num; i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
fruitObj.prototype.dead  = function(i){
	this.alive[i] = false;
}
 