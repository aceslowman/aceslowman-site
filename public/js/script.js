var scene,
bufferScene,
perspectiveCamera,
orthoCamera,
renderer,
clock;

var material, finalMaterial;
var sharpenUniforms, feedbackUniforms;

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
    sourceTexture = new THREE.WebGLRenderTarget( width, height );

    var cubeGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var cubeMaterial = new THREE.MeshBasicMaterial( { color: "white" } );

    cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

    var circleGeometry = new THREE.CircleGeometry(0.6,32);
    var circleGeometry_sm = new THREE.CircleGeometry(0.59,32);
    var circle = new THREE.Mesh(circleGeometry, cubeMaterial);

    var sourceQuadMaterial = new THREE.MeshBasicMaterial( { color:"black" } );
    var circle_sm = new THREE.Mesh(circleGeometry_sm, sourceQuadMaterial);
    var sourceQuad = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( width, height ),
        sourceQuadMaterial
    );

    sourceQuad.position.z = -1;

    sourceScene.add( sourceQuad );
    sourceScene.add( circle );
    sourceScene.add( circle_sm );
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
    bufferScene2 = new THREE.Scene();

    textureA = new THREE.WebGLRenderTarget( width, height );
    textureB = new THREE.WebGLRenderTarget( width, height );
    textureC = new THREE.WebGLRenderTarget( width, height );

    /*
        FEEDBACK
    */

    feedbackUniforms = {
        tex0: { value: textureA.texture },
        tex1: { value: sourceTexture.texture }
    };

    feedbackShaderMaterial = new THREE.ShaderMaterial( {
    	uniforms: feedbackUniforms,
    	vertexShader: document.getElementById( 'feedback_vert' ).textContent,
    	fragmentShader: document.getElementById( 'feedback_frag' ).textContent
    } );

    /*
        SHARPEN
    */

    sharpenUniforms = {
        tex0: { value: textureB.texture },
        width: 0.002
    }

    sharpenShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: sharpenUniforms,
        vertexShader: document.getElementById( 'sharpen_vert' ).textContent,
        fragmentShader: document.getElementById( 'sharpen_frag' ).textContent
    } );

    var plane1 = new THREE.PlaneBufferGeometry( 2., 2.);
    var bufferObject = new THREE.Mesh( plane1, feedbackShaderMaterial );
    bufferScene.add(bufferObject);

    var plane2 = new THREE.PlaneBufferGeometry( 2., 2.);
    var sharpenObject = new THREE.Mesh( plane2, sharpenShaderMaterial );
    bufferScene2.add(sharpenObject);

    /*
        FINAL DISPLAY SCENE
    */

    //got it here
    var plane3 = new THREE.PlaneBufferGeometry( width, height );
    finalMaterial = new THREE.MeshBasicMaterial({ map: textureC.texture });
    quad = new THREE.Mesh( plane3, finalMaterial );
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

    orthoCamera.position.z = 1;
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
    renderer.render( bufferScene, orthoCamera, textureB );

    /*

        Why is a cube being drawn OVER the top of the bufferScene2 render?

    */

    renderer.render( bufferScene2, orthoCamera, textureC );

    var temp = textureA;
    textureA = textureC;
    textureC = temp;

    quad.material.map = textureC.texture;
    feedbackUniforms.tex0.value = textureA.texture;
    sharpenUniforms.tex0.value = textureB.texture;

    renderer.render( scene, orthoCamera );
    updateCube();
}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
}
