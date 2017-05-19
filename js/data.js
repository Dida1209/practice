var dataObj=function(){
	this.fruitNum=0;
	this.double=1;
	this.score=0;
	this.gameover=false;
	this.alpha=0;
}
dataObj.prototype.draw=function(){
	ctx1.save();
	ctx1.fillStyle="white";
	ctx1.font="30px Verdana";
	ctx1.textAlign="center";
	ctx1.shadowBlur=10;
	ctx1.shadowColor="white";
	ctx1.fillText("score : "+this.score,canWidth*0.5,canHeight-50);
	if(this.gameover){
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1)this.alpha=1;
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.fillText("GAMEOVER",canWidth*0.5,canHeight*0.5);
	}
	ctx1.restore();
}
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*10*this.double;
	this.fruitNum=0;
	this.double=1;
}
