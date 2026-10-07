function enemyShot(x,y,speed,angle)
{
    this.x=x;
    this.y=y;
    this.angle=angle;
    this.speed=speed;
    this.active=true;
    
    this.update=function()
    {
        if (!isInBox([this.x,this.y],[0,0,WIDTH,HEIGHT])){this.active=false;return;}
        this.y+=this.speed*sin(trueAngle(this.angle));
        this.x+=this.speed*cos(trueAngle(this.angle));
    }
    this.show=function()
    {
        if (!this.active){return};
        push();
        stroke('WHITE');
        strokeWeight(1);
        fill('RED');
        translate(this.x,this.y);
        rotate(this.angle);
        ellipse(0,0,10,5)
        pop();
    }
}
function playerShot(x,y,speed,angle)
{
    this.x=x;
    this.y=y;
    this.angle=angle;
    this.speed=speed;
    this.active=true;
    
    this.update=function()
    {
        if (!isInBox([this.x,this.y],[0,0,WIDTH,HEIGHT])){this.active=false;return;}
        this.y+=this.speed*sin(trueAngle(this.angle));
        this.x+=this.speed*cos(trueAngle(this.angle));
    }
    this.show=function()
    {
        if (!this.active){return};
        push();
        stroke('YELLOW');
        strokeWeight(1);
        fill('MAGENTA');
        if (playerPowerUps[PU_PIERCE_INDEX]>0)
        {
            stroke('RED');
            fill('RED');
        }
        translate(this.x,this.y);
        rotate(this.angle+90);
        rect(-1,-4,2,8);
        pop();
    }
}