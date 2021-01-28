let _z = function(p){
  var current_size = 200;

  p.setup = function(){
    let parent = document.getElementById("hsb-holder");
    let canvas = p.createCanvas(parent.offsetWidth, parent.offsetHeight);
    canvas.parent('hsb-holder');

    p.colorMode(p.HSB,255);
    p.strokeWeight(1);
    p.noStroke();
  }

  p.draw = function(){
    p.translate((p.width/2)-p.height/2,(p.height/2)-p.height/2);

    var sine_driver = (p.sin(p.millis()/2000)+1)/2;

    var gridSize = current_size/5;
    var cell_width  = p.height/gridSize;
    var cell_height = p.height/gridSize;

    for(var i = 0; i < gridSize; i++){
      var j = 0;
      var circle_color = (255*(j+1/gridSize)*(i/gridSize)+(p.millis()/10)) % 255;
      var rect_color = ((255*(i+1/gridSize)*(j+1/gridSize))+(p.millis()/10)) % 255;


      p.fill(rect_color,180,255);
      p.rect(cell_width*i,0,cell_width,cell_height);

      p.fill(circle_color,180,255);
      p.ellipse(
        cell_width*i+(cell_width/2),
        0+(cell_width/2),
        cell_width*sine_driver,
        cell_height*sine_driver
      );

      for(j = 0; j < gridSize; j++){
        circle_color = (255*(i+1/gridSize)*(j/gridSize)+(p.millis()/10)) % 255;
        rect_color = ((255*(i+1/gridSize)*(j+1/gridSize))+(p.millis()/10)) % 255;

        p.fill(rect_color,180,255);
        p.rect(cell_width*j,cell_height*i,cell_width,cell_height);

        p.fill(circle_color,180,255);
        p.ellipse(
          cell_width*j+(cell_width/2),
          cell_height*i+(cell_width/2),
          cell_width*sine_driver,
          cell_height*sine_driver
        );
      }
    }

    p.translate(-(p.width/2)-p.height/2,-(p.height/2)-p.height/2);
    p.rect(0,0,p.height/2,p.height)
  }

  function mouseDragged(){
    current_size = mouseX;
  }
}

let hsbP5 = new p5(_z);
