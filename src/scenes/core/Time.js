import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter
{
    constructor()
    {
        super();

        //  time management.
        this.start = Date.now() * 0.001
        this.current = this.start;
        this.time = 0
        this.delta = 16
        this.timeScale = 1.0;

        //  FPS Count.
        this.fps = 60;
        this.fpsCount = 0;

        //  update.
        this.updatekey = undefined;
        this.update();

        //  use debug only.
        this.intervalKey = setInterval(()=>{
            this.fps = this.fpsCount;
            this.fpsCount = 0;
        },1000);
    }

    update()
    {
        this.updatekey = window.requestAnimationFrame( this.update.bind(this) );

        const currentTime = Date.now() * 0.001;
        this.delta = ( currentTime - this.current ) * this.timeScale;
        this.current = currentTime;
        this.time += this.delta;

        this.fpsCount ++;

        this.trigger('tick');

    }

    play()
    {
        this.pause();
        this.currentTime = Date.now() * 0.001;
        this.update();
    }

    pause()
    {
        window.cancelAnimationFrame( this.updatekey );
    }

    dispose()
    {
        window.cancelAnimationFrame( this.updatekey );
        window.clearInterval( this.intervalKey );
    }
}