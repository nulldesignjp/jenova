import * as THREE from 'three'

import Scene from './core/Scene.js'
import Camera from './core/Camera.js'
import Renderer from './core/Renderer.js'
import Size from './core/Size.js'
import Time from './core/Time.js'

//  testcode
import Pane from './Pane.js'

export default class Jenova
{

    constructor( props )
    {

        console.log('%cJenova.js','color:#FF9900; font-weight: bold;','color:white;');

        this.props = {
            backgroundColor: 0x000000, // 初期値黒
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: false,
            ...props // 渡されたものは上書き
        }


        this._init()

        new Pane()  //  testcode
    }

    _init()
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

        this.resize();
        
    }

    loadScene( _sceneLabel )
    {
        console.log( 'loadScene,',_sceneLabel )
        this.mesh.material.color.set( Math.random() * 0xffffff );
    }

    add( _object3d)
    {
        this.scene.add( _object3d );
    }

    remove( _object3d )
    {
        return _object3d.removeFromParent();
    }

    update()
    {
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
        this.time.off('tick')
    }
}