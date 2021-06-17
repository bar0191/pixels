import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

async function loadWolf() {
  const loader = new GLTFLoader();
  const data = await loader.loadAsync('assets/models/PWHead_Hollow2.glb');

  console.log('🐺', data);
  return data;
}

export default loadWolf;