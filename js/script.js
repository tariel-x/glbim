var container = document.getElementById('glbim'), stats;
var jqcontainer = $("#glbim");
var scene, renderer;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var bimScene;
var processingScheme = {};

window.dhx_globalImgPath = "ext/slider/imgs/";
var slider = new dhtmlxSlider("slider", 800);

init();
animate();

function init() 
{
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xffffff, 1000, 10000 );
    bimScene = new Scene(scene, container);
    bimScene.load('files/textures/cubes.obj', 'files/textures/cubes.mtl');
    bimScene.addSun();
    bimScene.addSurrondLight();
    bimScene.addPerson();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( scene.fog.color, 1 );
    renderer.setSize(window.innerWidth, window.innerHeight/2 );
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
    
    //slier
    
    slider.attachEvent("onChange", sliderHandler);
    slider.init();
    slider.setMin(0);
    slider.setMax(100);
    slider.setStep(1);
    
    //gantt
    
    processingScheme = convertGantt(gantt);
    bimScene.addProcessSceme(processingScheme);
}

function onWindowResize() 
{
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 4;

    camera.aspect = window.innerWidth / (window.innerHeight / 2);
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight / 2);
}

function animate() 
{
    requestAnimationFrame(animate);
    render();
}

function render() 
{
    bimScene.update();
    setSliderPercent();
    renderer.render(scene, bimScene.getObject('person').Camera);
}

function convertGantt(gantt)
{
    var scheme = {};
    for (var i = 0; i < gantt['data'].length; i++)
    {
	var date = new Date(gantt['data'][i]['start_date']).getTime()/1000;
	scheme[date] = {};
	scheme[date]['show'] = gantt['data'][i]['show'];
	scheme[date]['hide'] = gantt['data'][i]['hide'];
    }
    return scheme;
}

function setSliderPercent()
{
    var start = bimScene.getStart();
    var end = bimScene.getEnd();
    var current = bimScene.getIterator();
    
    if (typeof start !== "undefined" && typeof end !== "undefined" && bimScene.statusPlay == true)
    {
	var percent = (end - start) / 100;
	var curr_percents = (current - start) / percent;
	slider.setValue(curr_percents);
    }
}

function sliderHandler(pos, slider) {
    
    var start = bimScene.getStart();
    var end = bimScene.getEnd();
    if (typeof start !== "undefined" && typeof end !== "undefined" /*&& bimScene.statusPlay == true*/)
    {
	var percent = (end - start) / 100;
	var currrent = (pos * percent) + Number(start);
	bimScene.setDateIterator(currrent);
    }
}

function play()
{
    if (document.getElementById('play').innerHTML == "Play")
    {
	document.getElementById('play').innerHTML = "Pause";
	bimScene.play();
    }
    else
    {
	document.getElementById('play').innerHTML = "Play";
	bimScene.pause();
    }
}

//bimScene.play();