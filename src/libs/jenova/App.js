import * as THREE from 'three'

import { Scene } from './core/Scene.js'
import { Camera } from './core/Camera.js'
import { Renderer } from './core/Renderer.js'
import {SceneManager } from './core/SceneManager.js'
import { Time } from './core/Time.js'
import { Size } from './core/Size.js'
import { Scroll } from './core/Scroll.js'
import { Wheel } from './core/Wheel.js'

export class App
{

    constructor( props )
    {

        this.props = {
            backgroundColor: 0x000000, // 初期値黒
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: false,
            ...props // 渡されたものは上書き
        }

        this._init()
    }

    _init()
    {
        //  initevent
        this.time = new Time()
        this.size = new Size();
        this.scroll = new Scroll();
        this.wheel = new Wheel();

        //  event check - basic
        this.size.on('resize',()=>{ this.resize();  })
        this.time.on('tick', ()=>{  this.update();  })

        //  option
        // this.scroll.on('scroll', ()=>{  console.log("scroll", this.scroll.x, this.scroll.y)  })
        // this.wheel.on('wheel', ()=>{  console.log("wheel", this.wheel.value)  })

        //  init
        this.scene = new Scene();
        this.camera = new Camera();
        this.renderer = new Renderer({
            canvas: this.props.canvas
        });

        //  management
        this.sceneManager = new SceneManager();
        this.sceneManager.addScene( 'blank', this.scene );

        //  scene layout
        this.resize();
        
    }

    loadScene( _sceneLabel )
    {
        console.log( 'loadScene,',_sceneLabel )
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
        this.renderer.resize( this.size.width, this.size.height, this.size.pixelRatio );
        this.camera.resize( this.size.width, this.size.height, this.size.pixelRatio );
    }

    dispose()
    {
        this.renderer.dispose();
        this.camera.dispose();
        this.scene.dispose();

        this.size.off('resize');
        this.time.off('tick');
        this.scroll.off('scroll');
        this.wheel.off('wheel');

        this.size.dispose();
        this.time.dispose();
        this.scroll.dispose();
        this.wheel.dispose();

    }
}

export default App;