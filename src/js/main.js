var scene    = null,
    camera   = null,
    renderer = null,
    controls = null;

var cube = null;

function start() {
    window.onresize = onWindowResize;
    initScene();
    animate();
}

function initScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xe0e0d1 );

    camera = new THREE.PerspectiveCamera( 
        75,                                     // Ángulo "grabación" - De abaja -> Arriba 
        window.innerWidth / window.innerHeight, // Relación de aspecto 16:9
        0.1,                                    // Mas cerca (no renderiza) 
        1000                                    // Mas lejos (no renderiza)
    );

    // renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#app") });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    camera.position.set( 0, 1, 2 );
    controls.update();

    // Grid Creation 
    var size = 50;
    var divisions = 50;

    var gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );

    var axesHelper = new THREE.AxesHelper( 1 );
    scene.add( axesHelper );
}

function animate() {
    requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function getBuildingData() {
    var message = 'Ingrese el número de edificios a crear: ';
    var datas = parseInt(prompt(message,"2"));

    // Este parte lo hace la cantidad de veces (segun la cantidad de edificios)
    for (var i=0; i<datas; i++){
        var message2 = 'Ingrese el número de pisos, color y wireframe del edificio '+(i+1)+': ';
        var datas2 = prompt(message2,"3,ff0000,false");

        var values = cleanParamsUI(datas2, ',');

        console.log("Numero de pisos: "+values[0]);
        console.log("Color: "+values[1]);
        console.log("Wireframe: "+values[2]);

        drawElement(values, i);
    }
    
}

function drawElement(values, index) {
    
    var numPisos = values[0];
    var colorHex = "0x" + values[1];
    var wireframeMode = values[2];
    var posicionX = index*5;

    for (var i=0; i<numPisos; i++){
        //PISO
        const geometryCube = new THREE.BoxGeometry( 3, 2, 2 );
        const materialCube = new THREE.MeshBasicMaterial( { color: parseInt(colorHex), wireframe: wireframeMode } );
        const cube = new THREE.Mesh(geometryCube, materialCube );
        cube.position.y = 1.6*(i+1);
        cube.position.x = posicionX;
        
        scene.add( cube );

        //VENTANAS
        const geometryMyWindow = new THREE.BoxGeometry( 2.5, 1.5, 0.1 );
        const materialMyWindow = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: wireframeMode } );
        const myWindow = new THREE.Mesh(geometryMyWindow, materialMyWindow );
        myWindow.position.y = 1.6*(i+1);
        myWindow.position.x = posicionX;
        myWindow.position.z = 1;
        scene.add( myWindow );
    }
    console.log("Edificio creado con los datos ingresados");
}

function cleanParamsUI(datos, marker) {
    value = datos.split(marker);
    value[0] = parseInt(value[0]);
    value[1] = value[1].trim();
    value[2] = (value[2].trim().toLowerCase() === 'true');
    return value;
}