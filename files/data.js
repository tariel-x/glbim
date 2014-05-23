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

var ganttData = {
    "data": [
	{
	    "id": 1,
	    "start_date": "2014-06-01 00:00:00",
	    "duration": 30,
	    "text": "Реконструкция здания",
	    "progress": 0,
	    "sortorder": 20,
	    "parent": 0,
	    "open": true,
	    "show":
		    [
			"Plane.001",
			"Cube_Cube.001",
			"Plane"
		    ],
	    "hide": [
	    ]
	}, {
	    "id": 2,
	    "start_date": "2014-06-02 00:00:00",
	    "duration": 14,
	    "text": "Разбор",
	    "progress": 0,
	    "sortorder": 10,
	    "parent": 1,
	    "open": true,
	    "show": [
	    ],
	    "hide": [
	    ]
	}, {
	    "id": 3,
	    "start_date": "2014-06-02 00:00:00",
	    "duration": 5,
	    "text": "Разбор половины крышы",
	    "progress": 0.7,
	    "sortorder": 20,
	    "parent": 2,
	    "open": true,
	    "show": [
	    ],
	    "hide": [
		"Plane"
	    ]
	}, {
	    "id": 4,
	    "start_date": "2014-06-07 00:00:00",
	    "duration": 5,
	    "text": "Разбор второй половины крышы",
	    "progress": 0,
	    "sortorder": 30,
	    "parent": 2,
	    "open": true,
	    "show": [
	    ],
	    "hide": [
		"Plane.001"
	    ]
	}, {
	    "id": 5,
	    "start_date": "2014-06-12 00:00:00",
	    "duration": 4,
	    "text": "Разбор стен",
	    "progress": 0.34,
	    "sortorder": 10,
	    "parent": 2,
	    "open": true,
	    "show": [
	    ],
	    "hide": [
		"Cube_Cube.001"
	    ]
	}, {
	    "id": 6,
	    "start_date": "2014-06-16 00:00:00",
	    "duration": 14,
	    "text": "Строительство",
	    "progress": 0.491477,
	    "sortorder": 20,
	    "parent": 1,
	    "open": true,
	    "show": [
	    ],
	    "hide": [
	    ]
	}, {
	    "id": 7,
	    "start_date": "2014-06-16 00:00:00",
	    "duration": 5,
	    "text": "Строительство стен",
	    "progress": 0.2,
	    "sortorder": 10,
	    "parent": 6,
	    "open": true,
	    "show": [
		"Cube_Cube.001"
	    ],
	    "hide": [
	    ]
	}, {
	    "id": 8,
	    "start_date": "2014-06-21 00:00:00",
	    "duration": 9,
	    "text": "Возведение крыши",
	    "progress": 0.9,
	    "sortorder": 20,
	    "parent": 6,
	    "open": true,
	    "show": [
	    ],
	    "hide": [
	    ]
	}, {
	    "id": 9,
	    "start_date": "2014-06-21 00:00:00",
	    "duration": 5,
	    "text": "Первая половина крыши",
	    "progress": 1,
	    "sortorder": 10,
	    "parent": 8,
	    "open": true,
	    "show": [
		"Plane.001"
	    ],
	    "hide": [
	    ]
	}, {
	    "id": 10,
	    "start_date": "2014-06-26 00:00:00",
	    "duration": 4,
	    "text": "Вторая половина крыши",
	    "progress": 0,
	    "sortorder": 20,
	    "parent": 8,
	    "open": true,
	    "show": [
		"Plane"
	    ],
	    "hide": [
	    ]
	}
    ],
    "collections": {
	"links": [
	    {
		"id": 1,
		"source": 5,
		"target": 7,
		"type": "0"
	    }
	]
    }
};