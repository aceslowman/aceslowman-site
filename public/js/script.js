var scene,
bufferScene,
camera,
orthoCamera,
renderer,
clock;

var material, finalMaterial;
var uniforms;

var sourceTexture, textureA, textureB;

// OBJECTS
var cube, quad;

init();
animate();

// ============================================================================
function init(){
    setupCameras();
    setupBuffer();
    setupMainScene();

    renderer = new THREE.WebGLRenderer();
    document.body.appendChild( renderer.domElement );

    onWindowResize();
    window.addEventListener( 'resize', onWindowResize, false );

    renderer.setClearColor( "black" );
}

// ============================================================================
function setupBuffer(){
    sourceScene = new THREE.Scene();
    sourceTexture = new THREE.WebGLRenderTarget( 600, 600 );

    var cubeGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5 );
    var cubeMaterial = new THREE.MeshBasicMaterial( { color: "blue" } );

    cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

    var sourceQuadMaterial = new THREE.MeshBasicMaterial( { color:"black" } );
    var sourceQuad = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 1.5, 1.5, 1.5 ),
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

    textureA = new THREE.WebGLRenderTarget( 600, 600,
        { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter}
    );
    textureB = new THREE.WebGLRenderTarget( 600, 600,
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

    var plane = new THREE.PlaneBufferGeometry( 2., 2. );
    var bufferObject = new THREE.Mesh( plane, material );
    bufferScene.add(bufferObject);

    var finalPlane = new THREE.PlaneBufferGeometry( 5.0, 5.0 );
    finalMaterial =  new THREE.MeshBasicMaterial({ map: textureB.texture });
    quad = new THREE.Mesh( finalPlane, finalMaterial );
    // quad.position.z = 2;

    scene.add( quad );
}

// ============================================================================
function setupCameras(){
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.z = 4;
}

// ============================================================================
function animate() {
    requestAnimationFrame( animate );
    render();
}

// ============================================================================
function render() {
    //render the source to bufferTexture (tied to tex1)
    renderer.render( sourceScene, camera, sourceTexture );

    //render the shader buffer
    renderer.render( bufferScene, camera, textureB, true );

    // ping pong
    var temp = textureA;
    textureA = textureB; //this is important, this is the actual swap
    textureB = temp;

    //display the final image.
    quad.material.map = textureB.texture;
    uniforms.tex0.value = textureA.texture;

    renderer.render( scene, camera );
    updateCube();
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
}
