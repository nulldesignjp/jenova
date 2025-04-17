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


            // Resize even
            this.events = {
                target: window,
                key: 'resize',
                value: ()=>{    this.update();  }
            }

            this.events.target.addEventListener( this.events.key, this.events.value );

        this.update();
        Size.instance = this;

    }

    update()
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