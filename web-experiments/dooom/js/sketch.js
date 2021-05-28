let t = function(p){

  var rays = new Array();
  var cx, cy;

  p.setup = function(){
    let parent = document.getElementById("doom-holder");
    let canvas = p.createCanvas(parent.offsetWidth, parent.offsetHeight);
    canvas.parent('doom-holder');

    // p.smooth(8);

    cx = p.width/2;
    cy = 100;

    p.background(p.color(255,255));
    generateRays(300);
  }

  p.draw = function(){
    p.background(p.color(255,7));

    if(p.frameCount % 700 == 0){
      rays = [];
      generateRays(300);
    }

    for(var i = 0; i < rays.length; i++){
      rays[i].move();
    }
  }

  function generateRays(num){
    for(var i = 1; i <= num; i++){
      var theta = ((Math.PI*2)/num)*i;
      p.colorMode(p.HSB,255);
      var ray_color = p.random(255);
      rays.push(new Ray(theta,ray_color));
    }
  }

  function Ray(theta,color){
    this.x = cx + (20 * Math.cos(theta));
    this.y = cy + (20 * Math.sin(theta));
    this.driver = 0;
    this.c_driver = 0;
    this.ramp_size = 10;
    this.trigger = Math.floor(p.random(100));
    this.ramp_dir = 0;
    this.color = color;

    this.move = function(){
      this.driver += 1;

      //when the ramp_dir is 0, hold for a random length
      if(this.ramp_dir == 0){
        //HOLD IT
        if(this.driver % this.trigger == 0){
          this.trigger = Math.floor(p.random(100)+10);
          if(this.driver % this.ramp_size == 0){
            this.c_driver += Math.PI/2;
            this.ramp_dir = Math.round(Math.sin(this.c_driver));
          }
        }
      }else{
        //HIT IT
        if(this.driver % this.ramp_size == 0){
          this.c_driver += Math.PI/2;
          this.ramp_dir = Math.round(Math.sin(this.c_driver));
        }
      }

      this.x += Math.cos(theta + this.ramp_dir);
      this.y += Math.sin(theta + this.ramp_dir);

      p.stroke(color);
      p.point(this.x,this.y);
    }
  }
}

let doomP5 = new p5(t);
