import {Vector} from './Vector';
import { svg } from 'lit-html/lib/lit-extended';

export  class Circle extends Vector {

    public tpl: any;

    static meta = {
        initial: {
            width: 17,
            x: 55,
            y: 20,
            height: 45,
            rotate: 0,
            fill: 'black',
            strokeWidth: 1,
            blendMode: 'normal'
        }
    };
    
    constructor(protected onMouseOver: Function) {
        super(onMouseOver);
    }

    public _render() {
        let {width, height, x, y} = this.properties;
        // we need to use the dollar sign as it's a real attribute
        if (!this.tpl || true) {
            this.tpl = svg`
                <ellipse ...=${this.getObjectAttributes()}
                    on-mouseover=${this.onMouseOver}
                    rx$=${ width / 2}
                    ry$=${ height / 2}
                    cx$=${ (x ? x : 0) + width / 2}
                    cy$=${ (y ? y : 0) + height / 2} />`;
        }
        return this.tpl;
    }
}


// we need to use lit-extended EVERYWHERE
