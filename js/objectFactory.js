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
 * Detects object type from name and creates specified object
 */
function objectFactory()
{
    this.createObject = function(object, name, prefix)
    {
	switch (prefix)
	{
	    case 'light':
		this.createLight(object, name, prefix);
		break;
	    case 'person':
		this.createPerson(object, name, prefix);
		break;
	    default:
		this.createObject(object, name, prefix);
		break;
	}
    }
    
    this.createLight = function (object, name, prefix)
    {
	var color = new THREE.Color( 0xffffff );
	var intensivity = 1;
	var directionalLight = new THREE.DirectionalLight( color, intensivity );
	directionalLight.position.set( 250, 250, 250 );
	directionalLight.castShadow = true;
	directionalLight.shadowDarkness = 0.5;
	directionalLight.shadowCameraVisible = true;
	return new Lamp(directionalLight, name, prefix, color, intensivity);
	
    }
    
    this.createPerson = function (object, name, prefix)
    {
	return new Person(object, name, 'person')
    }
    
    this.createObject = function (object, name, prefix)
    {
	return new BimObject(object, name, prefix);
    }
}
