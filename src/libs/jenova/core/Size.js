import EventEmitter from './EventEmitter.js'

export default class Size extends EventEmitter
{
    
    constructor()
    {
        super();

        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.pixelRatio = Math.min( window.devicePixelRatio, 2 );

        this.events = {
            target: window,
            key: 'resize',
            value: ()=>{    this.update();  }
        }

        this.events.target.addEventListener( this.events.key, this.events.value );

        this.update();

    }

    update()
    {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.trigger('resize');
    }

    dispose()
    {
        this.events.target.removeEventListener( this.events.key, this.events.value );
        this.events = null;
    }
}