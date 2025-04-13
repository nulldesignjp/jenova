import * as THREE from 'three'

import Scene from './core/Scene.js'
import Camera from './core/Camera.js'
import Renderer from './core/Renderer.js'
import Size from './core/Size.js'
import Time from './core/Time.js'

export default class WebGLSceneManager
{
    constructor( props )
    {
        this.props = props;

        this.updateKey = undefined;
        this.resizeKey = undefined;
        this.eventList = [];

        this.init()
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

        this.addEvents();
        this.resize();
        this.update();
    }

    addEvents(){}

    removeEvents(){}

    loadScene( _sceneLabel )
    {
        console.log( 'loadScene,',_sceneLabel )
    }

    update()
    {
        this.updateKey = window.requestAnimationFrame( this.update.bind( this ) );

        this.camera.update()
        this.renderer.update( this.scene, this.camera );

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
    }
}