import {Vector} from './Vector';
import {html, svg} from 'lit-html/lib/lit-extended';

export  class Rectangle extends Vector {

    public tpl: any;

    static meta = {
        initial: {
            width: 25,
            height: 35,
            x: 44,
            y: 50,
            rotate: 0,
            fill: 'yellow',
            strokeWidth: 1,
            blendMode: 'normal'
        }
    };

    //TODO(chab) found typing, put that upper in vector
    public static getIcon() {
        return  html`<svg-icon icon=${'rectangle'} size=${30} />`;
    }

    constructor(protected onMouseOver: Function) {
        super(onMouseOver);
        let klass = <typeof Vector>this.constructor;
        this.properties = Object.assign(this.properties, klass.meta.initial);
    }

    public _render() {
        let {width, height, x, y, radius} = this.properties;
        // we need to use the dollar sign as it's a real attribute
        this.tpl = svg`
            <rect ...=${this.getObjectAttributes()}
                 on-mouseover=${this.onMouseOver}
                 x$=${x}
                 y$=${y}
                 rx$=${radius}
                 width$=${width}
                 height$=${height}
            />`;
        return this.tpl;
    }
}




// we need to use lit-extended EVERYWHERE


// lit-element portal ? we can use _createRoot to tell where we want to mount the component
// note that it will NOT create a shadow tree, can we make the assumption that when
// we call _createRoot, parent DOM is accessible
