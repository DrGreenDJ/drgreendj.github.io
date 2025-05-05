class HeaderComponent extends HTMLElement {
	
	constructor() {
		super();
	}
  
	connectedCallback() {
		console.log("Custom element added to page.");
	}
}

window.customElements.define("kdg-header", HeaderComponent);
