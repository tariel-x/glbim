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

function Scene(scene)
{
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
	GlObjects["person"] = new Person(null, 'person', 'player');
    }
    
    /**
     * Performs actions to update the scene
     */
    this.update = function()
    {
	GlObjects['person'].update();
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

}
