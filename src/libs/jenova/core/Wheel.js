import { pass } from 'three/tsl';
import EventEmitter from './EventEmitter.js'

export class Wheel extends EventEmitter
{
    
    constructor()
    {
        super();

        this.value = 0;

        this.events = {
            target: window,
            key: 'wheel',
            value: (e)=>{    this.update(e);  },
            options: { passive: false }
        }

        this.events.target.addEventListener( this.events.key, this.events.value, this.events.options );

    }

    update( e )
    {
        this.value = e.wheelDelta;
        this.trigger('wheel');
    }

    dispose()
    {
        this.events.target.removeEventListener( this.events.key, this.events.value );
        this.events = null;
    }
}

export default Wheel