var scene,
bufferScene,
perspectiveCamera,
orthoCamera,
renderer,
clock;

var material, finalMaterial;
var uniforms;

var sourceTexture, textureA, textureB;

// OBJECTS
var cube, quad;

var width, height;

init();
animate();

// ============================================================================
function init(){
    width = window.innerWidth;
    height = window.innerHeight;

    setupCameras();
    setupSourceBuffer();
    setupMainScene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    document.body.appendChild( renderer.domElement );

    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false );

    renderer.setClearColor( "black" );
}

// ============================================================================
function setupSourceBuffer(){
    sourceScene = new THREE.Scene();
    sourceTexture = new THREE.WebGLRenderTarget(
        width,
        height,
        { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter}
    );

    var cubeGeometry = new THREE.BoxGeometry( 1., 1., 1. );
    var cubeMaterial = new THREE.MeshBasicMaterial( { color: "white" } );

    cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

    // don't worry much about this one
    var sourceQuadMaterial = new THREE.MeshBasicMaterial( { color:"black" } );
    var sourceQuad = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( width, height ),
        sourceQuadMaterial
    );

    sourceQuad.position.z = -1;

    sourceScene.add( sourceQuad );
    sourceScene.add( cube );
}

// ============================================================================
function updateCube(){
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.01;
}

// ============================================================================
function setupMainScene(){
    scene = new THREE.Scene();
    bufferScene = new THREE.Scene();

    textureA = new THREE.WebGLRenderTarget(
        width,
        height,
        { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter}
    );

    textureB = new THREE.WebGLRenderTarget(
        width,
        height,
        { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter}
    );

    uniforms = {
        tex0: { value: textureA.texture },
        tex1: { value: sourceTexture.texture }
    };

    material = new THREE.ShaderMaterial( {
    	uniforms: uniforms,
    	vertexShader: document.getElementById( 'vertexShader' ).textContent,
    	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
    } );

    /*

    I need to be able to dynamically adjust this width to match the full size
    of the final window

    */
    var plane = new THREE.PlaneBufferGeometry( 2., 2.);
    var otherMat = new THREE.MeshBasicMaterial({ color: "yellow" });
    var bufferObject = new THREE.Mesh( plane, material );
    bufferScene.add(bufferObject);

    //got it here
    // finalMaterial = new THREE.MeshBasicMaterial({ map: textureB.texture });
    finalMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
    quad = new THREE.Mesh( plane, finalMaterial );

    scene.add( quad );
}

// ============================================================================
function setupCameras(){
    orthoCamera = new THREE.OrthographicCamera(
        width / - 2,
        width / 2,
        height / 2,
        height / -2,
        1,
        1000
    );

    perspectiveCamera = new THREE.PerspectiveCamera(
        45,
        width / height,
        1,
        1000
    );

    orthoCamera.position.z = 2;
    perspectiveCamera.position.z = 5;
}

// ============================================================================
function animate() {
    requestAnimationFrame( animate );
    render();
}

// ============================================================================
function render() {
    renderer.render( sourceScene, perspectiveCamera, sourceTexture );

    /*

        bufferScene should be orthographic. It's just an intermediary buffer
        there just must be a difference between orthographic and perspective
        COORDINATES, and I think that is the key here.

        Lets play around with uv coordinates in the shader...

    */
    renderer.render( bufferScene, orthoCamera, textureB, true );

    // ping pong
    var temp = textureA;
    textureA = textureB;
    textureB = temp;

    quad.material.map = textureB.texture;
    uniforms.tex0.value = textureA.texture;

    renderer.render( bufferScene, orthoCamera );
    updateCube();
}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
}
