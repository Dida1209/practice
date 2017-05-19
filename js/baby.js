var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	
	this.babyTailTimer=0;//计时器
	this.babyTailCount=0;//当前图片序号
	
	this.babyEyeTimer=0;//计时器
	this.babyEyeCount=0;//当前图片序号
	this.babyEyeInterval=1000;//动作间隔
	
	this.babyBodyTimer=0;//计时器
	this.babyBodyCount=0;//当前图片序号
}
babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
}
babyObj.prototype.draw=function(){
	
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.99);
	//delta angle
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	
	//lerp angle
	this.angle=lerpAngle(beta,this.angle,0.6);
	//babyTail timer count
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount+=1;
		this.babyTailCount%=8;
		this.babyTailTimer%=50;
	}
	//babyEye timer count interval
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;
		if(this.babyEyeCount==0){
			this.babyEyeInterval=Math.random()*1500+2000;
		}else{
			this.babyEyeInterval=200;
		}
	}
	//babyBody Timer Count
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount+=1;
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
			//gameover;
			data.gameover=true;
		}
	}
	
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(babyTail[this.babyTailCount],-babyTail[this.babyTailCount].width*0.5+23,-babyTail[this.babyTailCount].height*0.5);
	ctx1.drawImage(babyBody[this.babyBodyCount],-babyBody[this.babyBodyCount].width*0.5,-babyBody[this.babyBodyCount].height*0.5);
	ctx1.drawImage(babyEye[this.babyEyeCount],-babyEye[this.babyEyeCount].width*0.5,-babyEye[this.babyEyeCount].height*0.5);
	
	ctx1.restore();
	
}
