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

function objLoader(glScene, glObjects)
{
    
    /**
     * Main scene
     */
    var GlScene = glScene;
    
    /**
     * Objects array
     */
    var GlObjects = glObjects;
    
    /**
     * Factory, which decides what object to create
     * @type objectFactory
     */
    var factory = new objectFactory();
    
    /**
     * Loads OBJ MTL model and fills scene with objects
     * @param string objFile
     * @param string mtlFile
     */
    this.loadObj = function(objFile, mtlFile)
    {
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
     * Loads UTF8 model and fills scene with objects
     * @param string jsFile json file, describing utf8 model
     */
    this.loadUtf8 = function(jsFile)
    {
	var loader = new THREE.UTF8Loader();

	loader.load( jsFile, function ( object ) 
	{
		console.log( "loaded " + jsFile );

		var s = 10;
		object.scale.set( s, s, s );
		object.castShadow = true;
		object.receiveShadow = true;
		for (var j = 0; j < object.children.length; j++)
		{
		    object.children[j].castShadow = true;
		    object.children[j].receiveShadow = true;
		    //object.children[j].material.specular = new THREE.Color( 0x000000 );
		    //object.children[j].material.side = THREE.DoubleSide;
		}
		GlScene.add( object );
		console.log(object);

		object.traverse( function( node ) {

			node.castShadow = true;
			node.receiveShadow = true;

		} );

	}, { normalizeRGB: true } );
//	var start = Date.now();
//	var loader = new THREE.UTF8Loader();
//
//	loader.load( "files/utf8/cubes.js", function ( object ) {
//
//		var end = Date.now();
//		console.log( "house", end - start, "ms" );
//
//		var s = 20;
//		object.scale.set( s, s, s );
//		object.position.x = 125;
//		object.position.y = -125;
//		scene.add( object );
//		console.log(object);
//
//		object.traverse( function( node ) {
//
//			node.castShadow = true;
//			node.receiveShadow = true;
//			//console.log(node);
//
//			/*if ( node.material && node.material.name === "skin" ) {
//
//				node.material.wrapAround = true;
//				node.material.wrapRGB.set( 0.6, 0.2, 0.1 );
//
//			}*/
//
//		} );
//
//	}, { normalizeRGB: true } );
    }
}