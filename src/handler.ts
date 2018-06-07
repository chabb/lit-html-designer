import {LitElement} from "@polymer/lit-element";
import { html } from 'lit-html/lib/lit-extended.js';
import {JsonToCssStyle} from "./constants";

const styles = {
    handler: {
        'position': 'absolute',
        'border': '6px solid #dedede',
        'zIndex': 999999
    },
    anchor: {
        'width': 10,
        'height': 10,
        ':hover': {
            'borderColor': 'gray'
        }
    },
    scaleAnchor: {
        'marginTop': -3,
        'borderRight': '2px solid #dedede',
        'borderBottom': '2px solid #dedede',
        'position': 'absolute',
        'zIndex': -1
    },
    rotateAnchor: {
        'marginTop': -8,
        'borderRight': '2px solid #dedede',
        'borderTop': '2px solid #dedede',
        'position': 'absolute',
        'borderTopRightRadius': 3,
        'zIndex': -1
    }
};




export class Handler extends LitElement {

    private boundingBox;

    static get properties() {
        // calling super does not work
        return {
            boundingBox: Object
        };
    }

    constructor() {
        super();
    };

    public _render() {
        console.log('>>>>>>>>>>> rendering boundig box');
        let bb = this.boundingBox;
        if (!bb) {
            return;
        }

        // we can put the logic of the handler somewhere else

        // -2px as the border is added outside
        let boundingBox = !!bb ? {
                left:`${bb.x - 6}px`, top:`${bb.y - 6}px`, width:`${bb.width - 0}px`, height:`${bb.height - 0}px`
            } : {};
        //
        let scaleAnchorstyle = {
            marginTop: this.boundingBox.height - 4 + 'px',
            marginLeft: this.boundingBox.width - 4 + 'px'
        };

        let scaleAnchor = html`
            <div style=${JsonToCssStyle(
            {...styles.anchor,  
                ...styles.scaleAnchor, 
                ...scaleAnchorstyle })} 
            class='resize-anchor'
            on-mousedown=${this.onMouseDown} />`;

        let rotateAnchorStyle = {
            marginLeft: this.boundingBox.width - 3 + 'px'
        };

        let rotateAnchor = html`
            <div style=${JsonToCssStyle(
            {
                ...styles.anchor, 
                ...styles.rotateAnchor, 
                ...rotateAnchorStyle })}
                class='rotate-anchor'
                on-mousedown=${this.onMouseDown} />`;

        let handlerStyle = {
            ...styles.handler,
            ...boundingBox,
            transform: `rotate(${boundingBox.rotate}deg)`
        };

        return html`<div class='handler'
            style$=${JsonToCssStyle(handlerStyle)}>
            ${rotateAnchor}
            ${scaleAnchor}
            </div>`;
    }
}