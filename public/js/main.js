import * as THREE from "three";

import StandardManager from "./system/StandardManager";
import PostStack from "./system/PostStack";
import Capture from "./utilities/Capture";
import Debug from "./utilities/Debug";
import MainText from "./entities/MainText";
import Capsule from "./entities/Capsule";
import OrthographicCamera from "./entities/OrthographicCamera";

let manager, debug, capturer, box, camera, capsule, light, text, post;

const setup = () => {
  manager = new StandardManager();
  if(!process.env.DEVELOPMENT) manager.gui.__proto__.constructor.toggleHide();
  camera = new OrthographicCamera(manager);
  manager.setCamera(camera);

  text = new MainText(manager);

  post = new PostStack(manager);

  if(process.env.DEVELOPMENT){
    debug = new Debug(manager, {
      stats: true,
      grid: false
    });

    capturer = new Capture(manager, {
      verbose: false,
      display: true,
      framerate: 100,
      format: 'png',
      workersPath: 'js/utils/'
    });
  }
}

const render = () => {
  requestAnimationFrame(render);

  if(process.env.DEVELOPMENT) debug.stats.begin();
  manager.update();
  post.render();
  if(process.env.DEVELOPMENT) debug.stats.end();

  if(process.env.DEVELOPMENT) capturer.capture( manager.canvas );
}

const bindEventListeners = () => {
  window.addEventListener(
    'resize',
    manager.onWindowResize.bind(manager),
    false
  );
  window.addEventListener('mousemove', onMouseMove, false);
}

const onMouseMove = (e)=>{
  const x = ( e.clientX / window.innerWidth );
  const y = ( e.clientY / window.innerHeight );

  post.shader_feedback.uniforms.vPoint.value[0] = x;
  post.shader_feedback.uniforms.vPoint.value[1] = y;
}

setup();
bindEventListeners();
render();
