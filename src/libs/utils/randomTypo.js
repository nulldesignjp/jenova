/*
	randomTypo.js
*/

// import * as THREE from "three";
// import { SVGLoader } from "~/node_modules/three/examples/jsm/loaders/SVGLoader.js";


export default class randomTypo{
  constructor( _dom, _text, _delay ){
    //  スコープの保持 

    _delay = _delay == undefined?0:_delay;

    this.dom = _dom;
    this.text = _text;
    this.delay = _delay;
    this.count = 0;
    this.total = 0;
    this.isShuffle = false;
    this.isClear = false;

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
    window.cancelAnimationFrame( this.loopKey );
  }

  setText( _text )
  {
    if( _text.length == 0 )
    {
      this.isClear = true;
      this.total = this.text.length;
    } else {
      this.isClear = false;
      this.total = _text.length;
      this.text = _text;
    }
    this.count = 0;

    if( this.text.indexOf('<br>') != -1 )
    {
      console.log('with br!')
    }
  }

  setDelay( _int )
  {
    this.delay = _int;
  }

  update()
  {
    var _this = this;
     this.loopKey = window.requestAnimationFrame( function(){  _this.update(); } );

    if( !this.isShuffle )
    {
      return;
    }

    // var len = this.text.length;
    var _str = '';

    if( this.total == 0 )
    {
      _str = this.text;
      this.fixed();
      return;
    }

    var _delay = randomTypo.fps * ( this.delay / 1000 );
    var _strCount = Math.floor( ( this.count - _delay ) * 1.0 ); //  0.25 - 1.0
    _strCount = _strCount<0?0:_strCount;

    if( this.total < _strCount )
    {
      _str = this.text;
      this.fixed();
      return;
    } else {
      if( this.isClear )
      {
        // _str = this.text.substr( 0, _strCount );
        // _str = '';
        // for( var i = 0; i < _strCount; i++ )
        // {
        //   _str += ' ';
        // }

        if( _strCount != 0 )
        {
          this.total--;
        }
      } else {
        _str = this.text.substr( 0, _strCount );
      }
      

      var len2 = this.total - _strCount;

      for( var i = 0; i < len2; i++ )
      {
        if( this.text[ _strCount + i ] == ' ' )
        {
          _str += ' ';
        } else {
          _str += randomTypo.text.charAt( Math.floor( Math.random() * randomTypo.text.length ) );
        }
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

  dispose()
  {
    this.stop();
    this.dom.parentNode.removeChild( this.dom );
    this.dom = null;
  }


}

randomTypo.text = '_ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
randomTypo.fps = 60;