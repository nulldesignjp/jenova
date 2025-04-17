import * as THREE from 'three'

export default class PlaneImage
{
    constructor( _texture )
    {
        _texture.colorSpace = THREE.SRGBColorSpace;
        
        let _geometry = new THREE.PlaneGeometry( _texture.image.width, _texture.image.height );
        let _material = new THREE.MeshBasicMaterial({
            map: _texture,
            side: THREE.DoubleSide

        });
        // _material.outputEncoding = THREE.sRGBEncoding;

        let _mesh = new THREE.Mesh( _geometry, _material )
        return _mesh;
    }
}