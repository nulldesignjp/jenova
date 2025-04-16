import * as THREE from 'three'

import Size from './Size.js'

export default class Camera extends THREE.PerspectiveCamera
{
    constructor( props )
    {
        super( props );

        this.focus = new THREE.Vector3();

		this.position.set( 0, 0, ~~ this.pixelEqualMagnification() )
        this.focalLengthToFOV( 35 )
    }

    update()
    {
        this.lookAt( this.focus )
    }

	resize()
	{
		if( this.aspect )
		{
			this.aspect = Size.width / Size.height;
		} else {
			this.left = - Size.width * 0.5;
			this.right = Size.width * 0.5;
			this.bottom = - Size.height * 0.5;
			this.top = Size.height * 0.5;
		}
		this.updateProjectionMatrix();

		this.position.set( 0, 0, ~~ this.pixelEqualMagnification() )
        this.focalLengthToFOV( 35 )
	}

	focalLengthToFOV( _focalLength = 35 )
	{
		var _h = this.filmGauge; //  (36mm * 24mm (フルサイズ) の対角線の長さを算出)
		var _v = _h * 2 / 3;
		var _diagonalLine = Math.sqrt( _h * _h + _v * _v );
		this.fov = 180.0 / Math.PI * Math.atan( _diagonalLine / ( _focalLength * 2.0 ) ) * 2.0;
		this.updateProjectionMatrix();
		return this.fov;
	}

	pixelEqualMagnification()
	{
		var _dist = ( ( window.innerHeight ) * 0.5 ) / Math.tan( ( this.fov * 0.5 ) * Math.PI / 180 );
		return _dist;
	}

	getWorldToScreen2D( _mesh )
	{
		var vector = new THREE.Vector3();
		var _ctx = this.getContext();
		var widthHalf = 0.5 * _ctx.canvas.width;
		var heightHalf = 0.5 * _ctx.canvas.height;
		_mesh.updateMatrixWorld();
		vector.setFromMatrixPosition(_mesh.matrixWorld);
		vector.project(this.view.camera.instance);
		vector.x = ( vector.x * widthHalf ) + widthHalf;
		vector.y = - ( vector.y * heightHalf ) + heightHalf;

		var _dir0 = new THREE.Vector3().subVectors( this.focus, this.position );
		var _dir1 = new THREE.Vector3().subVectors( _mesh.position, this.position );
		var _d = _dir0.dot( _dir1 );
		if( _d <= 0 ){
			vector.x = -9999;
			vector.y = -9999;
		}

		return { 
		    x: vector.x,
		    y: vector.y
		};
	}

    dispose(){}
}