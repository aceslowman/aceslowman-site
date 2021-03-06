import * as THREE from "three";

import StandardManager from "./system/StandardManager";
import FeedbackManager from "./system/FeedbackManager";
import Capture from "./utilities/Capture";
import Debug from "./utilities/Debug";
import CapsuleGrid from "./entities/CapsuleGrid";
import Camera from "./entities/Camera";
import PointLight from "./entities/PointLight";

let manager, debug, capturer, camera, grid, light;

const setup = () => {
  manager = new FeedbackManager();

  grid = new CapsuleGrid(manager);

  light = new PointLight(manager);

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

const render = () => {
  requestAnimationFrame(render);

  debug.stats.begin();
  manager.update();
  debug.stats.end();

  capturer.capture( manager.canvas );
}

const bindEventListeners = () => {
  window.addEventListener(
    'resize',
    manager.onWindowResize.bind(manager),
    false
  );
}

setup();
bindEventListeners();
render();
