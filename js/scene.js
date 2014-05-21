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
     * Model file
     */
    this.ObjFile = objFile;
    
    /**
     * Textures file
     */
    this.MtlFile = mtlFile;

    /**
     * Objects array
     */
    this.Objects = {};
        
    /**
     * Array of messages, containing adreess and action object
     */
    this.Messages = [];
    
    /**
     * Loads model and fills scene with objects
     * @param {string} objFile Path and model filename
     * @param {string} mtlFile Path and MTL filename
     */
    this.load = function(objFile, mtlFile)
    {
        var loader = new THREE.OBJMTLLoader();
        loader.load('files/textures/cubes.obj', 'files/textures/cubes.mtl', function(object) {
            for (var i = 0; i < object.children.length; i++)
            {
                var child = object.children[i];
                console.log('loaded ' + child.name);
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
    }
    
    /**
     * Returns current camera from first person object
     * @returns {THREE.Camera}
     */
    this.getCurrentCamera = function()
    {
        return this.Object.camera.camera;
    }
}
