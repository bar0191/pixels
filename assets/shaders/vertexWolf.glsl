uniform float uAmplitude;
uniform float uScale;

attribute vec3 customColor;
attribute vec3 displacement;

varying vec3 vNormal;
varying vec3 vColor;

void main() {

    vNormal = normal;
    vColor = customColor;

    vec3 newPosition = position + normal * uAmplitude * 10.0;
    newPosition.xyz *= uScale;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}