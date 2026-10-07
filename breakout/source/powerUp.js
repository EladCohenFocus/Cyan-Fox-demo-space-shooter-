
function powerUp(x,y,kind,time)
{
    let PU_COLORS=['RED','PURPLE','BLUE'];;
    this.x=x;
    this.y=y;
    this.time=time;
    this.kind=kind;
    
    this.active=true;
    this.animationFrame=0;
    this.show=function()
    {
        push();
        translate(this.x,this.y);
        stroke('WHITE');
        strokeWeight(2);
        noFill();
        if(this.kind==PU_FIRE_RATE_INDEX)
        {
            line(0,-.4*POWER_UP_SIZE,0,-.2*POWER_UP_SIZE);
            line(0,.4*POWER_UP_SIZE,0,.2*POWER_UP_SIZE);
        }
        if(this.kind==PU_SPREAD_INDEX)
        {
            line(-.4*POWER_UP_SIZE,-.3*POWER_UP_SIZE,0,.4*POWER_UP_SIZE);
            line(.4*POWER_UP_SIZE,-.3*POWER_UP_SIZE,0,.4*POWER_UP_SIZE);
            line(-0*POWER_UP_SIZE,-.3*POWER_UP_SIZE,0,.4*POWER_UP_SIZE);
            
        }
         if(this.kind==PU_PIERCE_INDEX)
        {
            line(0*POWER_UP_SIZE,-.4*POWER_UP_SIZE,-.3*POWER_UP_SIZE,.2*POWER_UP_SIZE);
            line(0*POWER_UP_SIZE,-.4*POWER_UP_SIZE,.3*POWER_UP_SIZE,.2*POWER_UP_SIZE);
            line(-0*POWER_UP_SIZE,-.0*POWER_UP_SIZE,0,.4*POWER_UP_SIZE);
            
        }
        //frame
        let halfWidth=1.2*dist(this.animationFrame,0,POWER_UP_SIZE/2,0);
        stroke(PU_COLORS[this.kind]);
        strokeWeight(3);
        rect(-halfWidth,-POWER_UP_SIZE/1.5,halfWidth*2,POWER_UP_SIZE*5/4);
        pop();

    }
    this.update=function()
    {
        this.y+=SCROLL_SPEED;
        this.animationFrame=(this.animationFrame+.5)%POWER_UP_SIZE;
    }

}