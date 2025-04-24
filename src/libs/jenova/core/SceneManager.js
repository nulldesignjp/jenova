import * as THREE from 'three'

export class SceneManager
{

    constructor()
    {
        this.list = new Map();
        this.init();
    }

    init(){}

    addScene( _key, _scene )
    {
        this.list.set( _key, _scene )

        console.log( this.list )
    }

    getScene( _key )
    {
        return this.list.get( _key )
    }

    removeScene( _scene ){}

    /**
     * 指定したシーンに移動
     * @param {string} _scene 
     */
    to( _sceneName ){}

    next(){}

    prev(){}

    dispose(){}

}

export default SceneManager;