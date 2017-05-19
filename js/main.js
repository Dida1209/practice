var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic= new Image();

var ane;
var fruit;
var wave;
var halo;
var dust;
var dustPic=[];

var mom;
var baby;
var babyEye=[];
var babyTail=[];
var babyBody=[];
var momTail=[];
var momEye =[];
var momBodyOra=[];
var momBodyBlu=[];

var mx;
var my;

var data;

document.body.onload=game;
function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}
function init(){
	//获得canvas context
	can1=document.getElementById("canvas1");//fishes,dust,ui,circle
	ctx1=can1.getContext('2d');
	can2=document.getElementById("canvas2");//background,ane,fruits
	ctx2=can2.getContext('2d');
	
	can1.addEventListener('mousemove',onMouseMove,false);
	
	//背景图片绘制
	bgPic.src="src/background.jpg";
	
	canWidth=can1.width;
	canHeight=can1.height;
	
	ane=new aneObj();
	ane.init();
	
	fruit=new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();
	
	baby=new babyObj();
	baby.init();
	
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="src/babyTail"+i+".png";
	}
	
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="src/babyEye"+i+".png";
	}
	
	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="src/babyFade"+i+".png";
	}
	
	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="src/bigTail"+i+".png";
	}
	
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="src/bigEye"+i+".png";
	}
	
	for(var i=0;i<8;i++){
		momBodyOra[i]=new Image();
		momBodyBlu[i]=new Image();
		momBodyOra[i].src="src/bigSwim"+i+".png";
		momBodyBlu[i].src="src/bigSwimBlue"+i+".png";
	}
	
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="src/dust"+i+".png";
	}
	
	mx=canWidth*0.5;
	my=canHeight*0.5;
	
	data=new dataObj();
	wave=new waveObj();
	wave.init();
	halo=new haloObj();
	halo.init();
	dust =new dustObj();
	dust.init();
}

function gameloop(){
	window.requestAnimFrame(gameloop);//优点：相对于setInterval，setTimeout更科学，当前绘制完成后，根据机器性能智能计算绘制下一帧的时间
									  //缺点：帧与帧之间的间隔不同，时间大小不同，速度变化突兀
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40)deltaTime=40;

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	momFruitCollision();

	baby.draw();
	momBabyCollision();
	
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}
function onMouseMove(e){
	if(!data.gameover){
		if(e.offsetX||e.layerX){
			mx=e.offsetX==undefined?e.layerX : e.offsetX;
			my=e.offsetY==undefined?e.layerY : e.offsetY;
		}
	}
	
}
