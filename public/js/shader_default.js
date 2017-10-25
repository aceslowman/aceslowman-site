// <script id="vertexShader" type="x-shader/x-vertex">
//     void main()	{
//         gl_Position = vec4( position, 1.0 );
//     }
// </script>
//
// <script id="fragmentShader" type="x-shader/x-fragment">
//     uniform vec2 resolution;
//     uniform float time;
//     void main()	{
//         vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;
//         float a = time*40.0;
//         float d,e,f,g=1.0/40.0,h,i,r,q;
//         e=400.0*(p.x*0.5+0.5);
//         f=400.0*(p.y*0.5+0.5);
//         i=200.0+sin(e*g+a/150.0)*20.0;
//         d=200.0+cos(f*g/2.0)*18.0+cos(e*g)*7.0;
//         r=sqrt(pow(abs(i-e),2.0)+pow(abs(d-f),2.0));
//         q=f/r;
//         e=(r*cos(q))-a/2.0;f=(r*sin(q))-a/2.0;
//         d=sin(e*g)*176.0+sin(e*g)*164.0+r;
//         h=((f+d)+a/2.0)*g;
//         i=cos(h+r*p.x/1.3)*(e+e+a)+cos(q*g*6.0)*(r+h/3.0);
//         h=sin(f*g)*144.0-sin(e*g)*212.0*p.x;
//         h=(h+(f-e)*q+sin(r-(a+h)/7.0)*10.0+i/4.0)*g;
//         i+=cos(h*2.3*sin(a/350.0-q))*184.0*sin(q-(r*4.3+a/12.0)*g)+tan(r*g+h)*184.0*cos(r*g+h);
//         i=mod(i/5.6,256.0)/64.0;
//         if(i<0.0) i+=4.0;
//         if(i>=2.0) i=4.0-i;
//         d=r/350.0;
//         d+=sin(d*d*8.0)*0.52;
//         f=(sin(a*g)+1.0)/2.0;
//         gl_FragColor=vec4(vec3(f*i/1.6,i/2.0+d/13.0,i)*d*p.x+vec3(i/1.3+d/8.0,i/2.0+d/18.0,i)*d*(1.0-p.x),1.0);
//     }
// </script>

var scene,
camera,
renderer,
clock;

var uniforms;

init();
animate();

function init(){
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.z = 5;

    scene = new THREE.Scene();

    var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

    uniforms = {
    	time:       { value: 1.0 },
    	resolution: { value: new THREE.Vector2() }
    };

    var material = new THREE.ShaderMaterial( {
    	uniforms: uniforms,
    	vertexShader: document.getElementById( 'vertexShader' ).textContent,
    	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );

    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement );

    onWindowResize();

    window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    uniforms.time.value += 0.05;
    renderer.render( scene, camera );
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);

    uniforms.resolution.value.x = renderer.domElement.width;
    uniforms.resolution.value.y = renderer.domElement.height;
}
