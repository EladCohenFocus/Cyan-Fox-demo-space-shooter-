

function squadron(waveComposition) 
//example [2,4,1] 2 ships of class 1 4 of 2 1 of 3
//origin and target are points as a list ie [100,230]
{
    this.panic=false;
    
    this.target=false;
    this.leader=false;
    this.squadronList=[];
    this.steerHistory=[];
    this.turnRate=1.8;
    this.speed=1.5;
    this.frameGap=ENEMY_SIZE*2;
    this.checkBullets=function(ship)
    {
        if (!ship.active){return;}
        for (let i=0;i<bullets.length;i++)
        {
            if (dist(ship.x,ship.y,bullets[i].x,bullets[i].y)<ENEMY_SIZE)
            {
                ship.active=false;
                if (playerPowerUps[PU_PIERCE_INDEX]<=0)
                {
                    playerPowerUps[PU_PIERCE_INDEX]=0;
                    bullets[i].active=false;
                }
                let rnd=int(random(10-ship.kind));
                if (rnd==5){powerUpsFalling.push(new powerUp(ship.x,ship.y,int(random(playerPowerUps.length)),1000))}
                for (let i = 0 ;i<6;i++)
                {
                    frags.push(new fragment(ship.x,ship.y,60*i,COLORS[ship.kind-1]));
                }


            } 
        }
    }
    this.leaderCheckBullets=function()
    {
        this.checkBullets(this.leader);
    }
   

    
    this.isSquadronActive=function()
    {
        for (let x=0;x<this.squadronList.length;x++)
        {
            if (this.squadronList[x].active)
            {return true;}
        }
        return false;
    }
    this.show=function()
    {
        for (let x=0;x<this.squadronList.length;x++){this.squadronList[x].show();}
    }
    this.leaderSteerNeeded=function()
    {
        let steer=0;
        
        let angleDelta=trueAngleDif
        (
            this.leader.angle,
            angleFromTo
            (
                [this.leader.x,this.leader.y],
                this.target
            )
        );
        if (angleDelta>this.turnRate){steer=-1;return steer;}
        if (angleDelta<-this.turnRate){steer=1;return steer;}
        return steer;      

    }
    this.useShipCannon=function(ship)
    {
        ship.cannon.update();
         //console.log(ship.cannon.isReady());
        // console.log(ship.active);
        if (ship.cannon.isReady()&& ship.active)
            {
                let rnd=int(random(2));
                
                if (rnd==0)
                    {
                        let shots;
                        ship.cannon.shoot();
                        shots=ship.createShotList(this.panic);
                        //console.log(shots);
                        addShots(shots);
                    }
                    else
                    {ship.cannon.reload=int (ship.cannon.reload*3/4)}
            }
    }
    this.useLeaderCannon=function(){this.useShipCannon(this.leader)}
    
    this.steerShip=function(ship,rate)
    {
        ship.angle=trueAngle(ship.angle+(rate*this.turnRate))
    }
    this.moveShip=function(ship)
    {
        ship.y+=this.speed*sin(trueAngle(ship.angle));
        ship.x+=this.speed*cos(trueAngle(ship.angle));}
    this.leaderSteer=function()
    {
        let steer=this.leaderSteerNeeded();
        this.steerHistory.unshift(steer);
        this.leader.angle=trueAngle(this.leader.angle+(steer*this.turnRate))
        
    }
    this.leaderMove=function()
    {
        this.leader.y+=this.speed*sin(trueAngle(this.leader.angle));
        this.leader.x+=this.speed*cos(trueAngle(this.leader.angle));

    }
    this.leaderReachedTarget=function()
    {
       return (dist(this.leader.x,this.leader.y,this.target[0],this.target[1])<this.speed*1);
    }
    this.update=function()
    {
        if(!this.isSquadronActive()){return;}
        //console.log(this.shotsList);
        if (this.steerHistory.length>this.squadronList*this.frameGap)
        {this.steerHistory.pop();}
        this.leaderSteer();
        this.leaderMove();
        this.leaderCheckBullets();
        this.useLeaderCannon();
        //if (!this.leader.active){this.squadronList.pop();this.leader=this.squadronList[0];}
        let survivors=1;
        
        for (let x=1 ;x<this.squadronList.length;x++)
        {
           // if (!this.leader.active){this.squadronList.pop();this.leader=this.squadronList[0];}
             if (!this.panic  && this.squadronList[x].active){survivors++;}
             if (this.steerHistory.length>x*this.frameGap)
            {
               
                    this.steerShip(this.squadronList[x],this.steerHistory[x*this.frameGap]);
                    this.moveShip(this.squadronList[x]);
                    this.checkBullets(this.squadronList[x]);
                    this.useShipCannon(this.squadronList[x]);
                    
                
                
            }
        }
        if (!this.panic && survivors/this.squadronList.length<.8)
        {
            
            this.panic=true;}
        if (this.leaderReachedTarget())
        {
            let x= int(random(3));
            if (x!=1){
            this.target=TARGET_POINTS[int(random(TARGET_POINTS.length))]}
        }
        
    }
    
    this.build=function()
    {
        this.target=TARGET_POINTS[int(random(TARGET_POINTS.length))]
        let origin=STARTING_POINTS[int(random(STARTING_POINTS.length))];
        this.angle=0;//int(angleFromTo(origin,this.target));
        for (let i=0;i<waveComposition.length;i++)
        {
            for (let j=0;j<waveComposition[i];j++)
            {
                let edge=int(random(2));
                let enemy1=new enemy(origin[0],origin[1],this.angle,i+1); 
                if (edge==0)
                {
                    this.squadronList.push(enemy1);

                }
                else{this.squadronList.unshift(enemy1)}
            }
        }
        this.leader=this.squadronList[0];
        
    }
    this.build();
}