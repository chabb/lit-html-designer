import { html } from 'lit-html/lib/lit-extended.js';
import { LitElement } from '@polymer/lit-element/lit-element.js';
import { repeat } from 'lit-html/lib/repeat.js';

export class InsertMenu extends LitElement {

    static get properties() {
        return {
            tools: Object,
            currentTool: String
        }
    }
    _render() {
        let keys = Object.keys(this.tools);
        console.log('found keys', keys);
        return html`
            <div style=${styles.insertMenu}>
                <div style={styles.mainIcon}>
                    {this.currentTool ? tools[currentTool].meta.icon
                    : <Icon icon={"add"} size={30} />}
            </div>
            <!-- use repeat directive -->
            <ul style=${styles.toolBox}>
                ${repeat(this.keys, (type, idx) => idx, (type, index) => html`
                    <li style=${[
                            this.styles.toolBoxItem,
                            this.currentTool === type && styles.currentToolboxItem]}
                            onMouseDown=${this.props.onSelect.bind(this, type)}>
                        {this.tools[type].meta.icon}
                `)}
            </ul>
        </div>
        `
    }

}



const styles = {
    insertMenu: {
        position: 'absolute',
        marginTop: 0,
        marginLeft: -40,
        height: 40,
        width: 40,
        overflow: 'hidden',
        ':hover': {
            background: '#eeeff5',
            height: 'auto',
        }
    },
    toolBox: {
        margin: 0,
        padding: 0,
    },
    toolBoxItem: {
        listStyle: "none",
        padding: "5px 5px",
        ":hover": {
            background: "#ebebeb"
        }
    },
    currentToolboxItem: {
        background: "#ebebeb"
    },
    mainIcon: {
        padding: "10px 5px",
        borderBottom: "1px solid #e0e0e0"
    }

};