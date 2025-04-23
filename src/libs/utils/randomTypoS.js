/*
	randomTypoS.js
*/

// import * as THREE from "three";
// import { SVGLoader } from "~/node_modules/three/examples/jsm/loaders/SVGLoader.js";


export default class randomTypoS{
  constructor( _dom, _text, _delay ){
    //  スコープの保持 

    _delay = _delay == undefined?0:_delay;

    this.dom = _dom;
    this.text = _text;
    this.delay = _delay;
    this.count = 0;
    this.isShuffle = false;

  }

  start()
  {
    this.stop();
    this.update();
    this.isShuffle = true;
  }

  stop()
  {
    this.isShuffle = false;
    // window.cancelAnimationFrame( this.loopKey );
  }

  setText( _text )
  {
    this.text = _text;
    this.count = 0;
  }

  setDelay( _int )
  {
    this.delay = _int;
  }

  update()
  {
    var _this = this;
    //  this.loopKey = window.requestAnimationFrame( function(){  _this.update(); } );

    if( !this.isShuffle )
    {
      return;
    }

    var len = this.text.length;
    var _str = '';

    if( len == 0 )
    {
      _str = this.text;
      this.fixed();
      return;
    }

    var _delay = randomTypoS.fps * ( this.delay / 1000 );
    var _strCount = Math.floor( ( this.count - _delay ) * 1.0 ); //  0.25 - 1.0
    _strCount = _strCount<0?0:_strCount;

    if( len < _strCount )
    {
      _str = this.text;
      this.fixed();
      return;
    } else {
      _str = this.text.substr( 0, _strCount );

      var len2 = len - _strCount;

      for( var i = 0; i < len2; i++ )
      {
        _str += randomTypoS.text.charAt( Math.floor( Math.random() * randomTypoS.text.length ) );
      }
    }

    this.dom.innerText = _str;


    this.count ++;
  }

  fixed()
  {
    this.stop();
    this.count = 0;
  }


}

randomTypoS.text = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
randomTypoS.fps = 60;