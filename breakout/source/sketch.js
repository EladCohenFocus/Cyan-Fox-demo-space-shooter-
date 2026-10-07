
let pu;
function setup() {
 let canvas = createCanvas(WIDTH,HEIGHT);
 angleMode(DEGREES);
 // This pushes the canvas away from the top-left corner to the center
select('body').style('background-color', '#333399'); 
canvas.style('margin', '100px auto 0 auto'); 
canvas.style('display', 'block');
THIS_WAVE=new wave([[6,2,1]]);
createDemoPowerUps();
}

function draw() 
{ 
 if (MODE==='intro'){preGame();}
  if (MODE==='game'){inGame();}
  if (MODE==='gameOver'){gameOver();}

}
function mouseClicked() {
   if(MODE==='gameOver' ) 
   {
      THIS_WAVE=new wave([[6,2,1]]);
      MODE='intro';
      powerUpsFalling=[];
      createDemoPowerUps();
      return;}
   if(MODE==='intro' ) {startGame();powerUpsFalling=[];MODE='game';return;}
}
function createDemoPowerUps(){
for(let c=0;c<playerPowerUps.length;c++)
      {
         powerUpsFalling.push(new powerUp((c+.5)*(WIDTH/playerPowerUps.length),200,c,2));
      }
   }
