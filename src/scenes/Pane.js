import { Pane } from 'TweakPane'
//  https://tweakpane.github.io/docs/

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

        });

        this.containerElem_.style.display = 'none'

    }

    addFolder( _options )
    {
        _options.title = _options.title || 'label'
        _options.expanded = _options.titexpandedle || true;
        return super.addFolder( _options )
    }

    addBinding( _param, _label, _options )
    {
        _options = _options || {}
        return super.addBinding( _param, _label, _options );
    }

    addButton( _options )
    {
        _options.title = _options.title || 'title'
        _options.label = _options.label || 'label'
        return super.addButton( _options )
    }

}