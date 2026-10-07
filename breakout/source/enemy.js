

function enemy(x,y,angle,kind)
{
  this.cannon=false;
  this.active=true;
  this.x=x;
  this.y=y;
  this.kind=kind;
  this.angle=angle;
  
  this.createShotList=function(panic)
  {
    if (ownShips.length<=0){return;}
    let lst=[];
    let dir=90;
    let rnd=int(random (4));
    if (panic || rnd==2|| this.y>HEIGHT*.75){dir= angleFromTo([this.x,this.y],[PLAYER.x,PLAYER.y])}
    if (this.kind==1)
    {
        lst.push(new enemyShot(this.x,this.y,2,dir));
    }
    if (this.kind==2)
    {
        lst.push(new enemyShot(this.x,this.y,2,dir-3));
        lst.push(new enemyShot(this.x,this.y,2,dir+3));
    }
    if (this.kind==3)
    {
        lst.push(new enemyShot(this.x,this.y,2,dir));
        lst.push(new enemyShot(this.x,this.y,2,dir+5));
        lst.push(new enemyShot(this.x,this.y,2,dir-5));
    }
    //console.log(lst);
    return lst;
  }
  this.show=function()
  {
    
    if (!this.active){return;}
    push();
    stroke(COLORS[this.kind-1]);
    noFill();
    strokeWeight(3);
    
    translate(this.x,this.y);
    rotate(this.angle+90);
      
      if (this.kind==1){
          beginShape();
          vertex(0,-ENEMY_SIZE*.7);
          vertex(-ENEMY_SIZE*.5,ENEMY_SIZE*.5);
          vertex(ENEMY_SIZE*.5,ENEMY_SIZE*.5);
          endShape(CLOSE);pop();return;
         
      
    } 
    if (this.kind==2){
          ellipse(0,0,ENEMY_SIZE*.8,ENEMY_SIZE*1.1);
          rect(ENEMY_SIZE/2.5,-ENEMY_SIZE*.7,ENEMY_SIZE/8,1.4*.7*ENEMY_SIZE)
          rect(-ENEMY_SIZE/2.5,-ENEMY_SIZE*.7,-ENEMY_SIZE/8,1.4*.7*ENEMY_SIZE)
          pop();return;
         
      
    } 
    if (this.kind==3){
          beginShape();
          vertex(-ENEMY_SIZE*.250,-ENEMY_SIZE*.6);
          vertex(ENEMY_SIZE*.250,-ENEMY_SIZE*.6);
          
          vertex(ENEMY_SIZE*.5,ENEMY_SIZE*.6);
          vertex(-ENEMY_SIZE*.5,ENEMY_SIZE*.6);
          endShape(CLOSE);pop();return;
         
      
    }
    
    
  }
  this.buildCannon=function()
    {
        this.cannon=new Cannon(this.kind);
    } 
    this.buildCannon();


}
function Cannon(n)
{
    this.reload=0;
    
    this.init=function(b)
    {
        this.kind=b;
        if (b==3){this.reloadTime=150;return;}
        if (b==2){this.reloadTime=250;return;}
        if (b==1){this.reloadTime=400;return;}


    }
    this.isReady=function(){return this.reload>=this.reloadTime}
    this.update=function()
    {
        if (this.reload<this.reloadTime){this.reload+=1;}
    }
    this.shoot=function(){this.reload=0;}
    this.init(n);
}