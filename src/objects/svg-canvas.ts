
import {Circle} from "./circle";
import {Rectangle} from "./rectangle";
import {Vector} from "./vector";


import { repeat } from 'lit-html/lib/repeat.js';
import { html } from 'lit-html/lib/lit-extended.js';
import { LitElement } from '@polymer/lit-element/lit-element.js';
import {map, MODES} from "../constants";


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
        this.mode = MODES.FREE;
    }

    public onMouseOver(e) {
        console.log('ON MOUSE OVER', e.target._internal);
        if (this.mode !== MODES.FREE) {
            return;
        }

        this.selectedObject = e.target.internal;
        this.handlerBoundingBox = e.target.getBoundingBox();
    }

    // WE CAN MAKE A DESIGNER COMPONENT THAT USE THOSE METHOD
    public onDrag(e) {

        let mouse = this.getMouseCoords(e);
        let action = map[this.mode];
        if (action) {
            let newObjectProperties = action({
                object: this.selectedObject.properties,
                startPoint: this.startPoint,
                mouse,
            });
            console.log(newObjectProperties);
            this.selectedObject.properties = newObjectProperties;
            this.objects = this.objects.slice();

            this.handlerBoundingBox = this.selectedObject.getBoundingBox();
            this.handlerBoundingBox.rotate = this.selectedObject.properties.rotate;
        }



    }

    public stopDrag(e) {
        console.log('>>>>>> STOP THE CHEEZE', this.mode);
        if (this.mode === MODES.DRAG || this.mode === MODES.ROTATE || this.mode === MODES.SCALE) {
            this.mode = MODES.FREE;
        }
        console.log(this.mode);
    }

    public getMouseCoords({clientX, clientY} : {clientX: number, clientY: number}) {
        let coords = this.applyOffset({
            x: clientX,
            y: clientY
        });
        return coords;
    }

    public getOffset() {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
    }

    public applyOffset(bundle: any) {
        let offset = this.getOffset();
        return {
            ...bundle,
            x: bundle.x - offset.x,
            y: bundle.y - offset.y
        };
    }

    public startDrag(mode: any, event: any) {
        console.log('start dragging', mode, event);
        this.mode = mode;
        this.startPoint = this.getStartPointBundle(event, this.selectedObject);
        console.log(this.startPoint);
    }
    public getStartPointBundle(event: any, object: Vector) {
        let mouse = this.getMouseCoords(event);
        return {
            clientX: mouse.x,
            clientY: mouse.y,
            objectX: object.properties.x,
            objectY: object.properties.y,
            width: object.properties.width,
            height: object.properties.height,
            rotate: object.properties.rotate
        };
    }

    public _render() {
        console.log('>``>>>>>RENDERING THE CANVAS 222');

        // put that in a method that configure all the handlers for rotation/resizing
        let canResize = true;
        let canRotate = true;
        let handlerTemplate = html`
            <svg-handler canResize=${canResize} 
            canRotate=${canRotate}
            onMouseDownRotate=${(e) => this.startDrag(MODES.ROTATE, e)}
            onMouseDownScale=${(e) => this.startDrag(MODES.SCALE, e)}
            onDrag=${(e) => this.startDrag(MODES.DRAG, e)}
            boundingBox=${this.handlerBoundingBox}></svg-handler>
        `;
        // we iterate thru objects and push them as needed
        return html`
                <div on-mouseup=${(e) => this.stopDrag(e)} 
                on-mousemove=${(e) => this.onDrag(e)}>
                <svg>
                 ${repeat(
                 this.objects, 
                (object) => object.id, 
                (i) => i._render())}</svg>
                 ${handlerTemplate}
                 </div>`;
    }
}



// so the big events should be on the overall container otherwise all this shit will fail