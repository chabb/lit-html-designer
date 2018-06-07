import Vector from './Vector';
import { svg } from 'lit-html/lib/lit-extended';

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

    constructor(protected onMouseOver: Function) {
        super(onMouseOver);
        let klass = <typeof Vector>this.constructor;
        this.properties = Object.assign(this.properties, klass.meta.initial);
    }

    public _render() {
        let {width, height, x, y, radius} = this.properties;
        console.log(this.onMouseOver);
        // we need to use the dollar sign as it's a real attribute
        if (!this.tpl) {
            this.tpl = svg`
                <rect ...=${this.getObjectAttributes()}
                     on-mouseover=${this.onMouseOver}
                     x$=${x}
                     y$=${y}
                     rx$=${radius}
                     width$=${width}
                     height$=${height}
                />`;
        }
        return this.tpl;
    }
}


// we need to use lit-extended EVERYWHERE
