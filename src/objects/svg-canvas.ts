
import {Circle} from "./circle";
import {Rectangle} from "./rectangle";

import { repeat } from 'lit-html/lib/repeat.js';
import { html } from 'lit-html/lib/lit-extended.js';
import { LitElement } from '@polymer/lit-element/lit-element.js';


export  class SVGCanvas extends LitElement {

    public objects: any[];

    static get properties() {
        // calling super does not work
        return {
            objects: Array,
            truc: Number,
            handlerBoundingBox: Object
        };
    }

    constructor() {
        super();
        this.truc = 44;
        this.objects = [];
        this.objects.push(new Circle((e) => this.onMouseOver(e)));
        setTimeout( ()=> {
            this.objects = this.objects.concat(new Rectangle((e) => this.onMouseOver(e)));
            this.truc++;
        }, 2000)
    }

    public onMouseOver(e) {
        console.log('ON MOSUE OVER', e.target.test);
        this.handlerBoundingBox = e.target.getBoundingBox();
    }

    public _render() {
        console.log('>>>>>>RENDERING THE CANVAS 22');

        // put that in a method that configure all the handlers for rotation/resizing
        let canResize = true;
        let canRotate = true;
        let handlerTemplate = html`
            <svg-handler canResize=${canResize} 
            canRotate=${canRotate}
            boundingBox=${this.handlerBoundingBox}></svg-handler>
        `;
        // we iterate thru objects and push them as needed
        return html`
                ${handlerTemplate}
                <svg>
                 ${repeat(
                 this.objects, 
                (object) => object.id, 
                (i) => i._render())}</svg>`;
    }
}

