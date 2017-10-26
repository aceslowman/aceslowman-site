$(function(){

    var scene, feedbackScene, sharpenScene, barrelScene;
    var perspectiveCamera, orthoCamera;
    var renderer;

    var finalMaterial;
    var sharpenUniforms, feedbackUniforms, barrelUniforms;

    var sourceTexture, textTexture, textureA, textureB, textureC, textureD;

    // OBJECTS
    var cube, quad;

    var width, height;

    var mouse =  new THREE.Vector2();

    var clickbox = [
        {
            x1: window.innerWidth/2.0 - 165,
            y1: (window.innerHeight/3) * 2,
            x2: (window.innerWidth/2.0 - 165) + 50,
            y2: ((window.innerHeight/3) * 2) + 50,
            target: "https://www.facebook.com/aceslowman/"
        },
        {
            x1: window.innerWidth/2.0 - 40,
            y1: (window.innerHeight/3) * 2,
            x2: (window.innerWidth/2.0 - 40) + 50,
            y2: ((window.innerHeight/3) * 2) + 50,
            target: "https://twitter.com/aceslowman"
        },
        {
            x1: window.innerWidth/2.0 + 85,
            y1: (window.innerHeight/3) * 2,
            x2: (window.innerWidth/2.0 + 85) + 50,
            y2: ((window.innerHeight/3) * 2) + 50,
            target: "https://www.instagram.com/aceslowman/"
        }
    ];

    init();
    animate();

    function setupText(text){
        var textCanvas = document.getElementById("textCanvas");
        textCanvas.width = window.innerWidth;
        textCanvas.height = window.innerHeight;
        var textCtx = textCanvas.getContext("2d");
        textCtx.textAlign = 'center';
        textCtx.font = "80px Helvetica";

        textCtx.beginPath();
        textCtx.rect(0, 0, window.innerWidth, window.innerHeight);
        textCtx.fillStyle = "black";
        textCtx.fill();

        var img1 = document.getElementById("fb_icon");
        var img2 = document.getElementById("twitter_icon");
        var img3 = document.getElementById("ig_icon");

        textCtx.drawImage(img1, window.innerWidth/2.0 - 165, (window.innerHeight/3) * 2 );
        textCtx.drawImage(img2, window.innerWidth/2.0 - 40, (window.innerHeight/3) * 2 );
        textCtx.drawImage(img3, window.innerWidth/2.0 + 85, (window.innerHeight/3) * 2 );

        textCtx.lineWidth = 1;
        textCtx.fillStyle = 'white';
        textCtx.fillText( text, window.innerWidth/2.0, window.innerHeight/3 );

        textTexture = new THREE.Texture(textCanvas);
        textTexture.needsUpdate = true;
    }

    // ============================================================================
    function init(){
        width = window.innerWidth;
        height = window.innerHeight;

        renderer = new THREE.WebGLRenderer({ antialias: true });
        document.body.appendChild( renderer.domElement );

        onWindowResize();
        window.addEventListener( 'resize', onWindowResize, false );
        window.addEventListener( 'mousemove', onMouseMove, false );
        window.addEventListener( 'mousedown', onMouseDown, false );

        renderer.setClearColor( "black" );

        setupCameras();
        setupSourceBuffer();
        setupText("aceslowman");
        setupMainScene();
    }

    // ============================================================================
    function setupSourceBuffer(){
        sourceScene   = new THREE.Scene();
        sourceTexture = new THREE.WebGLRenderTarget( width, height );

        var whiteMaterial = new THREE.MeshBasicMaterial( { color:"white" } );
        var blackMaterial = new THREE.MeshBasicMaterial( { color:"black" } );

        var circleGeometry = new THREE.CircleGeometry(0.4,32);
        var circleGeometry_sm = new THREE.CircleGeometry(0.395,32);
        var circle = new THREE.Mesh(circleGeometry, whiteMaterial);
        var circle_sm = new THREE.Mesh(circleGeometry_sm, blackMaterial);

        sourceScene.add( circle );
        sourceScene.add( circle_sm );
    }

    // ============================================================================
    function feedback(){
        feedbackScene = new THREE.Scene();

        feedbackUniforms = {
            tex0: { value: textureA.texture },
            tex1: { value: textTexture },
            feedback: { value: 0.6 },
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

    // ============================================================================
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

    // ============================================================================
    function barrelBlurChroma(){
        barrelScene = new THREE.Scene();

        barrelUniforms = {
            tex0: { value: textureC.texture },
            barrelPower: { value: -0.4 },
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

    // ============================================================================
    function onWindowResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
    }

    // ============================================================================
    function onMouseMove(event){
        mouse.x = (event.clientX / window.innerWidth);
        mouse.y = (event.clientY / window.innerHeight);

        feedbackUniforms.vPoint.value = [mouse.x,mouse.y];
    }

    // ============================================================================
    function onMouseDown(event){
        // console.log(event.clientX);

        for(var click in clickbox){
            console.log(clickbox[click]);
            if(event.clientX > clickbox[click].x1 && event.clientY > clickbox[click].y1){
                if(event.clientX < clickbox[click].x2 && event.clientY < clickbox[click].y2){
                    window.location.href = clickbox[click].target;
                }
            }
        }
    }
});
