/*
  Img2Three.js
*/
import * as THREE from 'three'
import html2canvas from 'html2canvas'

export default class Img2Three
{

  constructor()
  {
    this.img;
    this.dom;
    this.mesh;
  }

  loadImg( _img, _width = window.innerWidth, _height = window.innerHeight )
  {
    this.img = _img;
    return new Promise( _resolve => {
        let _ldr = new THREE.TextureLoader().load( _img.src,  _texture => {
            
            //  Meshの作成
            let _scale = _img.width / _texture.source.data.width;
            let _geometry = new THREE.PlaneGeometry( _texture.source.data.width * _scale, _texture.source.data.height * _scale )
            let _material = new THREE.MeshBasicMaterial({
                map: _texture,
                side: THREE.DoubleSide,
                transparent: true,
                // outputColorSpace: THREE.SRGBColorSpace
            })
            
            let _mesh = new THREE.Mesh( _geometry, _material );
            this.mesh = _mesh;

            this.resize();

            _img.style.opacity = 0;

            _resolve();

        });
    })

  }

  loadDom( _dom, _width = window.innerWidth, _height = window.innerHeight )
  {
    this.dom = _dom

    _dom.setAttribute('style','')

    return new Promise( _resolve => {
        html2canvas( _dom, {
            backgroundColor: null,
            scale: window.devicePixelRatio * 2
        } ).then( canvas => {
            let _scale = 1.0 / window.devicePixelRatio * 0.5;
            let _geometry = new THREE.PlaneGeometry( canvas.width * _scale, canvas.height * _scale );
            let _texture = new THREE.CanvasTexture( canvas );
            let _material = new THREE.ShaderMaterial({
                uniforms: {
                uTexture: { value: _texture }
                },
                vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
                `,
                fragmentShader: `
                uniform sampler2D uTexture;
                varying vec2 vUv;
    
                void main() {
                    vec2 _uv = vUv;
                    gl_FragColor = texture2D( uTexture, _uv );
                }
                `,
                transparent: true,
                side: THREE.DoubleSide
            })

    
            let _mesh = new THREE.Mesh( _geometry, _material );
            this.mesh = _mesh;
            
            this.resize();

            // _dom.style.opacity = 0;
            // _dom.style.color = 'rgba( 255, 0, 0, 1.0 ) !important';
            _dom.setAttribute('style','color: rgba(0,0,0,0)')

            _resolve( _mesh );

        });
    })
  }
  
  getPosition( _img, _width = window.innerWidth, _height = window.innerHeight )
  {
      // 要素の位置座標を取得
      var clientRect = _img.getBoundingClientRect();

      // 画面の左端から、要素の左端までの距離
      var x = clientRect.left;

      // 画面の上端から、要素の上端までの距離
      var y = clientRect.top;

      // ページの左端から、要素の左端までの距離
      var px = window.scrollX + clientRect.left;

      // ページの上端から、要素の上端までの距離
      var py = window.scrollY + clientRect.top;

      return {x: px, y: py, z: 0}
    }
    

    resize()
    {
      if( this.mesh )
      {
        let _width = window.innerWidth
        let _height = window.innerHeight
        let _w = 0;
        let _h = 0;
        let _x;
        let _y;
        let _p;
        if( this.img )
        {
          _p = this.getPosition( this.img, _width, _height );
          _x = this.img.width
          _y = this.img.height
        } else {
          _p = this.getPosition( this.dom, _width, _height );
          _x = this.dom.clientWidth;
          _y = this.dom.clientHeight;
        }
  
        _p.x -= _width * 0.5;
        _p.y -= _height * 0.5;
        _p.x += _x * 0.5;
        _p.y += _y * 0.5;
        
        _p.y = - _p.y;
  
        this.mesh.position.x = _p.x;
        this.mesh.position.y = _p.y;
      }

    }
}
