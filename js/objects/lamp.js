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
 * Lamp container
 * @param {THREE.Object3D} object
 * @param {string} name
 * @param {string} prefix
 * @param {THREE.Color} color
 * @param {integer} intencivity
 */
function Lamp(object, name, prefix, color, intencivity)
{
    /**
     * Lamp color
     */
    this.Color = color;
    
    /**
     * Lamp intencivity
     */
    this.Intencivity = intencivity;
    
    /**
     * Lamp is enabled
     */
    this.turned = false;
    
    BimObject.call(this, object, name, prefix);
}

var proto_copy = new BimObject();
proto_copy.constructor = Lamp;

/**
 * Turn on the lamp
 */
proto_copy.turnOn = function(){
    this.turned = true;
}

/**
 * Turn off the lamp
 */
proto_copy.turnOff = function(){
    this.turned = false;
}

Lamp.prototype = proto_copy;
