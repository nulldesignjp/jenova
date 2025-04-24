import * as THREE from 'three'

export class Scene extends THREE.Scene
{
    constructor( props )
    {
        super( props );
        this.objects = new Map(); // オブジェクト管理用
        this.init();
    }

    /**
     * @description 初期化
     */
    init(){}


    // add( _object3d)
    // {
    //     this.super.add( _object3d );
    // }

    // remove( _object3d )
    // {
    //     return _object3d.removeFromParent();
    // }

    /**
     * @description シーン開始時の演出
     */
    fillIn(){}

    /**
     * @description　シーン終了時の演出
     */
    fillOut(){}

    /**
     * @description シーンの更新。外部から呼び出す想定
     */
    update(){}

    /**
     * @description シーンのリサイズ。外部から呼び出す想定
     */
    resize(){}

    /**
     * @description シーンの破棄。外部から呼び出す想定
     */
    dispose()
    {
        // オブジェクトのクリーンアップ
        this.objects.forEach(object => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
            if (object.texture) {
                object.texture.dispose();
            }
        });
        this.objects.clear();
        this.clear();

        //  uniforms.texture.value.dispose();をいつか追加
    }
}

export default Scene