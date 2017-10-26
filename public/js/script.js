var scene, feedbackScene, sharpenScene, barrelScene;
var perspectiveCamera, orthoCamera;
var renderer;

var finalMaterial;
var sharpenUniforms, feedbackUniforms, barrelUniforms;

var sourceTexture, textureA, textureB, textureC, textureD;

// OBJECTS
var cube, quad;

var width, height;

var mouse =  new THREE.Vector2();

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
    window.addEventListener( 'mousemove', onMouseMove, false );

    renderer.setClearColor( "black" );
}

// ============================================================================
function setupSourceBuffer(){
    sourceScene = new THREE.Scene();
    sourceTexture = new THREE.WebGLRenderTarget( width, height );

    var cubeGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var cubeMaterial = new THREE.MeshBasicMaterial( { color: "white" } );

    cube = new THREE.Mesh( cubeGeometry, cubeMaterial );

    var circleGeometry = new THREE.CircleGeometry(0.4,32);
    var circleGeometry_sm = new THREE.CircleGeometry(0.395,32);
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

function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth);
    mouse.y = (event.clientY / window.innerHeight);

    console.log(mouse);
}

function updateUniforms(){
    feedbackUniforms.vPoint.value = [mouse.x,mouse.y];
}

function feedback(){
    feedbackScene = new THREE.Scene();

    feedbackUniforms = {
        tex0: { value: textureA.texture },
        tex1: { value: sourceTexture.texture },
        feedback: { value: 0.99 },
        scale: { value: 0.992 },
        vPoint: { value: [0.5,0.5] }
    };

    feedbackShaderMaterial = new THREE.ShaderMaterial( {
    	uniforms: feedbackUniforms,
    	vertexShader: document.getElementById( 'feedback_vert' ).textContent,
    	fragmentShader: document.getElementById( 'feedback_frag' ).textContent
    } );

    var plane1 = new THREE.PlaneBufferGeometry( 2., 2.);
    var bufferObject = new THREE.Mesh( plane1, feedbackShaderMaterial );
    feedbackScene.add(bufferObject);
}

function sharpen(){
    sharpenScene = new THREE.Scene();

    sharpenUniforms = {
        tex0: { value: textureB.texture },
        width: { value: 0.008 }
    }

    sharpenShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: sharpenUniforms,
        vertexShader: document.getElementById( 'sharpen_vert' ).textContent,
        fragmentShader: document.getElementById( 'sharpen_frag' ).textContent
    } );

    var plane2 = new THREE.PlaneBufferGeometry( 2., 2.);
    var sharpenObject = new THREE.Mesh( plane2, sharpenShaderMaterial );
    sharpenScene.add(sharpenObject);
}

function barrelBlurChroma(){
    barrelScene = new THREE.Scene();

    barrelUniforms = {
        tex0: { value: textureC.texture },
        barrelPower: { value: 0.3 },
        zoom: { value: 0.9 }
    }

    barrelShaderMaterial = new THREE.ShaderMaterial( {
        uniforms: barrelUniforms,
        vertexShader: document.getElementById( 'barrelChroma_vert' ).textContent,
        fragmentShader: document.getElementById( 'barrelChroma_frag' ).textContent
    } );

    var plane3 = new THREE.PlaneBufferGeometry( 2., 2.);
    var barrelObject = new THREE.Mesh( plane3, barrelShaderMaterial );
    barrelScene.add(barrelObject);
}

// ============================================================================
function setupMainScene(){
    scene = new THREE.Scene();

    textureA = new THREE.WebGLRenderTarget( width, height );
    textureB = new THREE.WebGLRenderTarget( width, height );
    textureC = new THREE.WebGLRenderTarget( width, height );
    textureD = new THREE.WebGLRenderTarget( width, height );

    feedback();

    sharpen();

    barrelBlurChroma();

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

    updateCube();
    updateUniforms();
}

// ============================================================================
function render() {
    renderer.render( sourceScene, perspectiveCamera, sourceTexture );
    renderer.render( feedbackScene, orthoCamera, textureB );
    renderer.render( sharpenScene, orthoCamera, textureC );


    var temp = textureA;
    textureA = textureC;
    textureC = temp;

    renderer.render( barrelScene, orthoCamera, textureD );

    quad.material.map = textureD.texture;

    feedbackUniforms.tex0.value = textureA.texture;
    sharpenUniforms.tex0.value = textureB.texture;
    barrelUniforms.tex0.value = textureC.texture;

    renderer.render( scene, orthoCamera );
}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
}
