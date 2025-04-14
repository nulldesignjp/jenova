import EventEmitter from './EventEmitter.js'

export default class Size extends EventEmitter
{
    static instance;

    static width;
    static height;
    static pixelRatio;
    
    constructor()
    {
        super()

        if( Size.instance != undefined )
        {
            return Size.instance;
        }

            // Setup
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
            this.pixelRatio = Math.min( window.devicePixelRatio, 2 );
            this.resize()

            // Resize event
            this.events = {
                target: window,
                key: 'resize',
                value: ()=>{    this.resize();  }
            }

            this.events.target.addEventListener( this.events.key, this.events.value );

        this.resize();
        Size.instance = this;

    }

    resize()
    {
        Size.width = document.documentElement.clientWidth;
        Size.height = document.documentElement.clientHeight;
        Size.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.width = Size.width;
        this.height = Size.height;
        this.pixelRatio = Size.pixelRatio;
        
        this.trigger('resize');
    }

    dispose()
    {
        this.events.target.removeEventListener( this.events.key, this.events.value );
        this.events = null;
    }
}