import fragmentShader from '../../../assets/shaders/fragmentGrain.glsl?raw';
import vertexShader from '../../../assets/shaders/vertexGrain.glsl?raw';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

class Grain {
  counter;
  customPass;
  composer;
  scene;
  camera;

  constructor(composer, scene, camera) {
    this.composer = composer;
    this.camera = camera;
    this.scene = scene;
    this.counter = 0.0;

    const myEffect = {
      uniforms: {
        "tDiffuse": { value: null },
        "amount": { value: this.counter }
      },
      vertexShader,
      fragmentShader
    }

    this.customPass = new ShaderPass(myEffect);
    this.customPass.renderToScreen = true;
  }

  tick() {
    this.counter += 0.01;
    this.customPass.uniforms["amount"].value = this.counter;
    this.composer.render();
  }
}

export default Grain;