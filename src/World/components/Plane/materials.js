import { MeshStandardMaterial, ShaderMaterial, DoubleSide, TextureLoader, Vector2 } from 'three';
import fragmentShader from '../../../../assets/shaders/fragment2.glsl?raw';
import vertexShader from '../../../../assets/shaders/vertex.glsl?raw';
import image from '../../../../assets/images/image1.jpg';

console.log(image);

function createMaterials() {
  const body = new MeshStandardMaterial({
    color: 'firebrick',
    flatShading: true,
  });

  const shader = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0.0 },
      uTexture: { value: new TextureLoader().load(
        "https://source.unsplash.com/GT2I5UgV218/800x600"
        ) },
      uResolution: { value: new Vector2() },
      uProgress: { value: 0.0 }
    },
    // wireframe: true,
    side: DoubleSide
  });

  return { body, shader };
}

export { createMaterials };