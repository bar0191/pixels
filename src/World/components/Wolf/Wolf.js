import { Color, BufferAttribute } from 'three';
import { createMaterials } from "./materials";

function rule3(v, vmin, vmax, tmin, tmax){
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  return tmin + (pc * dt);
}

class Wolf {
  model;
  geometry;
  mesh;
  amplitude;
  settings;
  gui;

  constructor(model, gui) {
    this.settings = {
      scale: 1.0,
      amplitude: 0.0,
      rotationY: 0.0,
      rotationX: 0.0
    }
    this.gui = gui;
    this.model = model;
    const { body, shader } = createMaterials();
    this.mesh = this.model.scene.children[0];
    this.mesh.position.set(0, 0, 0);
    this.mesh.material = shader;

    this.gui.add(this.settings, "scale", 1, 2, 0.01);
    this.gui.add(this.settings, "rotationY", -1.0, 1.0, 0.01);
    this.gui.add(this.settings, "amplitude", 0.0, 10.0, 0.50);
    const obj = { add: this.onScale.bind(this) };

    this.gui.add(obj,'add');

    const numFaces = this.mesh.geometry.attributes.position.count / 3;

    const colors = new Float32Array( numFaces * 3 * 3 );
    const displacement = new Float32Array( numFaces * 3 * 3 );

    const color = new Color();

    for ( let f = 0; f < numFaces; f ++ ) {
      const index = 9 * f;
      const h = 0.0; // 0.2 * Math.random();
      const s = 0.0; // 0.5 + 0.5 * Math.random();
      const l = 0.3 * Math.random();

      color.setHSL( h, s, l );

      const d = 10 * ( 0.5 - Math.random() );

      for ( let i = 0; i < 3; i ++ ) {
        colors[ index + ( 3 * i ) ] = color.r;
        colors[ index + ( 3 * i ) + 1 ] = color.g;
        colors[ index + ( 3 * i ) + 2 ] = color.b;

        displacement[ index + ( 3 * i ) ] = d;
        displacement[ index + ( 3 * i ) + 1 ] = d;
        displacement[ index + ( 3 * i ) + 2 ] = d;

      }
    }

    this.mesh.geometry.setAttribute( 'customColor', new BufferAttribute( colors, 3 ) );
    this.mesh.geometry.setAttribute( 'displacement', new BufferAttribute( displacement, 3 ) );

    document.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
  }

  handleMouseMove(event) {
    this.settings.rotationX = event.clientX - (window.innerWidth / 2);
    this.settings.rotationY = event.clientY - (window.innerHeight / 2);
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  tick(delta, time) {
    // animations
    // this.mesh.rotation.y += this.settings.rotationY;
    // this.look(this.settings.rotationX, this.settings.rotationY);
    // this.mesh.material.uniforms.uScale.value = this.settings.scale;
    this.mesh.material.uniforms.uAmplitude.value = this.settings.amplitude;
    // this.mesh.material.uniforms.uAmplitude.value = 1.0 + Math.sin( time * 0.5 );
  }

  look(xTarget, yTarget) {
    this.tHeagRotY = rule3(xTarget, -200, 200, -Math.PI/4, Math.PI/4);
    this.tHeadRotX = rule3(yTarget, -200,200, -Math.PI/4, Math.PI/4);
    this.tHeadPosX = rule3(xTarget, -200, 200, 70,-70);
    this.tHeadPosY = rule3(yTarget, -140, 260, 20, 100);

    this.mesh.rotation.y += (this.tHeagRotY - this.mesh.rotation.y) / 10;
    // this.mesh.rotation.x += (this.tHeadRotX - this.mesh.rotation.x) / 10;
    // this.mesh.position.x += (this.tHeadPosX - this.mesh.position.x) / 10;
    // this.mesh.position.y += (this.tHeadPosY - this.mesh.position.y) / 10;
  }

  onScale() {
    console.log('yooo', this);
  }

  getModel() {
    return this.mesh;
  }
}

export { Wolf };