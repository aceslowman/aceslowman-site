const vert = `
varying vec2 vUv;

void main()	{
    vUv = uv;
    gl_Position = vec4( position, 1.0 );
}
`;

const frag = `
uniform sampler2D tex0;
uniform sampler2D tex1;
varying vec2 vUv;

uniform float amount;
uniform float scale;

uniform vec2 vPoint;

void main(){

    vec4 color;

    vec2 uv = vUv;
    vec2 uv2 = uv;

    uv2 -= vPoint;
    uv2 += vPoint/scale;
    uv2 *= scale;

    vec4 current = texture2D(tex1, uv);
    vec4 fb = texture2D(tex0, uv2);
    color = current + (fb * amount);

    gl_FragColor = vec4(color.rgb,1.0);
}
`;

export { vert, frag }
