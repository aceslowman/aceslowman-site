let s = function(p){

  let distance_from_center;
  let parent = document.getElementById("geometric-holder");

  p.setup = function(){
    let canvas = p.createCanvas(parent.offsetWidth, parent.offsetHeight);
    canvas.parent('geometric-holder');

    distance_from_center = parent.offsetWidth/2;

    p.strokeWeight(2);
    p.ellipseMode(p.RADIUS);
    p.rectMode(p.CENTER);
    p.colorMode(p.HSB);
    p.noFill();
  }

  function setupShape(size){
    p.ellipse(0,0,size/2);
    p.ellipse(0,0,(size/2+30));

    var xOffset = p.cos(Math.PI/6)*(size/2);
    var yOffset = p.sin(Math.PI/6)*(size/2);

    var p1 = p.createVector(0,-size/2,5);
    var p2 = p.createVector(xOffset,yOffset,5);
    var p3 = p.createVector(-xOffset,yOffset,5);

    p.triangle(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
    p.rotate(Math.PI);
    p.triangle(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
  }

  p.draw = function(){
    var time = ((p.sin(p.millis()/2400)+1)/2);

    p.background(p.color(189,100,80,50));
    var size = 100;

    p.translate((p.width/2),(p.height/2));

    for(var i = 1; i < 20; i++){
      p.scale(p.map(distance_from_center,0,p.width,0,2));
      p.scale((time*0.2)+0.8);
      p.rotate(p.millis()/2400*0.53);
      p.stroke((i/10)*255,0,255,(i/10));
      setupShape(i * size);
    }
  }
}

let geoP5 = new p5(s);
