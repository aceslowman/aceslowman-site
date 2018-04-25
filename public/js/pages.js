import $ from "jquery";
import * as THREE from "three";

import * as sharpenShader from './shaders/sharpen';
import * as barrelBlurShader from './shaders/barrelBlurChroma';
import * as feedbackShader from './shaders/feedback';

$(function(){
  var scene, feedbackScene, sharpenScene, barrelScene;
  var perspectiveCamera, orthoCamera;
  var renderer;

  var finalMaterial;
  var sharpenUniforms, feedbackUniforms, barrelUniforms;
  var feedbackShaderMaterial, sharpenShaderMaterial, barrelShaderMaterial;

  var quad;

  var textTexture, textureA, textureB, textureC, textureD;

  var width = window.innerWidth;
  var height = window.innerHeight;

  var mouse =  new THREE.Vector2();

  var lastMove = null;

  var clickbox;

  init();
  animate();

  // ============================================================================
  function setupText(text){
    var textCanvas = document.getElementById("textCanvas");
    textCanvas.width = window.innerWidth;
    textCanvas.height = window.innerHeight;
    var textCtx = textCanvas.getContext("2d");
    textCtx.textAlign = 'center';

    if(width < 500){
      textCtx.font = "100px Helvetica";
    }else{
      textCtx.font = "120px Helvetica";
    }

    textCtx.beginPath();
    textCtx.rect(0, 0, window.innerWidth, window.innerHeight);
    textCtx.fillStyle = "black";
    textCtx.fill();

    textCtx.lineWidth = 1;
    textCtx.fillStyle = 'white';
    // textCtx.fillText( text, 200, 100);
    textCtx.fillText( text, width/2, height/2);

    textTexture = new THREE.Texture(textCanvas);
    textTexture.needsUpdate = true;
  }

  // ============================================================================
  function init(){
    width = window.innerWidth;
    height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    document.body.appendChild( renderer.domElement );

    renderer.setClearColor( "black" );

    width = window.innerWidth;
    height = window.innerHeight;

    setupCameras();
    setupText("projects");
    setupMainScene();

    renderer.setSize(width, height);

    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'mousedown', onMouseDown, false );
    window.addEventListener( 'touchend',  onTouchEnd, false );
    window.addEventListener( 'touchstart',  onTouchStart, false );
    window.addEventListener( 'touchmove', onTouchMove, false );
  }

  // ============================================================================
  function feedback(){
    feedbackScene = new THREE.Scene();

    feedbackUniforms = {
      tex0: { value: textureA.texture },
      tex1: { value: textTexture },
      feedback: { value: 0.6 },
      scale: { value: 0.997 },
      vPoint: { value: [0.5,1.] }
    };

    feedbackShaderMaterial = new THREE.ShaderMaterial( {
      uniforms: feedbackUniforms,
      vertexShader: feedbackShader.vert,
      fragmentShader: feedbackShader.frag
    } );

    var plane1 = new THREE.PlaneBufferGeometry( 2., 2.);
    var bufferObject = new THREE.Mesh( plane1, feedbackShaderMaterial );
    feedbackScene.add(bufferObject);
  }

  // ============================================================================
  function sharpen(){
    sharpenScene = new THREE.Scene();

    sharpenUniforms = {
      tex0: { value: textureB.texture },
      width: { value: 0.001 }
    }

    sharpenShaderMaterial = new THREE.ShaderMaterial( {
      uniforms: sharpenUniforms,
      vertexShader: sharpenShader.vert,
      fragmentShader: sharpenShader.frag
    } );

    var plane2 = new THREE.PlaneBufferGeometry( 2., 2.);
    var sharpenObject = new THREE.Mesh( plane2, sharpenShaderMaterial );
    sharpenScene.add(sharpenObject);
  }

  // ============================================================================
  function barrelBlurChroma(){
    barrelScene = new THREE.Scene();

    barrelUniforms = {
      tex0: { value: textureC.texture },
      barrelPower: { value: 0.1 },
      zoom: { value: 1.0 }
    }

    barrelShaderMaterial = new THREE.ShaderMaterial( {
      uniforms: barrelUniforms,
      vertexShader: barrelBlurShader.vert,
      fragmentShader: barrelBlurShader.frag
    } );

    var plane3 = new THREE.PlaneBufferGeometry( 2., 2.);
    var barrelObject = new THREE.Mesh( plane3, barrelShaderMaterial );
    barrelScene.add(barrelObject);
  }

  // ============================================================================
  function setupMainScene(){
    scene = new THREE.Scene();

    textureA = new THREE.WebGLRenderTarget( width, height );
    textureB = new THREE.WebGLRenderTarget( width, height );
    textureC = new THREE.WebGLRenderTarget( width, height );
    textureD = new THREE.WebGLRenderTarget( width, height );

    feedback();

    sharpen();

    barrelBlurChroma();

    var plane3 = new THREE.PlaneBufferGeometry( width, height );
    finalMaterial = new THREE.MeshBasicMaterial({ map: textureD.texture });
    quad = new THREE.Mesh( plane3, finalMaterial );
    scene.add( quad );
  }

  // ============================================================================
  function setupCameras(){
    orthoCamera = new THREE.OrthographicCamera(
      width / - 2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );

    perspectiveCamera = new THREE.PerspectiveCamera(
      45,
      width / height,
      1,
      1000
    );

    orthoCamera.position.z = 1;
    perspectiveCamera.position.z = 5;
  }

  // ============================================================================
  function animate() {
    requestAnimationFrame( animate );
    render();
  }

  // ============================================================================
  function render() {
    renderer.render( feedbackScene, orthoCamera, textureB );
    renderer.render( sharpenScene, orthoCamera, textureC );

    var temp = textureA;
    textureA = textureC;
    textureC = temp;

    renderer.render( barrelScene, orthoCamera, textureD );
    renderer.render( scene, orthoCamera );
  }

  // ============================================================================
  function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;

    setupCameras();
    setupText("projects");
    setupMainScene();

    renderer.setSize(width, height);
  }

  // ============================================================================
  function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth);
    mouse.y = (event.clientY / window.innerHeight);

    feedbackUniforms.vPoint.value = [mouse.x,mouse.y];

    $('html,body').css('cursor', 'default');

    for(var click in clickbox){
      if(event.clientX > clickbox[click].x1 && event.clientY > clickbox[click].y1){
        if(event.clientX < clickbox[click].x2 && event.clientY < clickbox[click].y2){
          $('html,body').css('cursor', 'pointer');
        }
      }
    }
  }

  // ============================================================================
  function onMouseDown(event){
    for(var click in clickbox){
      if(event.clientX > clickbox[click].x1 && event.clientY > clickbox[click].y1){
        if(event.clientX < clickbox[click].x2 && event.clientY < clickbox[click].y2){
          window.location.href = clickbox[click].target;
        }
      }else{
        $('html,body').css('cursor', 'default');
      }
    }
  }

  // ============================================================================
  function onTouchStart(event){
    lastMove = event;
  }

  // ============================================================================
  function onTouchEnd(event){
    onMouseDown(lastMove.touches[0]);
  }

  // ============================================================================
  function onTouchMove(event){
    onMouseMove(lastMove.touches[0]);
    lastMove = event;
  }
});
