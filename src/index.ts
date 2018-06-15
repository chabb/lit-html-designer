import {SVGCanvas} from "./objects/svg-canvas";
import {Handler} from "./handler";
import {Column} from "./panels/column";
import {PanelList} from "../lib/panels/panel";
import {SizePanel} from "./panels/size-panel";
import {InsertMenu} from "./panels/insert-menu";
import {Icon} from "./icon";


customElements.define('svg-canvas', SVGCanvas);
customElements.define('svg-handler', Handler);
customElements.define('svg-panels', PanelList);
customElements.define('svg-size-panel', SizePanel);
customElements.define('svg-column', Column);
customElements.define('svg-insert-menu', InsertMenu);
customElements.define('svg-icon', Icon);
//customElements.define('svg-text-panel', PanelList);
//customElements.define('svg-arrange-panel', PanelList);



// a TemplateStringsArray will be the same object across all invocation of the tagged template function
// for the same literal => which explains why it's immutable too