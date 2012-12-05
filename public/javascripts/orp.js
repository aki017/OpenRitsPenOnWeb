OpenRitsPen = function(name) {
  this.name = name;
  this.speed = 200;
  this.lineColor = 0;
  this.lineWidth = 0;
  this.x = 350.0;
  this.y = 250.0;
  this.angle = 0.0;
  this.count = 0;
  this.line = new Array();
}
OpenRitsPen.prototype.COMMANDS = {
  USE_PEN:0,
  CHANGE_COLOR:1,
  CHANGE_COLOR2:2,
  CHANGE_WIDTH:3,
  CHANGE_SPEED:4,
  CHANGE_PEN:5,
  CHANGE_PEN_TOP:6,
  CLOSE_PEN:7
}

OpenRitsPen.prototype.command = function(str) {
  var c = str.split(":");
  switch(c[2]-0){
    case this.COMMANDS.USE_PEN        : this.usePen(c[0]-0, c[1]-0); break;
    case this.COMMANDS.CHANGE_COLOR   : this.changeColor(c[0]-0);    break;
    case this.COMMANDS.CHANGE_COLOR2  : this.changeColor2(c[0]);     break;
    case this.COMMANDS.CHANGE_WIDTH   : this.changeWidth(c[0]-0);    break;
    case this.COMMANDS.CHANGE_SPEED   : this.changeSpeed(c[0]-0);    break;
    case this.COMMANDS.CHANGE_PEN     : this.changePen();            break;
    case this.COMMANDS.CHANGE_PEN_TOP : this.changePenTop();         break;
    case this.COMMANDS.CLOSE_PEN      : this.closePen();             break;
  }
}
OpenRitsPen.prototype.usePen = function(len, angle){
  this.angle += angle / 180 * Math.PI;
  var dx =len*Math.cos(this.angle);
  var dy =len*Math.sin(this.angle);
  this.line.push(new Line(this.x, this.y, this.x+dx, this.y+dy, this.lineWidth, this.lineColor));
  this.x += dx;
  this.y += dy;
  console.log("usepen");
}
OpenRitsPen.prototype.colorTable = ["black", "red", "blue", "green", "orenge", "pink", "yellow", "gray"];
OpenRitsPen.prototype.changeColor = function(index){
  this.lineColor = this.colorTable[index];
  console.log("changeColor", this.lineColor);
}
OpenRitsPen.prototype.changeColor2 = function(str){
  var rgb = str.split(";");
  this.lineColor = "rgb("+rgb[0]+","+rgb[1]+" ,"+rgb[2]+" )";
  console.log("changeColor", this.lineColor);
}
OpenRitsPen.prototype.changeWidth = function(w){
  this.lineWidth = w-0;
  console.log("changeWidth", w-0)
}
OpenRitsPen.prototype.changeSpeed = function(s){
  this.speed = s;
}
OpenRitsPen.prototype.changePen = function(){
}
OpenRitsPen.prototype.changePenTop = function(){
}
OpenRitsPen.prototype.closePen = function(){
}
OpenRitsPen.prototype.draw = function(cs){
  for(var i = 0;i< this.line.length;i++)
  {
    var l = this.line[i];
    if(l.w>0){
      cs.beginPath();
      cs.fillStyle=l.c;
      cs.arc(l.x[0],l.y[0], l.w/2, 0, Math.PI*2, false);
      cs.fill();

    cs.beginPath();
    cs.lineWidth =l.w;
    cs.strokeStyle=l.c;
    cs.moveTo(l.x[0],l.y[0]);
    cs.lineTo(l.x[1],l.y[1]);
    cs.closePath();
    cs.stroke();

   cs.beginPath();
      cs.fillStyle=l.c;
   cs.arc(l.x[1],l.y[1], l.w/2, 0, Math.PI*2, false);
   cs.fill();
    }else{
      console.log("no");
    }
  }
}

Line = function(x0, y0, x1, y1, w, c){
  this.x = [x0, x1];
  this.y = [y0, y1];
  this.w = w;
  this.c=c;
}
