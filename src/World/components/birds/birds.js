import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadBirds() {
  const loader = new GLTFLoader();

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync('/assets/models/Parrot.glb'),
    loader.loadAsync('/assets/models/Flamingo.glb'),
    loader.loadAsync('/assets/models/Stork.glb'),
  ]);

  console.log('Squaaawk!', parrotData);

  const parrot = setupModel(parrotData);
  parrot.position.set(0, 0, 20.5);

  const flamingo = setupModel(flamingoData);
  flamingo.position.set(100, 0, -150);

  const stork = setupModel(storkData);
  stork.position.set(-100, -20.5, -150);

  return {
    parrot,
    flamingo,
    stork,
  };
}

export { loadBirds };
