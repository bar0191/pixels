import {AnimationMixer, MeshStandardMaterial, TextureLoader, sRGBEncoding} from 'three';

function createMaterial() {
  // create a texture loader.
  const textureLoader = new TextureLoader();

  // load a texture
  const texture = textureLoader.load(
    '/assets/textures/Wizard_Texture.png',
  );

  // texture.encoding = sRGBEncoding;

  texture.flipY = false;

  // create a "standard" material using
  // the texture we just loaded as a color map
  const material = new MeshStandardMaterial({
    map: texture,
  });

  return material;
}

function setupModel(data) {
  const model = data.scene.children[0];

  const material = createMaterial();

  material.skinning = true;

  model.children[2].material = material;
  const clip = data.animations[2];

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  model.tick = (delta) => mixer.update(delta);

  return model
}

export { setupModel };