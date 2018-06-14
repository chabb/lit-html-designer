import {JsonToCssStyle} from "../constants";


let ID: number = 0;

export interface Properties {
  x: number;
  y: number;
  type?: string;
  fill?: string;
  width?: number;
  height?: number;
  blendMode?: string;
  rotate?: number;
  stroke?: number;
  strokeWidth?: number;
  radius: number;
}

export class Vector {

    static meta: any;

    /*static panels = [
        SizePanel,
        TextPanel,
        StylePanel,
        ArrangePanel
    ];*/
    public properties: Properties = {};
    public id: number;

    constructor(protected onMouseOver: Function) {
        this.id = ID++;
        // this work has expected
        let klass = <typeof Vector>this.constructor;
        this.properties = Object.assign(this.properties, klass.meta.initial);
    }

    static get properties() {
        return {
            properties: Object
        }
    }

    public getBoundingBox() {
        let {x, y, width, height } = this.properties;
        return { x, y, width, height};
    }

    public getPanels() {
        return {
            sizePanel: true
        }
    }

    getStyle() {
        let object = this.properties;
        return {
            mixBlendMode: object.blendMode
        }
    }

    getTransformMatrix({rotate, x, y, width, height}: any): string {
        if (rotate) {
            let centerX = width / 2 + x;
            let centerY = height / 2 + y;
            return `rotate(${rotate} ${centerX} ${centerY})`;
        }
        return '';
    }

    getObjectAttributes(): any {
        let attr = {
            internal: this, // can potentially leak
            transform$: this.getTransformMatrix(this.properties),
            style$: JsonToCssStyle(this.getStyle()),
            fill$: this.properties.fill,
            stroke$: this.properties.stroke,
            strokeWidth$: this.properties.strokeWidth,
            getPanels: () => this.getPanels(),
            getBoundingBox: () => this.getBoundingBox()
        };
        return attr;
    }
}

// one way is to pass a parent reference to the guy, so we can use it as a container for the svg
// one of the limit of this approach is that we cannot instantiate directly one element ( properties must
// be set afterwards.. maybe a good way is to use those guys for simple element, and then use angular fror
// more complicated constructs

/*
let object = {
      ...meta.initial,
      type: selectedTool,
      x: mouse.x,
      y: mouse.y
    };
 */


// app state ( current vs selected ? )
/*
{
    currentObjectIndex: objects.length,
        selectedObjectIndex: objects.length,
    startPoint: this.getStartPointBundle(event, object),
    mode: meta.editor ? modes.EDIT_OBJECT : modes.SCALE,
    selectedTool: null

    */