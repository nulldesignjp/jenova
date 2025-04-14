import * as THREE from 'three'

type Params = {
	canvas: HTMLCanvasElement
}

export default class PseudoWebGL
{
	private props: Params;
	private canvas: HTMLCanvasElement;

	private mesh: THREE.Mesh
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;

	constructor( _props: Params )
	{
		this.props = _props
		this.canvas = _props.canvas;

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 45, this.canvas.width / this.canvas.height, 0.001, 1000 )
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas
		})

		this.camera.position.set( 0, 0, -5 )
		this.camera.lookAt( new THREE.Vector3() )

		let _geom = new THREE.IcosahedronGeometry( 1, 1 )
		let _mate = new THREE.MeshBasicMaterial({
			color: 0xFFFFFF, wireframe: true
		})
		this.mesh = new THREE.Mesh( _geom, _mate )
		this.scene.add( this.mesh )

		this.update();
	}

	update():void
	{
		window.requestAnimationFrame( this.update.bind( this ) );
		this.mesh.rotation.x -= 0.01;
		this.mesh.rotation.y -= 0.01;

		this.renderer.render( this.scene, this.camera );
	}

	dispose()
	{
		this.renderer.dispose();
	}
}