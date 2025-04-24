import EventEmitter from './EventEmitter.js'

export class Scroll extends EventEmitter
{
    
    constructor()
    {
        super();

        this.x = window.scrollX;
        this.y = window.scrollY;

        this.events = {
            target: window,
            key: 'scroll',
            value: ()=>{    this.scroll();  }
        }

        this.events.target.addEventListener( this.events.key, this.events.value );

    }

    scroll()
    {
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

export default Scroll;