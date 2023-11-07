// Imported
import { accessibilityElementsTemplate, footerTemplate, headerLoggedTemplate, headerNotLoggedTemplate } from "../markup/webComponents.js";

// Global Variables

// Web Components
export class HeaderWhenLogged extends HTMLElement {

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.root.appendChild(headerLoggedTemplate.content.cloneNode("true"))
    }

}
export class HeaderWhenNotLogged extends HTMLElement {

    constructor() {
        super();
        this.append(headerNotLoggedTemplate.content.cloneNode("true"));
    }

}
export class Footer extends HTMLElement {

    constructor() {
        super();
        this.append(footerTemplate.content.cloneNode("true"));
    }

}
export class AccessibilityElements extends HTMLElement {

    constructor() {
        super();
        this.append(accessibilityElementsTemplate.content.cloneNode("true"));
    }

}
