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

	resize( _width, _height, _pixelRatio )
	{
		if( this.aspect )
		{
			this.aspect = _width / _height;
		} else {
			this.left = - _width * 0.5;
			this.right = _width * 0.5;
			this.bottom = - _height * 0.5;
			this.top = _height * 0.5;
		}
		this.updateProjectionMatrix();

		this.position.set( 0, 0, ~~ this.pixelEqualMagnification() )
        this.focalLengthToFOV( 35 )
	}

	/**
	 * 
	 * @param {number} _focalLength レンズの焦点距離(mm)
	 * @returns {number} 計算された画角（FOV, 単位は度）
	 */
	focalLengthToFOV( _focalLength = 35 )
	{
		var _h = this.filmGauge; //  (36mm * 24mm (フルサイズ) の対角線の長さを算出)
		var _v = _h * 2 / 3;
		var _diagonalLine = Math.sqrt( _h * _h + _v * _v );
		this.fov = 180.0 / Math.PI * Math.atan( _diagonalLine / ( _focalLength * 2.0 ) ) * 2.0;
		this.updateProjectionMatrix();
		return this.fov;
	}

	/**
	 * ウィンドウの高さとカメラの画角から、
	 * ピクセル等倍（1px = 1単位）になるカメラ距離を計算する。
	 * 
	 * この関数は主にTHREE.jsのPerspectiveCameraに対して使用し、
	 * ウィンドウ上でピクセルと3D空間のスケールを一致させたい場合に利用する。
	 * 
	 * @returns {number} ピクセル等倍になるカメラの距離
	 */
	pixelEqualMagnification()
	{
		var _dist = ( ( window.innerHeight ) * 0.5 ) / Math.tan( ( this.fov * 0.5 ) * Math.PI / 180 );
		return _dist;
	}

	/**
	 * Meshのワールド座標をスクリーン上の2D座標に変換する。
	 * 
	 * THREE.jsのカメラとコンテキスト情報を使い、
	 * 3Dオブジェクトのスクリーン上での位置（ピクセル座標）を取得する。
	 * カメラの背後にあるオブジェクトは画面外扱いとして (-9999, -9999) を返す。
	 * 
	 * @param {THREE.Mesh} _mesh スクリーン座標に変換する対象のメッシュ
	 * @returns {{x: number, y: number}} スクリーン上の2D座標（ピクセル単位）
	 */
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