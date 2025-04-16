import * as THREE from 'three';

export default class hexGrid
{
	constructor( props )
	{
		this.cube_direction_vectors = [
			{ q: +1, r: 0, s: -1 }, { q: +1, r: -1, s: 0  }, { q: 0, r: -1, s: +1 }, 
			{ q: -1, r: 0, s: +1 }, { q: -1, r: +1, s: 0  }, { q: 0, r: +1, s: -1 }, 
		];	//	0: right: 1: up-right: 2: up-left: 3: left: 4: down-left: 5: down-right
		this.coordination = [];

		this.instance = new THREE.Object3D();

		this.num = props.num || 32;
		this.grid = props.grid || 1;
		this.margin = props.margin || 0;

		this.margin = this.margin > this.grid ? this.grid : this.margin;

		let _num = this.num;
		let _num2 = _num * 2 + 1;
		let _grid = this.grid;
		let _margin = this.margin;
		let _count = 0;
		let _sqrt3 = Math.sqrt(3)
		let _vertices = new Float32Array( _num2 * _num2 * _num2 * 3 );
		let _colors = new Float32Array( _num2 * _num2 * _num2 * 3 )
		for( var q = - _num; q <= _num; q++ )
		{
			for( var r = - _num; r <= _num; r++ )
			{
				let _x = 0;
				let _y = 0;
				let _z = 0;

				let s = - q - r;

				if( s >= -_num && s <= _num )
				{

					_x = _grid * ( Math.sqrt(3) * q + Math.sqrt(3)/2 * r );
					_z = - _grid * ( 3/2 * r );

					_vertices[ _count + 0 ] = _x;
					_vertices[ _count + 1 ] = _y;
					_vertices[ _count + 2 ] = _z;

					this.coordination.push( { q: q, r: r, s: s, x: _x, y: _y, z: _z })

					_count += 3;
				}
			}
		}

		let _geometry = new THREE.BufferGeometry();
		_geometry.setAttribute( 'position', new THREE.BufferAttribute( _vertices, 3 ) );
		// _geometry.setAttribute( 'color', new THREE.BufferAttribute( _colors, 3 ) );

		let  _material = new THREE.PointsMaterial({
			size: 2,
			// vertexColors: true
		});

		let _mesh = new THREE.Points( _geometry, _material )
		// this.aw.add( _mesh )


		let len = this.coordination.length;
		let  _cVertices = new Float32Array(21);
		for( var i = 0; i < 7; i++ )
		{
			let _angle = Math.PI * 2 / 6 * i + Math.PI / 6;
			_cVertices[i * 3 + 0] = Math.cos( _angle ) * ( _grid - _margin );
			_cVertices[i * 3 + 1] = 0;
			_cVertices[i * 3 + 2] = Math.sin( _angle ) * ( _grid - _margin );
		}

		let _circleGeometry = new THREE.BufferGeometry();
		_circleGeometry.setAttribute( 'position', new THREE.BufferAttribute( _cVertices, 3 ) );
		// let _circleMaterial = new THREE.LineBasicMaterial( { transparent: true, opacity:0.4 } );

		while( len )
		{
			len--;
			let _coord = this.coordination[len];

			let _circleMaterial = new THREE.LineBasicMaterial( { transparent: true, opacity:0.8 } );
			let _mesh = new THREE.Line( _circleGeometry, _circleMaterial )
			_mesh.position.set( _coord.x, _coord.y, _coord.z );
			this.instance.add( _mesh )
			_coord.mesh = _mesh;
		}
	}

	cube_distance(a, b)	// distance between two hexes
	{
		let vec3 = this.cube_subtract(a, b);
		return (Math.abs( vec3.q ) + Math.abs( vec3.r ) + Math.abs( vec3.s )) / 2
	}

		cube_subtract(a, b)
		{
			return { q: a.q - b.q, r: a.r - b.r, s: a.s - b.s };
		}

	cube_neighbor( coordinate, direction )	// get neighbor hex
	{		
		return this.cube_add(coordinate, this.cube_direction(direction))

	}

		cube_direction(direction)
		{
			return this.cube_direction_vectors[direction]
		}
			
		cube_add(hex, vec)
		{
			return { q: hex.q + vec.q, r: hex.r + vec.r, s: hex.s + vec.s };
		}
}