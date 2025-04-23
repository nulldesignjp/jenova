/*
  randomTypoE.js
*/

export default class randomTypoE{

  constructor(){
  	this.typo = {
		"a": [	0,	0,	26,	36	],
		"b": [	26,	0,	22,	36	],
		"c": [	48,	0,	25,	36	],
		"d": [	73,	0,	26,	36	],
		"e": [	99,	0,	20,	36	],
		"f": [	119,	0,	20,	36	],
		"g": [	139,	0,	25,	36	],
		"h": [	164,	0,	25,	36	],
		"i": [	189,	0,	7,	36	],
		"j": [	196,	0,	15,	36	],
		"k": [	211,	0,	23,	36	],
		"l": [	234, 0,	19,	36	],
		"m": [	253, 0,	30,	36	],
		"n": [	283, 0,	25,	36	],
		"o": [	308, 0,	29,	36	],
		"p": [	337, 0,	21,	36	],
		"q": [	358, 0,	29,	18	],
		"r": [	387, 0,	21,	36	],
		"s": [	408, 0,	20,	36	],
		"t": [	428, 0,	24,	36	],
		"u": [	452, 0,	24,	36	],
		"v": [	476, 0,	27,	36	],
		"w": [	503, 0,	40,	36	],
		"x": [	543, 0,	25,	36	],
		"y": [	568, 0,	25,	36	],
		"z": [	593, 0,	24,	36	],

		"0": [	0, 36,	23,	36	],
		"1": [	23, 36,	19,	36	],
		"2": [	42, 36,	21,	36	],
		"3": [	63, 36,	21,	36	],
		"4": [	84, 36,	24,	36	],
		"5": [	108, 36,	19,	36	],
		"6": [	127, 36,	21,	36	],
		"7": [	148, 36,	21,	36	],
		"8": [	169, 36,	21,	36	],
		"9": [	190, 36,	20,	36	]
	}

  	this.isLoaded;
  	this.image = new Image();
  	this.image.onload = function()
  	{
  		this.isLoaded = true;
  	}
  	this.image.src = 'assets/fonts/typo.png';
  }

  createTypo( _canvas, e )
  {
  	let len = e.length;
  	let _ctx = _canvas.getContext('2d');

  	_canvas.width = len * 25.0 + 20;
  	_canvas.height = 36 * 2;

  	_canvas.width = 540;

  	var _px = 0;

  	for( var i = 0; i < len; i++ )
  	{
  		var _char = e[i].toLowerCase();

  		if( this.typo[_char] != undefined )
  		{
  			var _x = this.typo[_char][0];
  			var _y = this.typo[_char][1];
  			var _w = this.typo[_char][2];
  			var _h = this.typo[_char][3];
  			_ctx.drawImage( this.image, _x, _y, _w, _h, _px, 0, _w, _h );
  			_px += _w;
  		} else {
  			_px += 20;
  		}
  	}

  	return _canvas
  }

}
