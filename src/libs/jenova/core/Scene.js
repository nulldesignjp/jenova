import * as THREE from 'three'

export default class Scene extends THREE.Scene
{
    constructor( props )
    {
        super( props );

        this.init();
    }

    /**
     * @description 初期化
     */
    init(){}

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
    dispose(){}
}