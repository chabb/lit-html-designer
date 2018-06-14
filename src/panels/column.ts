import { html } from 'lit-html/lib/lit-extended.js';
import { LitElement } from '@polymer/lit-element/lit-element.js';
export class Column extends LitElement {


    static get properties() {
        return  {
            value: Number,
            label: String
        }

    }

    private valueChanged(e: Event) {
        let value = e.target.value;
        if (value) {
            //TODO (sanitize)
            value = parseInt(value, 10);
            this.onChange(value, this.label);
        }
    }

    _render() {
        console.log('>>>>>> child');
       return html`<div style="">
        <input style="" value=${this.value} on-change=${(e: Event) => this.valueChanged(e)}/>
        <div style="{styles.inputHelper}">${this.label}</div>
        </div>`
    }
}