import { PerspectiveCamera } from 'three';

function createCamera(width, height) {
  const aspect = window.innerWidth / window.innerHeight;
  const frustumSize = 1000;
  // const camera = new OrthographicCamera(
  //   window.innerWidth / - 2,
  //   window.innerWidth / 2,
  //   window.innerHeight / 2,
  //   window.innerHeight / - 2,
  //   1,
  //   10
  // );
  const camera = new PerspectiveCamera(70, aspect, 0.1, 1000);

  // camera.zoom = 0
  camera.position.set(0, 0, 0.8);
  //
 //camera.position.set(0, 0, 5);

  return camera;
}

export { createCamera };

