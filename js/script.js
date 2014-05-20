var container, stats;
var camera, scene, renderer, controls;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var clock = new THREE.Clock();

var objects = {};

init();
animate();

function init() 
{
    
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.z = -225;
    camera.position.z = 265;
    camera.position.y = 339;    
    
    controls = new THREE.FirstPersonControls( camera );

    controls.movementSpeed = 500;
    controls.lookSpeed = 0.16;
    controls.lookVertical = true;
    controls.constrainVertical = true;
    controls.verticalMin = 1.1;
    controls.verticalMax = 2.2;

    // scene

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 1000, 10000 );

    /*var ambientLight = new THREE.AmbientLight( 0xffffff );
    scene.add( ambientLight );*/

    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.position.set( 250, 250, 250 );
    directionalLight.castShadow = true;
    directionalLight.shadowDarkness = 0.5;
    directionalLight.shadowCameraVisible = true;
    scene.add( directionalLight );
    
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.25 );
    //hemiLight.color.setHSL( 0.6, 1, 0.75 );
    hemiLight.groundColor.setHSL( 0.1, 0.8, 0.7 );
    hemiLight.position.y = 500;
    scene.add( hemiLight );




    var loader = new THREE.OBJMTLLoader();
    loader.load('files/textures/cubes.obj', 'files/textures/cubes.mtl', function(object) {
	for (var i = 0; i < object.children.length; i++)
	{
	    var child = object.children[i];
	    console.log(child);
	    objects[child.name] = child;
	    child.castShadow = true;
	    child.receiveShadow = true;
	    for (var j = 0; j < child.children.length; j++)
	    {
		child.children[j].castShadow = true;
		child.children[j].receiveShadow = true;
		child.children[j].material.specular = new THREE.Color( 0x000000 );
		child.children[j].material.side = THREE.DoubleSide;
		
		//console.log(child.children[j]);
	    }
	}
	
	object.scale.set(10, 10, 10);
	
	object.castShadow = true;
	object.receiveShadow = true;
	scene.add(object);
    });
    

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( scene.fog.color, 1 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = camera.far;
    renderer.shadowCameraFov = 50;

    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;
    
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    container.appendChild(renderer.domElement);
    
    var geometry = new THREE.PlaneGeometry( 500, 500 );

    var texture = THREE.ImageUtils.loadTexture( 'textures/terrain/grasslight-big.jpg' );
    texture.anisotropy = renderer.getMaxAnisotropy();

    var material = new THREE.MeshPhongMaterial( { map: texture } );
    material.specular = new THREE.Color( 0x000000 );
    material.side = THREE.DoubleSide;

    mesh = new THREE.Mesh( geometry, material );
    mesh.rotation.x = 90 * ( Math.PI / 180 );
    mesh.receiveShadow = true;
    scene.add( mesh );
    
    

    //document.addEventListener('mousemove', onDocumentMouseMove, false);

    //window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() 
{
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) 
{
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}

function animate() 
{
    requestAnimationFrame(animate);
    render();
}

function render() 
{
    /*camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);*/
    alpha+=0.3;
    if (Math.abs(Math.sin(alpha * Math.PI / 360)) < 0.3)
    {
	hideObject(objects['Plane']);
	showObject(objects['Plane.001']);
    }
    else if (Math.abs(Math.sin(alpha * Math.PI / 360)) >= 0.3 && Math.abs(Math.sin(alpha * Math.PI / 360)) < 0.7) 
    {
	showObject(objects['Plane']);
	showObject(objects['Plane.001']);
    }
    else
    {
	showObject(objects['Plane']);
	hideObject(objects['Plane.001']);
    }

    directionalLight.position.x = Math.cos(alpha * Math.PI / 360) * 250;
    directionalLight.position.z = Math.sin(alpha * Math.PI / 360) * 250;
    directionalLight.position.y = Math.abs(Math.sin(alpha * Math.PI / 360)) * 250;
    hemiLight.intensity = Math.abs(Math.sin(alpha * Math.PI / 360))+0.25;
    controls.update( clock.getDelta() );
    renderer.render(scene, camera);
}

function hideObject(child)
{
    child.visible = false;
    for (var j = 0; j < child.children.length; j++)
    {
	child.children[j].visible = false;
    }
    child.updateMatrix();
}

function showObject(child)
{
    child.visible = true;
    for (var j = 0; j < child.children.length; j++)
    {
	child.children[j].visible = true;
    }
    child.updateMatrix();
}
