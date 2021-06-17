import { PlaneBufferGeometry } from 'three';

function createGeometries(el) {

  console.log(el)
  const plane = new PlaneBufferGeometry(0.2, 0.3, 16, 16);

  return {
    plane,
  };
}

export { createGeometries }