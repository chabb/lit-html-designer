import { html } from 'lit-html/lib/lit-extended.js';
import { LitElement } from '@polymer/lit-element/lit-element.js';

interface PanelsDefinition {
    sizePanel?: any,
    textPanel?: any,
    arrangePanel?: any,

}

export class PanelList extends LitElement {

    public panels?: PanelsDefinition = {
        sizePanel: true
    };
    public shape: any;
    public offset: any;

    static get properties() {
        // calling super does not work
        return {
            shape: Object,
            panels: Object,
            offset: Object
        };
    }

    _render() {
        return this.buildPanelTemplates();
    }

    private buildPanelTemplates() {
        console.log('>>>>>>PANEL RENDERING', this.panel, this.shape);
        // HACK, we cannot use class in the templates
        let sizePanel = this.panels.sizePanel ? html`<svg-size-panel onChange=${ (v, k) => this.onChange(v, k)}
            rotation=${this.shape.rotate}
            x=${this.shape.x} y=${this.shape.y} width=${this.shape.width} height=${this.shape.height}></svg-size-panel>` : '';
        let textPanel = this.panels.textPanel ? html`` : '';
        let arrangePanel = this.panels.arrangePanel ? html`` :'';
        return html`${sizePanel}${textPanel}${arrangePanel}`;
    }
}