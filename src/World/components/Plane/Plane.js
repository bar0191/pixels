import {
  Object3D,
  Group,
  PlaneBufferGeometry
} from 'three';
import { createMeshes } from './meshes.js';
import { createCube } from "../cube";

class Plane extends Object3D {
  image;

  constructor(el, image) {
    super(el);
    this.image = image;
    this.meshes = createMeshes(el);

    console.log(this.meshes)
    this.meshes.plane.position.set(0, 0, 0.2);


    this.add(this.meshes.plane);
  }

  tick(delta, time) {
    this.meshes.plane.material.uniforms.uTime.value = time;
  }
}

export { Plane };