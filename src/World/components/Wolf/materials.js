import { MeshStandardMaterial, ShaderMaterial, DoubleSide, TextureLoader, Vector2 } from 'three';
import fragmentShader from '../../../../assets/shaders/fragmentWolf.glsl?raw';
import vertexShader from '../../../../assets/shaders/vertexWolf.glsl?raw';

function createMaterials() {
  const body = new MeshStandardMaterial({
    color: '#606060',
  });

  const shader = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uAmplitude: { value: 0.0 },
      uScale: { value: 1.0 }
    },
    // wireframe: true,
  });

  return { body, shader };
}

export { createMaterials };