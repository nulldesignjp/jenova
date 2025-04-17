import EventEmitter from './EventEmitter.js'

export default class Scroll extends EventEmitter
{
    static instance;

    static x;
    static y;
    
    constructor()
    {
        super()

        if( Scroll.instance != undefined )
        {
            return Scroll.instance;
        }

            // Setup
            Scroll.x = window.scrollX;
            Scroll.y = window.scrollY;
            this.x = window.scrollX;
            this.y = window.scrollY;

            // Resize event
            this.events = {
                target: window,
                key: 'scroll',
                value: ()=>{    this.scroll();  }
            }

            this.events.target.addEventListener( this.events.key, this.events.value );

            Scroll.instance = this;

    }

    scroll()
    {
        Scroll.x = window.scrollX;
        Scroll.y = window.scrollY;
        this.x = window.scrollX;
        this.y = window.scrollY;
        this.trigger('scroll');
    }

    dispose()
    {
        this.events.target.removeEventListener( this.events.key, this.events.value );
        this.events = null;
    }
}