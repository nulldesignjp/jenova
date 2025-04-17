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

        this.eventList = [];
        this.tabFlag = true;
        let _evt = {
            target: document,
            key: 'visibilitychange',
            value: ()=>
            {
              if (document.visibilityState === "visible") {
                //  console.log("コンテンツが表示された");
                this.tabFlag = true;
              }
      
              if (document.visibilityState === "hidden") {
                //  console.log("コンテンツがバックグラウンドになった");
                this.tabFlag = false;
              }
            }
          }
          _evt.target.addEventListener( _evt.key, _evt.value, _evt.option );
          this.eventList.push( _evt );
    }

    update()
    {
        this.updatekey = window.requestAnimationFrame( this.update.bind(this) );

        if( this.tabFlag === false ) return;

        const currentTime = Date.now() * 0.001;
        this.delta = ( currentTime - this.current ) * this.timeScale;
        this.delta = this.delta > 0.033 ? 0.033 : this.delta;
        this.current = currentTime;
        this.time += this.delta;

        this.fpsCount ++;

        this.trigger('tick');
        console.log('tick')

    }

    play()
    {
        this.pause();
        this.currentTime = Date.now() * 0.001;
        this.intervalKey = setInterval(()=>{
          this.fps = this.fpsCount;
          this.fpsCount = 0;
        },1000);
        this.update();
    }

    pause()
    {
        window.cancelAnimationFrame( this.updatekey );
        window.clearInterval( this.intervalKey );
    }

    dispose()
    {
        // window.cancelAnimationFrame( this.updatekey );
        // window.clearInterval( this.intervalKey );

        // let len = this.eventList.length;
        // while( len )
        // {
        // len--
        // let _evt = this.eventList.pop();

        // _evt.target.removeEventListener( _evt.key, _evt.value, _evt.option );
        // _evt = null;
        // }
        // this.eventList = null
    }
}