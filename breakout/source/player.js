
function player()
{
    
    this.active=true;
    this.flicker=300;
    this.y=HEIGHT*7/8;
    this.x=WIDTH/2;
    this.speed=2;
    this.init=function()
    {
        this.cannon=new Cannon(3);
        this.cannon.reloadTime=60;
    }
    this.show=function()
    {
        if (!this.active || (this.flicker>0 && int(this.flicker/20)%2==0))
            {return;}
        push();
        stroke('CYAN');
        fill('CYAN');
        strokeWeight(3);translate(this.x, this.y);
         rect(-PLAYER_SIZE/20,-PLAYER_SIZE/2,PLAYER_SIZE/10,PLAYER_SIZE*.8);
         rect(-PLAYER_SIZE/2,PLAYER_SIZE/2,PLAYER_SIZE,PLAYER_SIZE*.1);
         rect(-PLAYER_SIZE/1.8,0,PLAYER_SIZE/-10,PLAYER_SIZE*.8);
         rect(PLAYER_SIZE/1.8,0,PLAYER_SIZE/10,PLAYER_SIZE*.8);
        pop();
    }
    this.shoot=function()
    {
        if (!this.cannon.isReady()){return;}
        let shotSpeed=3;
        this.cannon.shoot();
        bullets.push(new playerShot(this.x,this.y,shotSpeed,-90));
        if (playerPowerUps[PU_SPREAD_INDEX]>0)
        {
          bullets.push(new playerShot(this.x,this.y,shotSpeed,-80));  
          bullets.push(new playerShot(this.x,this.y,shotSpeed,-100));
        }
    }
    this.update=function()
    {
        if (!this.active)
            {return;}
        if (this.flicker>0){this.flicker--;}
         if (this.flicker<0){this.flicker=0;}
        this.cannon.update();
        if (playerPowerUps[PU_FIRE_RATE_INDEX]>0){this.cannon.update();}
        if (dist(this.x,this.y,mouseX,mouseY)>3)
        {
            let angle=angleFromTo([this.x,this.y],[mouseX,mouseY])
            let pad=PLAYER_SIZE/1.2;
            this.y+=this.speed*sin(trueAngle(angle));
            this.x+=this.speed*cos(trueAngle(angle));
            if (this.x<pad){this.x=pad;}
            if (this.x>WIDTH-pad){this.x=WIDTH-pad;}
            if (this.y<HEIGHT/2+pad){this.y=HEIGHT/2+pad;}
            
            if (this.y>HEIGHT-pad){this.y=HEIGHT-pad;}
            SCROLL_SPEED=1-((this.y-(HEIGHT/2+pad))/(HEIGHT/2));
        }

    }
    this.init();   
}