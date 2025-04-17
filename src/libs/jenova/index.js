import * as THREE from 'three'
import Register from './core/Register.js'

//  testcode
import Pane from './Pane.js'

export default class Jenova
{

    constructor( props )
    {

        console.log('%cJenova.js','color:#FF9900; font-weight: bold;','color:white;');
        Register(Jenova);

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
        //  initevent
        this.time = new Jenova.Time()
        this.size = new Jenova.Size();
        this.scroll = new Jenova.Scroll();
        this.wheel = new Jenova.Wheel();

        //  event check
        this.size.on('resize',()=>{ this.resize();  })
        this.time.on('tick', ()=>{  this.update();  })
        this.scroll.on('scroll', ()=>{  console.log("scroll", this.scroll.x, this.scroll.y)  })
        this.wheel.on('wheel', ()=>{  console.log("wheel", this.wheel.value)  })

        //  init
        this.scene = new Jenova.Scene();
        this.camera = new Jenova.Camera();
        this.renderer = new Jenova.Renderer({
            canvas: this.props.canvas
        });

        //  scenelayout
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

        this.size.off('resize');
        this.time.off('tick');
        this.scroll.off('scroll');
        this.wheel.off('wheel');
    }
}