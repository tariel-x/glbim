/* 
 * Copyright (C) 2014 Nikita Gerasimov <tariel-x@ya.ru>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */

/**
 * Scene container and base class
 * @param {THREE.Scene} scene ThreeJS scene
 */

function Scene(scene, domElement)
{
    /**
     * Contains html DOM container for webgl
     */
    this.domElement = domElement;
    
    /**
     * Objects array
     */
    var GlObjects = {};
        
    /**
     * Array of messages, containing adreess and action object
     */
    this.Messages = [];
    
    /**
     * Main scene
     */
    var GlScene = scene;
    
    /**
     * Name of current player object
     * @type String
     */
    this.currentPlayer;
    
    /**
     * Factory, which decides what object to create
     * @type objectFactory
     */
    var factory = new objectFactory();
    
    /**
     * Stores number of seconds from building start
     * @type Number
     */
    var dateIterator;
    
    /**
     * Date, when process ends
     * @type Number
     */
    var dateEnd = 0;
    
    /**
     * Date, when process starts
     * @type Number
     */
    var dateStart = 0;
    
    /**
     * How much to add to dateIterator each iteration
     * @type Number
     */
    var dateDiff = 3000;
    
    /**
     * Play or pause
     * @type Boolean
     */
    var statusPlay = false;
    
    /**
     * Object with building scheme
     * @type Object
     */
    var processScheme = [];
    
    var timeContainer = document.getElementById('bimtime');
    
    /**
     * Loads model and fills scene with objects
     * @param {string} objFile Path and model filename
     * @param {string} mtlFile Path and MTL filename
     */
    this.load = function(objFile, mtlFile)
    {
	//console.log(GlScene);
        var loader = new THREE.OBJMTLLoader();
	
        loader.load(objFile, mtlFile, function(object) {
	    while (object.children.length !== 0)//magic
		for (var i = 0; i <= object.children.length; i++)
		{
		    var child = object.children[i];
		    console.log('loaded ' + child.name);

		    child.castShadow = true;
		    child.receiveShadow = true;
		    for (var j = 0; j < child.children.length; j++)
		    {
			child.children[j].castShadow = true;
			child.children[j].receiveShadow = true;
			child.children[j].material.specular = new THREE.Color( 0x000000 );
			child.children[j].material.side = THREE.DoubleSide;
		    }
		    child.scale.set(10, 10, 10);
		    GlScene.add(child);
		    var type = child.name.split('_');
		    GlObjects[child.name] = factory.createObject(child, child.name, type[0]);
		}
        });
    }
    
    /**
     * Returns bimObject by it's name
     * @param {string} name
     * @returns {BimObject}
     */
    this.getObject = function(name)
    {
	return GlObjects[name];
    }
    
    /**
     * Creates new person with camera
     */
    this.addPerson = function()
    {
	GlObjects["person"] = new Person(null, 'person', 'player', this.domElement);
    }
    
    /**
     * Performs actions to update the scene
     */
    this.update = function()
    {

	GlObjects['person'].update();
	if (this.statusPlay == true)
	{
	    dateIterator = Number(dateIterator) + dateDiff;
	    
	    for ( var property in processScheme) {//search for all stages
		if (property >= dateIterator - dateDiff && property <= dateIterator + dateDiff)
		{
		    //console.log(processScheme[property]);
		    for ( var show in processScheme[property]['show']) {//show all mentioned objects
			GlObjects[processScheme[property]['show'][show]].show();
			console.log("show " + processScheme[property]['show'][show]);
		    }
		    for ( var hide in processScheme[property].hide) {//hide all mentioned objects
			GlObjects[processScheme[property].hide[hide]].hide();
			console.log("hide " + processScheme[property].hide[hide]);
		    }
		}
	    }
	    
	    if (dateIterator >= dateEnd)
	    {
		this.stop();
	    }

	    var currentDate = new Date(Number(dateIterator)*1000);
	    timeContainer.innerHTML = currentDate.toLocaleString();
	}
	
    }
    
    /**
     * Adds directional light to scene. Sun would be available via getObject('sun').
     */
    this.addSun = function()
    {	
	GlObjects["sun"] = factory.createLight(null, 'sun', 'light');
	GlScene.add( GlObjects["sun"].GlObject );
    }
    
    /**
     * Adds default hemisphere light to scene
     */
    this.addSurrondLight = function()
    {
	var color = new THREE.Color( 0xffffff );
	var intensivity = 1.25;
	var hemiLight = new THREE.HemisphereLight( color, color, intensivity );
	//hemiLight.color.setHSL( 0.6, 1, 0.75 );
	hemiLight.groundColor.setHSL( 0.1, 0.8, 0.7 );
	hemiLight.position.y = 500;
	GlScene.add( hemiLight );
	GlObjects['ambient'] = new Ambient(hemiLight, 'ambient', 'light', color, color, intensivity);
    }
    
    /**
     * Adds new building processing scheme
     * @param {Object} scheme
     */
    this.addProcessSceme = function(scheme)
    {
	processScheme = scheme;
	var keys = Object.keys(processScheme)
	dateStart = keys[0];
	dateEnd = keys[keys.length-1];
    }
    
    this.play = function()
    {
	this.statusPlay = true;
    }
    
    this.pause = function()
    {
	this.statusPlay = false;
    }
    
    this.stop = function ()
    {
	dateIterator = dateStart;
	this.statusPlay = false;
	
    }
}
