var container, stats;
var scene, renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var bimScene;

init();
animate();

function init() 
{
    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 1000, 10000 );
    bimScene = new Scene(scene);
    bimScene.load('files/textures/cubes.obj', 'files/textures/cubes.mtl');
    bimScene.addSun();
    bimScene.addSurrondLight();
    bimScene.addPerson();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( scene.fog.color, 1 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = bimScene.getObject('person').Camera.far;
    renderer.shadowCameraFov = 50;

    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;
    
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild(renderer.domElement);
    
    //GROUND
    
    var geometry = new THREE.PlaneGeometry( 500, 500 );

    var texture = THREE.ImageUtils.loadTexture( 'files/textures/grasslight-big.jpg' );
    texture.anisotropy = renderer.getMaxAnisotropy();

    var material = new THREE.MeshPhongMaterial( { map: texture } );
    material.specular = new THREE.Color( 0x000000 );
    material.side = THREE.DoubleSide;

    mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = 90 * ( Math.PI / 180 );
    mesh.receiveShadow = true;
    scene.add( mesh );
}

function onWindowResize() 
{
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() 
{
    requestAnimationFrame(animate);
    render();
}

function render() 
{
    /*directionalLight.position.x = Math.cos(alpha * Math.PI / 360) * 250;
    directionalLight.position.z = Math.sin(alpha * Math.PI / 360) * 250;
    directionalLight.position.y = Math.abs(Math.sin(alpha * Math.PI / 360)) * 250;*/
    //hemiLight.intensity = Math.abs(Math.sin(alpha * Math.PI / 360))+0.25;

    bimScene.update();
    renderer.render(scene, bimScene.getObject('person').Camera);
}

