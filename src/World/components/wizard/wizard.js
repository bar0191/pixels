import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadWizard() {
  const loader = new GLTFLoader();

  const wizardData = await loader.loadAsync('assets/models/Wizard.glb');

  console.log('🧙‍♂', wizardData);

  const wizard = setupModel(wizardData);
  //
  console.log('🧙‍♂', wizard);

  return {
    wizard
  }
}

export { loadWizard };