import * as THREE from 'three'

export default class PlaneImage
{
    static textureCache = new Map();
    
    constructor( _texture )
    {
        _texture.colorSpace = THREE.SRGBColorSpace;
        _texture.minFilter = THREE.LinearFilter;
        _texture.magFilter = THREE.LinearFilter;
        _texture.generateMipmaps = false;

        let _geometry = new THREE.PlaneGeometry( _texture.image.width, _texture.image.height, 1, 1 );
        let _material = new THREE.MeshBasicMaterial({
            map: _texture,
            side: THREE.DoubleSide,
            // transparent: true,
            // depthWrite: false // 透明オブジェクトの最適化
            

        });
        // _material.outputEncoding = THREE.sRGBEncoding;

        let _mesh = new THREE.Mesh( _geometry, _material )
        return _mesh;
    }

    static loadTexture(url) {
        if (this.textureCache.has(url)) {
            return this.textureCache.get(url);
        }

        const texture = new THREE.TextureLoader().load(url, texture => {
            texture.needsUpdate = true;
        });

        this.textureCache.set(url, texture);
        return texture;
    }
}