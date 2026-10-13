varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main(){
    vec4 textureColor = texture2D(uTexture,vUv); 
    gl_FragColor = textureColor;
    // gl_FragColor = vec4(1.0,0.4,0.7,1.0);
    // float strength = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
}