import Stats from "stats-js";

const Debug = function(){
  this.stats = new Stats();
  this.stats.domElement.style.position = 'absolute';
  this.stats.domElement.style.left = '0px';
  this.stats.domElement.style.bottom = '0px';
  document.body.appendChild( this.stats.domElement );
}

export default Debug;
