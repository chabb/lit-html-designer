import { html } from 'lit-html/lib/lit-extended.js';
import { LitElement } from '@polymer/lit-element/lit-element.js';

export class SizePanel extends LitElement {

    // ideally, we should pass a boolean for making explicit the presence/absence of a
    // given element
    static get properties() {
        return {
            x: Number,
            y: Number,
            width: Number,
            height: Number,
            rotation: Number
        }
    }

    _render() {
        console.log('>>>>>>SIZE PANEL RENDERING', this);
        let w = this.width ? html`<svg-column label=${"width"} value=${this.width} onChange=${this.onChange}></svg-column>` : '';
        let h = this.height ? html`<svg-column label=${"height"} value=${this.height} onChange=${this.onChange}></svg-column>` : '';
        let x = this.x ? html`<svg-column label=${'x'} value=${this.x} onChange=${this.onChange}></svg-column>` : '';
        let y = this.y ? html`<svg-column label=${'y'} value=${this.y} onChange=${this.onChange}></svg-column>` : '';
        let r = this.rotation || this.rotation === 0 ? html`<svg-column label=${'rotate'} value=${this.rotation} onChange=${this.onChange}></svg-column>` : '';
        return html`${w}${h}${x}${y}${r}`
    }

}

// panellist -> panel -> column
// object -> individual properties
// we pass the modification up the component tree, via the callback that is passed down the components

