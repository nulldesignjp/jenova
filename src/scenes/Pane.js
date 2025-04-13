import { Pane } from 'TweakPane'

export default class CustomPane extends Pane
{
    constructor( props )
    {
        super( props );

        let _param = {
            'hoger': 0.0
        }

        this.addBinding( _param, 'hoger', { min: 0.0, max: 1.0, step: 0.01 })

        this.document.addEventListener('keydown', e=>{

            if( e.keyCode == 68 || e.key == 'd' || e.code == 'KeyD' )
            {
                if( this.containerElem_.style.display == 'none' )
                {
                    this.containerElem_.style.display = 'block'
                } else {
                    this.containerElem_.style.display = 'none'
                }
            }

        })

        this.containerElem_.style.display = 'none'

    }

}