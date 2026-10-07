function fragment(x,y,direction,color)
{
    this.shape=false;
    this.x=x;
    this.y=y;
    this.direction=direction;
    this.speed=false;
    this.rotRate=false;
    this.rot=0;
    this.lifeSpan=150;
    this.color=color;
    this.init=function()
    {
        this.lifeSpan+=int(random(60)-30);
        this.speed=random(1)+.3;
        this.shape=int(random(3));
        this.rotRate=int(random(32)-16);
    }
    this.update=function()
    {
        if (this.lifeSpan<0){return;}
        this.y+=this.speed*sin(trueAngle(this.direction));
        this.x+=this.speed*cos(trueAngle(this.direction));
        this.y+=SCROLL_SPEED;
        this.lifeSpan-=1;
        this.rot+=this.rotRate;
        this.rot=trueAngle(this.rot);

    }
    this.show=function()
    {
        if (this.lifeSpan<0){return};
        push();
        stroke(this.color);
        strokeWeight(3);
        noFill();
        translate(this.x,this.y);
        rotate(this.rot);
        if (this.shape==0){rect(-3,-3,6,7);pop();return;}
        if (this.shape==1){rect(0,-3,0,7);pop();return;}
        if (this.shape==2)
        {
            beginShape();
            vertex(0,-3);
            vertex(-3,2);    
            vertex(3,2); 
            endShape(CLOSE);
            pop();return;
        }
        
    }
    this.init();
}