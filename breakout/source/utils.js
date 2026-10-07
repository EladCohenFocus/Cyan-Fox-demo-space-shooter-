
function angleFromTo(from,to)
   {
    return atan2(to[1] - from[1], to[0] - from[0]);
   }
function trueAngle(d)//-180 -> 180
   {
    while (d<-180){ d+=360;}
    while(d>180){d-=360;}
    return d;
   }
function trueAngleDif(current,target)// from -180 to 180
   {
      let diff = target - current;
      while (diff < -180) diff += 360;
      while (diff > 180) diff -= 360;
      return -diff;
    }

function isInBox(point,box)//example box:[0,0,300,300]
  {
    let x=point[0];
    let y=point[1];
    return(
        x<= box[2] &&
        x>= box[0] &&
        y>= box[1] &&
        y<= box[3] 

    )
  }

