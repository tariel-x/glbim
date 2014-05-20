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
 * @param {string} objFile Path and model filename
 * @param {string} mtlFile Path and MTL filename
 * @param {THREE.Scene} scene ThreeJS scene
 */

function Scene(objFile, mtlFile, scene)
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
     */
    this.load = function()
    {
        
    }
}