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
 */
function Object(object, name, prefix)
{
    /**
     * Three object
     */
    this.Object = object;
    
    /**
     * Object name
     */
    this.Name = name;
    
    /**
     * Prefix or type of the current object
     */
    this.Prefix = prefix;
    
    /**
     * Hide object
     */
    this.hide = function()
    {
        
    }
    
    /**
     * Show object
     */
    this.show = function()
    {
        
    }
    
    /**
     * Set object opacity
     */
    this.setOpacity
    {
        
    }
}
