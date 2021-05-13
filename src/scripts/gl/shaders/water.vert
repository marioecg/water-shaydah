attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float uTime;

varying vec3 vNormal;
varying vec2 defaultUvs;
varying vec2 vUv;
varying vec2 vUv2;

void main() {
  vNormal = normalize(normalMatrix * normal);

  float t = uTime * 0.05;
  float t2 = uTime * 0.02;

  defaultUvs = uv;
  vUv = vec2(uv.x + t, uv.y) * 3.0;
  vUv2 = vec2(uv.x + t2, uv.y - t2) * 2.0;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}