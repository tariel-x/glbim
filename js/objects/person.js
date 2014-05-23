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

function Person(object, name, prefix, domElement)
{
    /**
     * Internal Three.JS clock
     * @type THREE.Clock
     */
    this.Clock = new THREE.Clock();
    
    /**
     * Player's camera
     * @type THREE.Camera
     */
    this.Camera;
    
    /**
     * Player's controlling module
     */
    this.Controls;
    
    this.Camera = new THREE.PerspectiveCamera(45, window.innerWidth / (window.innerHeight / 2), 1, 20000);
    this.Camera.position.z = -225;
    this.Camera.position.z = 265;
    this.Camera.position.y = 339; 
    
    this.Controls = new THREE.FirstPersonControls( this.Camera, domElement );

    this.Controls.movementSpeed = 500;
    this.Controls.lookSpeed = 0.16;
    this.Controls.lookVertical = true;
    this.Controls.constrainVertical = true;
    this.Controls.verticalMin = 1.1;
    this.Controls.verticalMax = 2.2;
    
    BimObject.call(this, object, name, prefix);
}

var proto_copy = new BimObject();
proto_copy.constructor = Person;

proto_copy.update = function(){
    this.Controls.update( this.Clock.getDelta() );
}

Person.prototype = proto_copy;
