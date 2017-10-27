$(function(){

    var scene, feedbackScene, sharpenScene, barrelScene;
    var perspectiveCamera, orthoCamera;
    var renderer;

    var finalMaterial;
    var sharpenUniforms, feedbackUniforms, barrelUniforms;

    var textTexture, textureA, textureB, textureC, textureD;

    var width, height;

    var mouse =  new THREE.Vector2();

    var clickbox = [
        {
            x1: window.innerWidth/2.0 - 155,
            y1: (window.innerHeight/3.5) * 2,
            x2: (window.innerWidth/2.0 - 155) + 50,
            y2: ((window.innerHeight/3.5) * 2) + 50,
            target: "https://www.facebook.com/aceslowman/"
        },
        {
            x1: window.innerWidth/2.0 - 40,
            y1: (window.innerHeight/3.5) * 2,
            x2: (window.innerWidth/2.0 - 40) + 50,
            y2: ((window.innerHeight/3.5) * 2) + 50,
            target: "https://twitter.com/aceslowman"
        },
        {
            x1: window.innerWidth/2.0 + 95,
            y1: (window.innerHeight/3.5) * 2,
            x2: (window.innerWidth/2.0 + 95) + 50,
            y2: ((window.innerHeight/3.5) * 2) + 50,
            target: "https://www.instagram.com/aceslowman/"
        },
        {
            x1: window.innerWidth/2.0,
            y1: window.innerHeight/2.5,
            target: ""
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

        if(width < 500){
            textCtx.font = "60px Helvetica";
        }else{
            textCtx.font = "80px Helvectica";
        }


        textCtx.beginPath();
        textCtx.rect(0, 0, window.innerWidth, window.innerHeight);
        textCtx.fillStyle = "black";
        textCtx.fill();

        var img1 = document.getElementById("fb_icon");
        var img2 = document.getElementById("twitter_icon");
        var img3 = document.getElementById("ig_icon");

        textCtx.drawImage(img1, clickbox[0].x1, clickbox[0].y1);
        textCtx.drawImage(img2, clickbox[1].x1, clickbox[1].y1);
        textCtx.drawImage(img3, clickbox[2].x1, clickbox[2].y1);

        textCtx.lineWidth = 1;
        textCtx.fillStyle = 'white';
        textCtx.fillText( text, clickbox[3].x1, clickbox[3].y1 );

        textTexture = new THREE.Texture(textCanvas);
        textTexture.needsUpdate = true;
    }

    // ============================================================================
    function init(){
        width = window.innerWidth;
        height = window.innerHeight;

        renderer = new THREE.WebGLRenderer({ antialias: true });
        document.body.appendChild( renderer.domElement );



        renderer.setClearColor( "black" );

        setupCameras();
        setupText("aceslowman");
        setupMainScene();

        onWindowResize();
        // window.addEventListener( 'resize', onWindowResize, false );
        window.addEventListener( 'mousemove', onMouseMove, false );
        window.addEventListener( 'mousedown', onMouseDown, false );
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
            barrelPower: { value: 0.7 },
            zoom: { value: 1.0 }
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

        perspectiveCamera.aspect = width / height;
        perspectiveCamera.updateProjectionMatrix();
        orthoCamera.updateProjectionMatrix();
    }

    // ============================================================================
    function onMouseMove(event){
        mouse.x = (event.clientX / window.innerWidth);
        mouse.y = (event.clientY / window.innerHeight);

        feedbackUniforms.vPoint.value = [mouse.x,mouse.y];

        $('html,body').css('cursor', 'default');

        for(var click in clickbox){
            if(event.clientX > clickbox[click].x1 && event.clientY > clickbox[click].y1){
                if(event.clientX < clickbox[click].x2 && event.clientY < clickbox[click].y2){
                    $('html,body').css('cursor', 'pointer');
                }
            }
        }
    }

    // ============================================================================
    function onMouseDown(event){
        for(var click in clickbox){
            console.log(clickbox[click]);
            if(event.clientX > clickbox[click].x1 && event.clientY > clickbox[click].y1){
                if(event.clientX < clickbox[click].x2 && event.clientY < clickbox[click].y2){
                    window.location.href = clickbox[click].target;
                }
            }else{
                $('html,body').css('cursor', 'default');
            }
        }
    }
});
