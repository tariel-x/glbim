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
    //bimScene.load('obj', {objFile : 'files/textures/cubes.obj', mtlFile : 'files/textures/cubes.mtl'});
    bimScene.load('utf8', {jsFile : 'files/utf8/cubes.js'});
    bimScene.addSun();
    bimScene.addSurrondLight();
    bimScene.addPerson();
    processingScheme = convertGantt(ganttData);
    bimScene.addProcessSceme(processingScheme);

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
    
    var geometry = new THREE.PlaneGeometry( 1000, 1000 );

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
    //kostil here
    var ganttHeight = window.innerHeight * 0.45;
    document.getElementById('gantt').style.height=ganttHeight+'px';
    gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
    gantt.config.readonly = true;
    gantt.init("gantt");
    gantt.parse(ganttData);
    gantt.attachEvent("onTaskClick", function(id, e){
	var date = new Date(this.getTask(id).start_date).getTime()/1000;
	var start = bimScene.getStart();
	var end = bimScene.getEnd();
	var percent = (end - start) / 100;
	var curr_percents = (date - start) / percent;
	gantt.selectTask(id);
	sliderHandler(curr_percents, slider);
	slider.setValue(curr_percents);
	//console.log(curr_percents );
    });
}

function animate() 
{
    requestAnimationFrame(animate);
    render();
}

function render() 
{
    bimScene.update();
    updateControls();
    renderer.render(scene, bimScene.getObject('person').Camera);
}

function convertGantt(gantt)
{
    var scheme = [];
    for (var i = 0; i < gantt['data'].length; i++)
    {
	
	var strdate = gantt['data'][i]['start_date'].split(' ');
	var date = new Date(strdate[0] + "T" + strdate[1]).getTime()/1000;
	var raw_date = new Date(gantt['data'][i]['start_date']);
	scheme[date] = {};
	scheme[date]['show'] = gantt['data'][i]['show'];
	scheme[date]['hide'] = gantt['data'][i]['hide'];
	scheme[date]['ganttId'] = gantt['data'][i]['id'];
    }
    return scheme;
}

function updateControls()
{
    var start = bimScene.getStart();
    var end = bimScene.getEnd();
    var current = bimScene.getIterator();
    
    if (typeof start !== "undefined" && typeof end !== "undefined" && bimScene.statusPlay == true)
    {
	var percent = (end - start) / 100;
	var curr_percents = (current - start) / percent;
	slider.setValue(curr_percents);
	console.log(bimScene.currentWork.ganttId);
	gantt.selectTask(bimScene.currentWork.ganttId);
    }
    if (current >= end)
	document.getElementById('play').innerHTML = "Play";
}


function sliderHandler(pos, slider) 
{
    
    var start = bimScene.getStart();
    var end = bimScene.getEnd();
    if (typeof start !== "undefined" && typeof end !== "undefined" /*&& bimScene.statusPlay == true*/)
    {
	var percent = (end - start) / 100;
	var currrent = (pos * percent) + Number(start);
	bimScene.setDateIterator(currrent);
	gantt.selectTask(bimScene.currentWork.ganttId);
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