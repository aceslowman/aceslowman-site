import * as THREE from "three";
import { EffectComposer } from '../utilities/EffectComposer/EffectComposer.js';
import { RenderPass } from '../utilities/EffectComposer/RenderPass.js';
import { TexturePass } from '../utilities/EffectComposer/TexturePass.js';
import { FXAAShader } from '../shaders/FXAAShader';
import * as feedback from '../shaders/feedback';
import * as barrelBlurChroma from '../shaders/barrelBlurChroma';
import * as sharpen from '../shaders/sharpen';

export default class PostStack {
  constructor(manager, options){
    this.manager = manager;

    this.spareTarget = new THREE.WebGLRenderTarget( this.width, this.height, {
      format: THREE.RGBAFormat
    }); //textureA
    this.inputTarget = new THREE.WebGLRenderTarget( this.width, this.height, {
      format: THREE.RGBAFormat
    }); //textTexture
    this.feedbackTarget = new THREE.WebGLRenderTarget( this.width, this.height, {
      format: THREE.RGBAFormat
    }); //textureB
    this.intermediateTarget = new THREE.WebGLRenderTarget( this.width, this.height, {
      format: THREE.RGBAFormat
    }); //textureC
    this.finalTarget = new THREE.WebGLRenderTarget( this.width, this.height, {
      format: THREE.RGBAFormat
    }); //textureD

    this.setupInputComposer();
    this.setupFeedbackComposer();
    this.setupIntermediateComposer();
    this.setupFinalComposer();

    this.manager.gui.feedback = this.manager.gui.addFolder('Feedback Shader');

    this.manager.gui.feedback.add(this.shader_feedback.uniforms.amount,'value',0,1).name('Amount');
    this.manager.gui.feedback.add(this.shader_feedback.uniforms.scale,'value',0,2).name('Scale');
    this.manager.gui.feedback.open();

    this.manager.gui.sharpen = this.manager.gui.addFolder('Sharpen Shader');

    this.manager.gui.sharpen.add(this.shader_sharpen.uniforms.width,'value',0,0.5).name('Width');
    this.manager.gui.sharpen.open();

    this.manager.gui.barrel = this.manager.gui.addFolder('Barrel Shader');

    this.manager.gui.barrel.add(this.shader_chroma.uniforms.power,'value',-1,1).name('Power');
    this.manager.gui.barrel.open();
  }

  setupInputComposer(){
    this.inputComposer = new THREE.EffectComposer(this.manager.renderer, this.inputTarget);
    this.inputComposer.setSize(this.manager.width, this.manager.height);

    const inputPass = new THREE.RenderPass(this.manager.scene, this.manager.camera.getCamera());

    this.inputComposer.addPass(inputPass);
  }

  setupFeedbackComposer(){
    this.feedbackComposer = new THREE.EffectComposer(this.manager.renderer, this.feedbackTarget);
    this.feedbackComposer.setSize(this.manager.width, this.manager.height);

    this.shader_feedback = new THREE.ShaderMaterial({
      uniforms: {
        tex0: { value: this.intermediateTarget.texture },
        tex1: { value: this.inputTarget.texture },
        amount: { value: 0.9 },
        scale: { value: 0.99 },
        vPoint: { value: [0.5,0.6] }
      },
      vertexShader: feedback.vert,
      fragmentShader: feedback.frag
    })

    const feedbackPass  = new THREE.ShaderPass(this.shader_feedback, "feedback");

    this.feedbackComposer.addPass(feedbackPass);
  }

  setupIntermediateComposer(){
    this.intermediateComposer = new THREE.EffectComposer(this.manager.renderer, this.intermediateTarget);
    this.intermediateComposer.setSize(this.manager.width, this.manager.height);

    this.shader_sharpen = new THREE.ShaderMaterial({
      uniforms: {
        width: { value: 0.01 }
      },
      vertexShader: sharpen.vert,
      fragmentShader: sharpen.frag
    })

    const inputPass   = new THREE.TexturePass(this.feedbackTarget.texture, 1.0);
    const sharpenPass = new THREE.ShaderPass(this.shader_sharpen, "sharpen");

    this.intermediateComposer.addPass(inputPass);
    this.intermediateComposer.addPass(sharpenPass);
  }

  setupFinalComposer(){ // WORKING
    this.finalComposer = new THREE.EffectComposer(this.manager.renderer, this.finalTarget);
    this.finalComposer.setSize(this.manager.width, this.manager.height);

    this.shader_chroma = new THREE.ShaderMaterial({
      uniforms: {
        power: { value: 0.3 },
        zoom: { value: 1.0 }
      },
      vertexShader: barrelBlurChroma.vert,
      fragmentShader: barrelBlurChroma.frag
    })

    const inputPass  = new THREE.TexturePass(this.intermediateTarget.texture, 1.0);
    const chromaPass = new THREE.ShaderPass(this.shader_chroma, "chroma");
    const fxaaPass   = new THREE.ShaderPass(THREE.FXAAShader);

    let dpr = 1;
    if (window.devicePixelRatio !== undefined) {
      dpr = window.devicePixelRatio;
    }
    fxaaPass.uniforms['resolution'].value.set(1 / (window.innerWidth * dpr), 1 / (window.innerHeight * dpr));
    fxaaPass.renderToScreen = true;

    this.finalComposer.addPass(inputPass);
    this.finalComposer.addPass(chromaPass);
    this.finalComposer.addPass(fxaaPass);
  }

  render(delta){
    this.inputComposer.render(delta);
    this.inputComposer.swapBuffers();

    this.feedbackComposer.render(delta);
    // this.feedbackComposer.swapBuffers();

    this.intermediateComposer.render(delta);
    this.intermediateComposer.swapBuffers();

    //target pingpong
    var temp = this.spareTarget;
    this.spareTarget = this.intermediateTarget;
    this.intermediateTarget = temp;

    this.finalComposer.render( delta );
  }

  update(){

  }


}
