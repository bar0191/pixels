import * as dat from 'dat.gui';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { createCamera } from './components/camera.js';
import {
  createAxesHelper,
  createGridHelper,
} from './components/helpers.js';
import { createLights } from './components/lights.js';
import { createScene } from './components/scene.js';
import { loadBirds } from './components/birds/birds.js';
import { loadWizard } from './components/wizard/wizard.js';
import loadWolf from "./components/Wolf/loadWolf";

import { createControls } from './systems/controls.js';
import { createRenderer } from './systems/renderer.js';
import { Resizer } from './systems/Resizer.js';
import { Loop } from './systems/Loop.js';
import { Plane } from './components/Plane/Plane';
import { Wolf } from "./components/Wolf/Wolf";
import { Ray } from './components/Ray/Ray';

import { animate } from 'popmotion';
import Grain from "./components/Grain";

class World {
  #camera;
  #scene;
  #renderer;
  #loop;
  #controls;
  #plane;
  isDown;
  #wolf;
  settings;
  gui;
  ray;
  container;
  #composer;
  counter;
  grain;
  resizer;

  // 1. Create an instance of the World app
  constructor(container, element) {
    this.container = container;
    this.gui = new dat.GUI();
    this.#camera = createCamera();
    this.#scene = createScene();
    this.#renderer = createRenderer();
    this.#composer = new EffectComposer(this.#renderer);
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer, this.#composer);
    // this.onTouchDown = this.onTouchDown.bind(this);
    container.append(this.#renderer.domElement);

    this.#controls = createControls(this.#camera, this.#renderer.domElement);
    const { ambientLight, mainLight, baseLight } = createLights();

    this.#loop.updatables.push(this.#controls);
    this.#scene.add(ambientLight, mainLight);

    //this.#controls.target.copy(this.#wolf.position);
    // this.#scene.add(this.#wolf.getModel());

    // this.#plane = new Plane(element);
    // this.#controls.target.copy(this.#plane.position);
    // this.#scene.add(this.#plane);
    // this.#loop.updatables.push(this.#plane);

    // this.#scene.add(createAxesHelper(), createGridHelper());
    // use onResize to listen for window resize events
    // only needed if no animations are ever present
    // resizer.onResize = () => {
    //   this.render();
    // };
    // document.addEventListener('mousedown', this.onTouchDown)
    // window.addEventListener('mousemove', this.onTouchMove.bind(this))
    // window.addEventListener('mouseup', this.onTouchUp.bind(this))
  }

  async init() {
    this.ray = new Ray(this.container, this.#camera, this.gui);
    this.#scene.add(this.ray.mesh);
    this.#loop.updatables.push(this.ray);

    this.resizer = new Resizer(this.container, this.#camera, this.#renderer);
    // const renderPass = new RenderPass(this.#scene, this.#camera);

    // this.#composer.addPass(renderPass);

    // this.grain = new Grain(this.#composer, this.#scene, this.#camera);
    // console.log(this.grain.customPass);
    // this.#composer.addPass(this.grain.customPass);

    // this.#loop.updatables.push(this.grain);

    // const { parrot, flamingo, stork } = await loadBirds();
    // const { wizard } = await loadWizard();
    // const plane = new Plane();
    //const wolf = await loadWolf();
    // this.#wolf = new Wolf(wolf, this.gui);
    // const model = this.#wolf.getModel();
    // console.log(model);

    // this.#controls.target.copy(model.position);
    // this.#scene.add(model);
    // this.#loop.updatables.push(this.#wolf);

    // move the target to the center of the front bird
    // this.#controls.target.copy(parrot.position);
    // this.#controls.target.copy(wizard.position);

    // this.#loop.updatables.push(wizard);

  }

  // 2. Render the scene
  render() {
    // draw a single frame
    this.#renderer.render();
  }

  start() {
    this.#loop.start();
  }

  stop() {
    this.#loop.stop();
  }

  /**
   * Events.
   */
  /*onTouchDown (event) {
    this.isDown = true

    if (this.isDown) {
      animate({
        from: 0,
        to: 1.0,
        onUpdate: latest => this.#plane.meshes.plane.material.uniforms.uProgress.value = latest
      })
    }

    console.log(event);
    //this.scroll.position = this.scroll.current
    //this.start = event.touches ? event.touches[0].clientX : event.clientX
  }

  onTouchMove (event) {
    if (!this.isDown) return

    const x = event.touches ? event.touches[0].clientX : event.clientX
    const distance = (this.start - x) * 0.01

    // this.scroll.target = this.scroll.position + distance
  }

  onTouchUp (event) {
    this.isDown = false

    animate({
      from: 1.0,
      to: 0.0,
      onUpdate: latest => this.#plane.meshes.plane.material.uniforms.uProgress.value = latest
    })

    // this.onCheck()
  }*/
}

export { World };