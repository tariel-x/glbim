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
 * ThreeJS base object
 * @param {THREE.Object3D} object threejs object
 * @param {String} object name
 * @param {String} object prefix (type)
 */
function BimObject(object, name, prefix)
{
    /**
     * Three object
     * @type THREE.Object3D
     */
    this.GlObject = object;
    
    /**
     * Object name
     * @type String
     */
    this.Name = name;
    
    /**
     * Prefix or type of the current object
     * @type String
     */
    this.Prefix = prefix;
    
}

/**
 * Hides object from THREE.Scene, but doesn't delete it
 */
BimObject.prototype.hide = function() {
    this.GlObject.visible = false;
    for (var j = 0; j < this.GlObject.children.length; j++)
    {
	this.GlObject.children[j].visible = false;
    }
    this.GlObject.updateMatrix();
}

/**
 * Shows object
 */
BimObject.prototype.show = function() {
    this.GlObject.visible = true;
    for (var j = 0; j < this.GlObject.children.length; j++)
    {
	this.GlObject.children[j].visible = true;
    }
    this.GlObject.updateMatrix();
}

/**
 * Makes object transparent
 * @param {Integer} opacity
 */
BimObject.prototype.setOpacity = function(opacity) {

}