/*
  createLine.js
*/

import * as THREE from "three";

export default class createLine{
  constructor(){

  }

  CircleLine( _r, _s )
  {
    /*
      普通の円
    */
    var _geometry = new THREE.Geometry();
    for( var i = 0; i < _s; i++ )
    {
      var _rad = i / _s * Math.PI * 2.0;
      var _x = Math.cos( _rad ) * _r;
      var _y = Math.sin( _rad ) * _r;
      _geometry.vertices[i] = new THREE.Vector3( _x, _y, 0 );
    }
    _geometry.vertices[_s] = _geometry.vertices[0];

    var _material = new THREE.LineBasicMaterial({  transparent: true,  opacity: 1.0  });
    var _circle = new THREE.Line( _geometry, _material );

    return _circle

  }

  CircleBufferLine( _r, _s, _prop )
  {
    var _pos = [];
    var _geometry = new THREE.BufferGeometry();
    for( var i = 0; i < _s; i++ )
    {
      var _rad = i / _s * Math.PI * 2.0;
      var _x = Math.cos( _rad ) * _r;
      var _y = Math.sin( _rad ) * _r;
      var _z = 0;

      _pos[ i * 3 + 0 ] = _x;
      _pos[ i * 3 + 1 ] = _y;
      _pos[ i * 3 + 2 ] = _z;

    }

    _pos.push( _pos[0] );
    _pos.push( _pos[1] );
    _pos.push( _pos[2] );


    _geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( _pos, 3 ).setUsage( THREE.DynamicDrawUsage ) );
    _geometry.rotateZ( Math.random() * Math.PI * 2.0 );

    var _material = new THREE.LineBasicMaterial( _prop );
    var _circle = new THREE.Line( _geometry, _material );

    return _circle

  }

  CircleDashSegment( _value )
  {
    /*
      破線の円
    */
    // var _value = 100; // 円周
    var _grid = 3;
    var _num = ~~(_value / _grid);
    var _r = _value / ( Math.PI * 2.0 );

    _num -= _num%2;

    var _pos = [];
    var _geometry = new THREE.BufferGeometry();
    for( var i = 0; i < _num; i++ )
    {
      var _rad = i / _num * Math.PI * 2.0;
      var _x = Math.cos( _rad ) * _r;
      var _y = Math.sin( _rad ) * _r;
      var _z = 0;

      _pos[ i * 3 + 0 ] = _x;
      _pos[ i * 3 + 1 ] = _y;
      _pos[ i * 3 + 2 ] = _z;

    }
    _geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( _pos, 3 ).setUsage( THREE.DynamicDrawUsage ) );
    _geometry.rotateZ( Math.random() * Math.PI * 2.0 )

    var _material = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 1.0
    });
    var _mesh = new THREE.LineSegments( _geometry, _material );
    return { r: _r, mesh: _mesh };
  }

  LineDashSegment( _mesh0, _r0, _mesh1, _r1 )
  {
    /*
      破線の直線
    */
    var _grid = 2;

    // _r1 += _grid;
    // _r0 -= _grid;

    var _p0 = _mesh0.position.clone();
    var _p1 = _mesh1.position.clone();
    var _p = new THREE.Vector3().subVectors( _p0, _p1 );
    var _dist = _p.length();
    var _dir = _p.normalize();
    var _s0 = new THREE.Vector3().addVectors( _p1, _dir.clone().multiplyScalar( _r1 ) );
    var _s1 = new THREE.Vector3().addVectors( _p0, _dir.clone().multiplyScalar( - _r0 ) );

    var _pos = [];
    var _geometry = new THREE.BufferGeometry();
    var _len = ~~( ( _dist - _r0 - _r1 ) / _grid ) + 1;
    for( var i = 0; i < _len; i++ )
    {
      var _v = _s0.clone().add( _dir.clone().normalize().multiplyScalar( _grid * i ) );

      _pos[ i * 3 + 0 ] = _v.x;
      _pos[ i * 3 + 1 ] = _v.y;
      _pos[ i * 3 + 2 ] = _v.z;

    }
    _geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( _pos, 3 ).setUsage( THREE.DynamicDrawUsage ) );

    var _material = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.6
    });
    var _mesh = new THREE.LineSegments( _geometry, _material );
    return _mesh;
  }

  createCircle2( _r, _segments, _length, _prop, _isClose )
  {
    var _geometry = new THREE.BufferGeometry();

    var _positions = [];
    for( var i = 0; i < _segments; i++ )
    {
      var _rad = i / _segments * Math.PI * 2.0;
      var _x0 = Math.cos( _rad ) * _r;
      var _y0 = Math.sin( _rad ) * _r;
      var _z0 = 0;
      var _x1 = Math.cos( _rad ) * ( _r + _length );
      var _y1 = Math.sin( _rad ) * ( _r + _length );
      var _z1 = 0;

      _positions[ i * 6 + 0 ] = _x0;
      _positions[ i * 6 + 1 ] = _y0;
      _positions[ i * 6 + 2 ] = _z0;
      _positions[ i * 6 + 3 ] = _x1;
      _positions[ i * 6 + 4 ] = _y1;
      _positions[ i * 6 + 5 ] = _z1;

    }

    if( _isClose )
    {
      _positions.push( _positions[0] );
      _positions.push( _positions[1] );
      _positions.push( _positions[2] );
    }

    _geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( _positions, 3 ) );
    // _geometry.setAttribute( 'colors', new THREE.Float32BufferAttribute( colors, 3 ) );
    // _geometry.setAttribute( 'size', new THREE.Float32BufferAttribute( sizes, 1 ).setUsage( THREE.DynamicDrawUsage ) );
    // _geometry.setAttribute( 'idx', new THREE.Float32BufferAttribute( idx, 1 ).setUsage( THREE.DynamicDrawUsage ) );

    var _material = new THREE.LineBasicMaterial( _prop );
    var _line;

    if( _isClose )
    {
      _line = new THREE.Line( _geometry, _material );
    } else {
      _line = new THREE.LineSegments( _geometry, _material );
    }

    return _line;
  }

}