import * as THREE from "three";
import SceneSubject from "./sceneSubjects/SceneSubject";

/* ENTITIES */
import CylinderGrid from "./sceneSubjects/CylinderGrid";
import PointLight from "./sceneSubjects/PointLight";
import Camera from "./sceneSubjects/Camera";

/* UTILITY */
import EventBus from "./EventBus";
import dat from "dat.gui";

/* SHADER */
import * as feedback from './shaders/feedback';

//------------------------------------------------------------------------------
const SceneManager = function(){
  const eventBus = new EventBus();
  const gui = new dat.GUI();

  this.setupRenderer = () => {
    this.renderer = new THREE.WebGLRenderer({
      'antialias': true,
      'alpha': true
    });

    this.renderer.setClearColor(0x000000, 0);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( this.renderer.domElement );
  }

  /*
    This method simply controls the order of all other scenes.
  */
  this.setupScenes = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.mainTarget   = new THREE.WebGLRenderTarget( width, height, {
      format: THREE.RGBAFormat
    });
    this.interTarget  = new THREE.WebGLRenderTarget( width, height, {
      format: THREE.RGBAFormat
    });
    this.outputTarget = new THREE.WebGLRenderTarget( width, height, {
      format: THREE.RGBAFormat
    });

    this.setupMainScene();
    this.setupFeedbackScene();
    this.setupOutputScene();
  }

  /*
    The main scene is where all visible geometry is drawn.
    This is the active area.
  */
  this.setupMainScene = () => {
    this.mainScene = new THREE.Scene();
  }

  /*
    The feedback scene is to allow us to render-to-texture.
  */
  this.setupFeedbackScene = () => {
    this.feedbackScene = new THREE.Scene();

    this.feedbackUniforms = {
        tex0: { value: this.interTarget.texture },
        tex1: { value: this.mainTarget.texture },
        feedback: { value: 0.99 },
        scale: { value: 1.05 },
        vPoint: { value: [0.5,0.5] }
    };

    const feedback_gui = gui.addFolder('Feedback Shader');

    feedback_gui.add(this.feedbackUniforms.feedback,'value',0,1).name('Amount');
    feedback_gui.add(this.feedbackUniforms.scale,'value',0,2).name('Scale');
    // feedback_gui.add(this.feedbackUniforms.vPoint,'value')


    feedback_gui.open();

    const geometry = new THREE.PlaneBufferGeometry( 2., 2.);
    const material = new THREE.ShaderMaterial({
      uniforms: this.feedbackUniforms,
      vertexShader: feedback.vert,
      fragmentShader: feedback.frag,
      transparent: true
    });

    const quad = new THREE.Mesh( geometry, material );
    this.feedbackScene.add( quad );
  }

  /*
    The output scene is the final view, upon which we render all
    prior output upon a simple plane buffer object.
  */
  this.setupOutputScene = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.outputScene = new THREE.Scene();
    this.outputScene.background = new THREE.Color( 0x000000 );

    const geometry = new THREE.PlaneBufferGeometry( width, height );
    const material = new THREE.MeshBasicMaterial({
      map: this.outputTarget.texture,
      transparent: true
    });
    this.outputQuad = new THREE.Mesh( geometry, material );
    this.outputScene.add( this.outputQuad );
  }

  this.setupCameras = () => {
    this.camera = new Camera(this.mainScene, eventBus, gui);
    this.outputCamera = new THREE.OrthographicCamera(
        window.innerWidth / - 2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        1,
        1000
    );

    this.outputCamera.position.z = 1;
  }

  this.setupSceneSubjects = () => {
    this.sceneSubjects = [
      new PointLight(this.mainScene, eventBus, gui),
      new CylinderGrid(this.mainScene, eventBus, gui)
    ];
  }

  this.update = () => {
    for(let i=0; i < this.sceneSubjects.length; i++){
      this.sceneSubjects[i].update();
    }

    this.camera.update();

    this.renderer.render(this.mainScene, this.camera.cam, this.mainTarget);
    this.renderer.render(this.feedbackScene, this.outputCamera, this.outputTarget);

    let tempTarget = this.interTarget;
    this.interTarget = this.outputTarget;
    this.outputTarget = tempTarget;

    this.feedbackUniforms.tex0.value = this.interTarget.texture;
    this.outputQuad.material.map = this.outputTarget.texture;

    this.renderer.render(this.outputScene, this.outputCamera);
  }

  this.onWindowResize = () => {
    const width  = window.innerWidth;
    const height = window.innerHeight;

    this.camera.cam.aspect = width / height;
    this.camera.cam.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  this.setupRenderer();
  this.setupScenes();
  this.setupCameras();
  this.setupSceneSubjects();
}

export default SceneManager;
