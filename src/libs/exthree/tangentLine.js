export default class tangentLine
{
	/*
		_c0: float x, float y, float r
		_c1: float x, float y, float r or float x, float y
	*/
	constructor( _c0, _c1 )
	{
		this.c0 = _c0;
		this.c1 = _c1;

		//	接点情報と線の情報の保持。
		//	実際は接点の情報だけでいいかも。
		this.list = [];

		//	 実際の計算
		this.update();
	}

	update()
	{
		let _r0 = this.cal( this.c0, this.c1 );
		let _r1 = this.cal( this.c1, this.c0 );

	    this.list = [];

	    if( _r0.length )
	    {

			//	out
			let _s0 = {	x: _r0[0].x,	y: _r0[0].y,	z: 0}
			let _e0 = {	x: _r1[1].x,	y: _r1[1].y,	z: 0}
			let _s1 = {	x: _r0[1].x,	y: _r0[1].y,	z: 0}
			let _e1 = {	x: _r1[0].x,	y: _r1[0].y,	z: 0}
			this.list.push({	start: _s0, end: _e0	});
			this.list.push({	start: _s1, end: _e1	});

	    }

		//	cross
		if( _r0[2])
		{
			let _s2 = {	x:	_r0[2].x,	y:	_r0[2].y,	z:	0}
			let _e2 = {	x:	_r1[2].x,	y:	_r1[2].y,	z:	0}
			let _s3 = {	x:	_r0[3].x,	y:	_r0[3].y,	z:	0}
			let _e3 = {	x:	_r1[3].x,	y:	_r1[3].y,	z:	0}
			this.list.push({	start: _s2, end: _e2	});
			this.list.push({	start: _s3, end: _e3	});
		}

		return this.list;

	}

	cal( c0, c1 )
	{
	    let _result = [];

		let _dx = c1.x - c0.x;
		let _dy = c1.y - c0.y;
		let _d = Math.sqrt( _dx * _dx + _dy * _dy );
		let _m = c1.r + c0.r;
		let _msub = c0.r - c1.r;

		let _dmax = Math.max( c0.r, c1.r );
		let _dmin = Math.min( c0.r, c1.r );
		if( _dmax > _d + _dmin )
		{
			return _result;
		}

		let _s0 = _dx * _m * c0.r;
		let _s00 = _dx * _msub * c0.r;
		let _s1 = _dy * c0.r * Math.sqrt( _dx * _dx + _dy * _dy - _m * _m );
		let _s10 = _dy * c0.r * Math.sqrt( _dx * _dx + _dy * _dy - _msub * _msub );
		let _s2 = _dx * _dx + _dy * _dy;
		let _s3 = c0.x

		let _s4 = _dy * _m * c0.r;
		let _s40 = _dy * _msub * c0.r;
		let _s5 = _dx * c0.r * Math.sqrt( _dx * _dx + _dy * _dy - _m * _m );
		let _s50 = _dx * c0.r * Math.sqrt( _dx * _dx + _dy * _dy - _msub * _msub );
		let _s6 = c0.y;

		//  outer
		//  外側に接する線
		let _a0 = ( _s00 + _s10 ) / _s2 + _s3;
		let _a1 = ( _s00 - _s10 ) / _s2 + _s3;
		let _b0 = ( _s40 - _s50 ) / _s2 + _s6;
		let _b1 = ( _s40 + _s50 ) / _s2 + _s6;
		_result.push({x:_a0, y: _b0})
		_result.push({x:_a1, y: _b1})

	    if( _d == _m )
	    {
	      //  接している
	      //  何もしない
	    } else if( _d > _m && c0.r*c1.r != 0 )
	    {
	      //  離れている
	      //  クロスする接線
	      let _a2 = ( _s0 + _s1 ) / _s2 + _s3;
	      let _a3 = ( _s0 - _s1 ) / _s2 + _s3;
	      let _b2 = ( _s4 - _s5 ) / _s2 + _s6;
	      let _b3 = ( _s4 + _s5 ) / _s2 + _s6;

	      _result.push({x:_a2, y: _b2})
	      _result.push({x:_a3, y: _b3})

	    } else {
	      //  重なっている
	      //  2本の接線
	      //  outerで処理済み
	    }

	    return _result;
	}

	getLines()
	{
		return this.list;
	}

}


