import * as THREE from 'three'

import Size from './Size.js'

export default class Renderer extends THREE.WebGLRenderer
{
    constructor( props )
    {
        let _props = props;
        _props.antialias = _props.antialias || true;
        _props.preserveDrawingBuffer = _props.preserveDrawingBuffer || true;
        _props.alpha = _props.alpha || false;
        _props.background = _props.background || 0xFFFFFF;

        super( _props );

        this.outputColorSpace = THREE.SRGBColorSpace;
        this.setSize( Size.width, Size.height )
        this.setPixelRatio( Size.pixelRatio );
        this.setClearColor( _props.background, 1 )

        this.resizekey = undefined;

    }

    update( _scene, _camera )
    {
        this.render( _scene, _camera )
    }

    resize()
    {
        clearTimeout( this.resizekey );
        this.setSize( Size.width, Size.height )
        this.setPixelRatio( 1 );

        this.resizekey = setTimeout(()=>{
            this.setSize( Size.width, Size.height )
            this.setPixelRatio( Size.pixelRatio );
        },33)
    }

    dispose()
    {
        this.dispose()
    }
}