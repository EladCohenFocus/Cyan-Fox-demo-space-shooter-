let COLORS=['RED','PURPLE','BLUE'];
let MODE='intro';// 'game' or 'intro' or 'game over'
let MAX_SQUADRON_SIZE=10;let PARTICLES=[];
let WIDTH=600;
let PLAYER;
let THIS_WAVE;
let THIS_WAVE_COUNT=1;
let PU_FIRE_RATE_INDEX=0;
let PU_SPREAD_INDEX=1;
let PU_PIERCE_INDEX=2
let ownShips=[];
let shotsList=[];
let bullets=[];
let frags=[];
let playerPowerUps=[0,0,0];
let powerUpsFalling=[];
let SCROLL_SPEED=1;
let PLAYER_SIZE=13;
let ENEMY_SIZE=15;
let POWER_UP_SIZE=16;
let WAVES=
[
    
    [[1,0,0]],
    [[1,0,0],[1,0,0]],
    [[1,0,0],[2,0,0],[3,0,1]],
    [[1,2,0],[1,2,0],[0,2,1]],
     [[2,1,0],[3,0,0]],
    [[3,1,1],[4,0,2]],
    [[4,0,0],[3,0,0],[0,0,2]],
    [[2,0,0],[0,2,0],[1,0,4]],
    
    [[6,2,0],[7,1,0],[4,2,1]],
   
];
let HEIGHT=WIDTH*3/4
let TARGET_POINTS=
[
  [WIDTH/2,HEIGHT/2],
  [WIDTH*.2,HEIGHT*.2],
  [WIDTH*.8,HEIGHT*.8],
  [WIDTH*.2,HEIGHT*.8],
  [WIDTH*.8,HEIGHT*.2]
]
let STARTING_POINTS=
[
  [WIDTH*1.2,HEIGHT*-.2],
  [WIDTH*.5,HEIGHT*-.2],
  [WIDTH*-.2,HEIGHT*-.2],
  [WIDTH*1.2,HEIGHT*.5],
  //[WIDTH*.5,HEIGHT*.5],
  [WIDTH*-.2,HEIGHT*.5],
]