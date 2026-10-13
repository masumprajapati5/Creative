uniform float uTime;
varying vec2 vUv;

void main(){
    vec3 newPosition = position;
    vec2 newUv = uv- 0.5; 
    float dist = distance(newUv,vec2(0.0));
    newPosition.z = sin(dist * 5.0 - uTime) * 0.9;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
    vUv = uv;
    // newUv.x += 2.0;
    // newPosition.z += sin(newPosition.x * 3.0 + uTime);
}