import * as THREE from 'three'

import Size from './Size.js'

export default class Renderer extends THREE.WebGLRenderer
{
    constructor( props )
    {
        const _props = 
        {
            ...props,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
            antialias: true,
            preserveDrawingBuffer: true,
            alpha: false,
            background: 0xFFFFFF
        }

        super( _props );

         // パフォーマンス設定
        this.outputColorSpace = THREE.SRGBColorSpace;
        this.setSize( Size.width, Size.height )
        this.setPixelRatio( Size.pixelRatio );
        this.setClearColor( _props.background, 1 )

        // シャドウマップの最適化
        this.shadowMap.enabled = true;
        this.shadowMap.type = THREE.PCFSoftShadowMap;

        // メモリ使用量の最適化
        this.info.autoReset = false;

        this.resizekey = undefined;

    }

    update( _scene, _camera )
    {
        this.render( _scene, _camera )
    }

    resize( _width, _height, _pixelRatio )
    {
        clearTimeout( this.resizekey );
        this.setSize( _width, _height )
        this.setPixelRatio( 1 );

        this.resizekey = setTimeout(()=>{
            this.setSize( _width, _height )
            this.setPixelRatio( _pixelRatio );
        },33)
    }

    dispose()
    {
        super.dispose();  // 親クラスのdisposeを呼び出す
        this.resizekey = undefined;
    }
}