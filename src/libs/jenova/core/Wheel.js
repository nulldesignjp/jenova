import { pass } from 'three/tsl';
import EventEmitter from './EventEmitter.js'

export default class Wheel extends EventEmitter
{
    static instance;

    static value;
    
    constructor()
    {
        super()

        if( Wheel.instance != undefined )
        {
            return Wheel.instance;
        }

            // Setup
            Wheel.value = 0;
            this.value = 0;

            // Resize event
            this.events = {
                target: window,
                key: 'wheel',
                value: (e)=>{    this.update(e);  },
                options: { passive: false }
            }

            this.events.target.addEventListener( this.events.key, this.events.value, this.events.options );

            Wheel.instance = this;

    }

    update( e )
    {
        Wheel.value = e.wheelDelta;
        this.value = e.wheelDelta;
        this.trigger('wheel');
    }

    dispose()
    {
        // this.events.target.removeEventListener( this.events.key, this.events.value );
        // this.events = null;
    }
}