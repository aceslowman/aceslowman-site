const vert = `
varying vec2 vUv;

void main()	{
    vUv = uv;
    gl_Position = vec4( position, 1.0 );
}
`;

const frag = `
uniform sampler2D tex0;
varying vec2 texcoord0;
varying vec2 texdim0;
varying vec2 vUv;

void main()
{
    vec4 color = texture2D( tex0, vUv );
    gl_FragColor = vec4(1.0 - color);
}
`;

export { vert, frag }
