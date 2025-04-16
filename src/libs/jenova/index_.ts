import * as THREE from 'three'

import Scene from './core/Scene.js'
import Camera from './core/Camera.js'
import Renderer from './core/Renderer.js'
import Size from './core/Size.js'
import Time from './core/Time.js'

//  testcode
import Pane from './Pane.js'
import gsap from 'gsap'
import Wire from './core/Wire.js'
import PlaneImage from './PlaneImage.js'

type Params = {
    canvas: HTMLCanvasElement;
    backgroundColor?: number;
    preserveDrawingBuffer?: boolean;
    antialias?: boolean;
    alpha?: boolean;
}

export default class Jenova
{
    public static VERSION:string = '1.0.0'

    public time:Time;
    public size:Size;
    public scene:Scene;
    public camera:Camera;
    public renderer:Renderer;
    
    private props:Params;
    //  private resizeKey:string;


    constructor( props:Params )
    {

        console.log('%cJenova %cversion:' + Jenova.VERSION,'color:#FF9900; font-weight: bold;','color:white;');

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

    private _init():void
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

        //  確認用のメッシュを追加
        this.mesh = Wire.Box( 100, 0x000000 );
        this.scene.add( this.mesh );

        //  これだと一緒
        //  https://gsap.com/docs/v3/Eases
        this.mesh.position.y = -50
        let _hoges = ()=>{
            gsap.to( this.mesh.position,
                {
                    x: 0,
                    y: 50,
                    z: 0,
                    duration: 3.0,
                    ease: 'expo.inOut',
                    yoyo: true,
                    repeat: -1,
                    onComplete: ()=>{
                        console.log('onComplete')
                    }
                })
        }
        _hoges()

        this.sphere = Wire.Sphere( 50, 32, 0xFF0000 );
        this.scene.add( this.sphere );

        
    }

    loadScene( _sceneLabel:string ):void
    {
        console.log( 'loadScene,',_sceneLabel )
        this.mesh.material.color.set( Math.random() * 0xffffff );
    }

    add( _object3d:THREE.Object3D):void
    {
        this.scene.add( _object3d );
    }

    remove( _object3d:THREE.Object3D ):THREE.Object3D
    {
        return _object3d.removeFromParent();
    }

    update():void
    {
        this.camera.update()
        this.renderer.update( this.scene, this.camera );

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.01;

        this.sphere.rotation.x -= 0.01;
        this.sphere.rotation.y += 0.01;

    }

    resize():void
    {
        this.renderer.resize();
        this.camera.resize();
    }

    dispose():void
    {
        this.renderer.dispose();
        this.camera.dispose();
        this.scene.dispose();

        this.size.off('resize')
        this.time.off('tick')

        this.remove( this.mesh );
        this.remove( this.sphere );
    }
}