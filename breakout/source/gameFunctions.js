
function drawOwnShipsLeft()
{
    for (let i=0;i<ownShips.length-1 ;i++)
    {
        push();
        stroke('CYAN');
        noFill();
        strokeWeight(3);translate((i+1)*(PLAYER_SIZE*2), PLAYER_SIZE/2);
         rect(-PLAYER_SIZE/20,-PLAYER_SIZE/2,PLAYER_SIZE/10,PLAYER_SIZE*.8);
         rect(-PLAYER_SIZE/2,PLAYER_SIZE/2,PLAYER_SIZE,PLAYER_SIZE*.1);
         rect(-PLAYER_SIZE/1.8,0,PLAYER_SIZE/-10,PLAYER_SIZE*.8);
         rect(PLAYER_SIZE/1.8,0,PLAYER_SIZE/10,PLAYER_SIZE*.8);
        pop();
    }
}
function createParticles()
{
    
    for (let i = 0 ;i<24;i++)
    {
        PARTICLES.push([int((.1*WIDTH) + random (int (WIDTH*.8))),int(random(HEIGHT))]);   
    }
}
function manageParticles()
{
    let mod=0;
    for (let i = 0 ;i<24;i++)
    {
        mod=i%3;
        if (PARTICLES[i][1]>HEIGHT)
        {
            PARTICLES[i][1]=-int(random(200)-10);
            PARTICLES[i][0]=int((.1*WIDTH) + random (int (WIDTH*.8)));
        }
        PARTICLES[i][1]+=(SCROLL_SPEED*(1+mod));
        push();
        stroke('WHITE');
        strokeWeight(1);
        line(PARTICLES[i][0],PARTICLES[i][1],PARTICLES[i][0],PARTICLES[i][1]+SCROLL_SPEED+1+(mod*SCROLL_SPEED*2));
        pop();   
            
           
    }
}
function destroyPlayer(){
  if (!PLAYER.active){return;}
  PLAYER.active=false;

 
  if (ownShips.length>0)
  {
    let s = ownShips[0];
    for (let i = 0 ;i<6;i++)
    {
      frags.push(new fragment(s.x,s.y,60*i,'CYAN'));
    }


  }
}
function manageFrags(){
  for(let i=0 ; i<frags.length;i++){
  frags[i].show();
  frags[i].update();
    if (frags[i].lifeSpan<0){frags.splice(i,1);i-=1;}
  }
  if (frags.length<1 && ownShips.length>0 && !PLAYER.active)
    {
      ownShips.splice(0,1);
     if(ownShips.length>0){
       PLAYER=ownShips[0];
      PLAYER.x=mouseX;
      PLAYER.y=mouseY;}
      //console.log(ownShips);
    }
    
}
function manageBullets()
{
  for (let i=0 ;i<bullets.length;i++)
  {
    if (!bullets[i].active){bullets.splice(i,1);i--;}
    else
    {
      bullets[i].show();
      bullets[i].update();


    }}}
function manageShots()
    {
        for (let xx=0;xx<shotsList.length;xx++)//this.shotsList.length-1 ;x<0;x--
        {
            if (shotsList[xx].active)
            {
                shotsList[xx].show();
                shotsList[xx].update();
                if (ownShips.length>0 && PLAYER.flicker<=0 && dist(shotsList[xx].x,shotsList[xx].y,PLAYER.x,PLAYER.y)<PLAYER_SIZE)
                {
                    destroyPlayer();
                   shotsList[xx].active=false;
                }
            }
            else{shotsList.splice(xx,1);}
        }
    }

  
function addShots(lst)
    {
        if (!lst){return;}
        for(let x = 0;x<lst.length;x++)
        {
            shotsList.push(lst[x]);
        }
    }
function managePowerUps()
{
    for (let x=0;x<playerPowerUps.length;x++)
    {
      if (playerPowerUps[x]<0)
      {playerPowerUps[x]=0}
      else{playerPowerUps[x]-=1;}
    }
    let pu;
    //console.log(playerPowerUps)
    for (let x=0;x<powerUpsFalling.length;x++)
    {
      pu=powerUpsFalling[x];
      pu.show();
      pu.update();
      if (ownShips.length>0 && pu.active && dist(pu.x,pu.y,PLAYER.x,PLAYER.y)<POWER_UP_SIZE)
      {
        
        playerPowerUps[pu.kind]+=pu.time;
        pu.active=false;
      }
      if (pu.y>width+POWER_UP_SIZE){pu.active=false;}
      if (!pu.active){powerUpsFalling.splice(x,1);x--}
    }
    
}
function nextWave1()
  {
    THIS_WAVE=[];
    THIS_WAVE_COUNT+=1;
    THIS_WAVE=new wave(WAVES[THIS_WAVE_COUNT-1]);
  }
function nextWave()
{
    let tempwave=[];
    let waveStrength=THIS_WAVE_COUNT*2;
    let squadronsCount=int(random(3))+1;
    let squadronStrength=int(waveStrength/squadronsCount)+1;
    while (squadronStrength > MAX_SQUADRON_SIZE*3 )
    {
        squadronsCount+=1;
        squadronStrength=int(waveStrength/squadronsCount)+1;
    
    }
    for (let x = 0;x<squadronsCount;x++)
    {
        tempwave.push(createSquadron(squadronStrength,MAX_SQUADRON_SIZE) )
    }
    console.log(tempwave);
    THIS_WAVE=new wave(tempwave);
    THIS_WAVE_COUNT+=1;if (THIS_WAVE_COUNT %4 ==1 ){ownShips.push(new player());} }
  function createSquadron(strNeeded, maxShips) {
    // Check if the required strength exceeds the absolute maximum capacity
    if (strNeeded > 3 * maxShips) {
        return null; 
    }

    let a = 0;
    let b = 0;
    let c = 0;

   
    if (strNeeded <= maxShips) {
        a = strNeeded;
    } 
    
    else if (strNeeded <= 2 * maxShips) {
        b = strNeeded - maxShips;
        a = maxShips - b;
    } 
    
    else {
        c = strNeeded - (2 * maxShips);
        b = maxShips - c;
    }

    return [a,b,c];
}
function gameOver()
{
   background(0);
  //drawOwnShipsLeft();
  manageParticles();
  THIS_WAVE.manage();  
  manageBullets();
  manageShots();
  manageFrags(); 
  fill('RED');
    textAlign(CENTER, CENTER);
    textSize(48);
    text("GAME OVER", WIDTH / 2, HEIGHT / 2);
  textSize(28);
  text("Click mouse ", WIDTH / 2, HEIGHT / 1.5); 
 
}
function startGame()
{
    
    SCROLL_SPEED=1;
    ownShips=[];
    ownShips.push(new player());
    ownShips.push(new player());
    ownShips.push(new player());
    createParticles();
    nextWave();
    PLAYER=ownShips[0];
}
function inGame()
{
    background(0);
  drawOwnShipsLeft();
  manageParticles();
  THIS_WAVE.manage();  
  manageBullets();
  manageShots();
  manageFrags();
  
  if(!THIS_WAVE.waveActive)
  {
    nextWave();
    for(let x=0;x<THIS_WAVE.squadrons.length;x++)
    {
      THIS_WAVE.squadrons[x].panic=false;
    }
    if (THIS_WAVE.squadrons.length>0)
      {
        powerUpsFalling.push(new powerUp
                                (int(random(WIDTH*.8)+WIDTH/10),
                                -10-(random(60)),
                                int(random(playerPowerUps.length))
                                ,1000));
        let rnd=int(random(4))
        if(rnd==1){
        powerUpsFalling.push(new powerUp
                                (int(random(WIDTH*.8)+WIDTH/10),
                                -10-(random(60)),
                                int(random(playerPowerUps.length))
                                ,1000));}
        
      }
  }
  if (PLAYER)
  { 
    managePowerUps();
    PLAYER.show();
    PLAYER.update();
    if(mouseIsPressed===true && PLAYER) 
    {
        PLAYER.shoot();
        //playChewShotSound();
     }}
   if (ownShips.length<=0 && (!PLAYER.active))
    {
        MODE='gameOver';
    }  
         
    }


function preGame() {
  background(10,0,40);
  SCROLL_SPEED=0;
  fill('CYAN');
  textAlign(CENTER, CENTER);
  textSize(48);
  text("Cyan Fox", WIDTH / 2, HEIGHT / 3);
  fill('BLUE');
  textSize(28);
  text("Click mouse to start", WIDTH / 2, HEIGHT / 1.5);
  THIS_WAVE.manage();  
  managePowerUps();
  
  
}
/*function introPowerUps()
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
function playChewShotSound() {
  // Create an oscillator (Triangle wave gives a softer, more organic/chew tone)
  let osc = new p5.Oscillator('triangle');
  
  // Create an envelope to shape the volume over time (Attack, Decay, Sustain, Release)
  let env = new p5.Envelope();
  
  // Quick fade in, fast drop to simulate a wet crunch/chew bite sound
  env.setADSR(0.01, 0.15, 0.1, 0.1); 
  env.setRange(0.5, 0); // Max volume 0.5, fades to 0
  
  osc.start();
  env.play(osc);
  
  // Quickly slide the frequency down to give it a squishy "gulp/chew" impact
  osc.freq(400); // Start frequency
  osc.freq(100, 0.15); // Drop to 100Hz over 0.15 seconds
  
  // Stop the oscillator safely after the sound finishes playing
  setTimeout(() => {
    osc.stop();
  }, 300);
}
  */