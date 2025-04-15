import * as THREE from 'three'

import Scene from './core/Scene.js'
import Camera from './core/Camera.js'
import Renderer from './core/Renderer.js'
import Size from './core/Size.js'
import Time from './core/Time.js'

import Pane from './Pane.js'

export default class WebGLSceneManager
{
    constructor( props )
    {
        this.props = props;

        this.resizeKey = undefined;
        this.eventList = [];

        this.init()

        new Pane()  //  testcode
    }

    init()
    {
        this.time = new Time()
        this.size = new Size();
        this.scene = new Scene();
        this.camera = new Camera();
        this.renderer = new Renderer({
            canvas: this.props.canvas
        });

        this.size.on('resize',()=>{ this.resize();  })
        this.time.on('tick', ()=>{  this.update();  })

        this.addEvents();
        this.resize();

        let _geometry = new THREE.BoxGeometry( 100, 100, 100 );
        let _material = new THREE.MeshBasicMaterial( { color: 0x333333, wireframe: true } );
        this.mesh = new THREE.Mesh( _geometry, _material );
        this.scene.add( this.mesh );
    }

    addEvents(){}

    removeEvents()
    {
        let len = this.eventList.length;
        while( len )
        {
        len--
        let _evt = this.eventList.pop();
        _evt.target.removeEventListener( _evt.key, _evt.value, _evt.option );
        _evt = null;
        }
        this.eventList = null
    }

    loadScene( _sceneLabel )
    {
        console.log( 'loadScene,',_sceneLabel )
        this.mesh.material.color.set( Math.random() * 0xffffff );
    }

    update()
    {
        this.camera.update()
        this.renderer.update( this.scene, this.camera );

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;

    }

    resize()
    {
        this.renderer.resize();
        this.camera.resize();
    }

    dispose()
    {
        this.renderer.dispose();
        this.camera.dispose();
        this.scene.dispose();

        this.size.off('resize')
        this.time.off('tick')
    }
}